async function postCourse(req, res, authorizer) {
    const semesterId = req.params.semester;
    const catalogNumber = req.params.catalognumber;
    const sectionId = req.params.sectionid;
    const course_info = req.body;

    try {
        if (
            await permissionchecker.hasRights(authorizer, [
                "admin",
                "registrar",
            ])
        ) {
            if (course_info.deleted) {
                throw new ServiceError(
                    409,
                    `Unable to post a course with deleted = true`
                );
            }
            course_info.catalog_number = catalogNumber;
            course_info.section_number = sectionId;
            course_info.semester = semesterId;

            var schedule_record = getScheduleRecord(course_info.schedule);
            schedule_record.catalog_number = catalogNumber;
            schedule_record.section_number = sectionId;
            schedule_record.semester = semesterId;

            let current_course = await courses
                .query()
                .select("*")
                .where("catalog_number", catalogNumber)
                .where("section_number", sectionId)
                .where("semester", semesterId)
                .mostRecent()
                .notDeleted();

            if (course_info.grade_requirements) {
                course_info.grade_requirements = switchGradingFriendlyName(
                    course_info.grade_requirements
                );
            }

            // let current_schedule = await course_schedule
            //   .query()
            //   .select("*")
            //   .where("catalog_number", catalogNumber)
            //   .where("section_number", sectionId)
            //   .where("semester", semesterId)
            //   .mostRecent()
            //   .notDeleted();

            let combined = combineQueryResults(current_course[0], course_info);
            // let combined_schedule = combineQueryResults(
            //   current_schedule[0],
            //   schedule_record
            // );

            if (combined.grade_status === null) {
                combined.grade_status = "unsubmitted";
            }

            let instructorString = "";

            for (let i in combined.instructors) {
                if (combined.instructors[i].id != "") {
                    instructorString += combined.instructors[i].id + "|";
                } else {
                    instructorString += combined.instructors[i].last_name + "|";
                }
            }
            combined.instructors = instructorString.slice(0, -1);

            if (combined.grade_requirements !== null) {
                await checkValidGradeReq(combined.grade_requirements);
            }

            let course = await courses
                .query()
                .mostRecent()
                .notDeleted()
                .where("catalog_number", catalogNumber)
                .where("section_number", sectionId)
                .where("semester", semesterId)
                .save(combined, permissionchecker.changed_by(authorizer));

            let schedule = await course_schedule
                .query()
                .mostRecent()
                .notDeleted()
                .where("catalog_number", catalogNumber)
                .where("section_number", sectionId)
                .where("semester", semesterId)
                .save(
                    schedule_record,
                    permissionchecker.changed_by(authorizer)
                );

            let days = getDaySchedule(schedule);
            course.schedule = days;

            return await getCourse(req, res, authorizer);
        } else {
            throw new ServiceError(403, insufficientRightsErr);
        }
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(`${err.statusCode}`, `${err.message}`);
        } else {
            return res.status(
                500,
                `Unknown Error caused by ${semesterId} ${catalogNumber} ${sectionId}`
            );
        }
    }
}

// THE TESTS

it("POST course", async function () {
    this.timeout(5000);
    let res = await chai
        .request(baseUrl)
        .post("/courses/99991/515/1")
        .set({ Authorization: `Bearer ${token}` })
        .send({
            semester: 20211,
            catalog_number: "515",
            section_number: 1,
            catalog_title: "Civil Procedure :)",
            description: "Learning about Civil Procedures ... maybe",
            curriculum_id: 3378,
            title_code: 1,
            credit_hours: "4.50",
            text_for_blank_credit_hour: "",
            class_schedule_block_type: "1",
            short_title: "CIVIL PROCEDURE",
            seating_capacity: 105,
            current_seating: 2,
            notes: "",
            // intructors: 011111111|TEST LAST
            instructors: [
                {
                    id: 011111111,
                    first_name: "TEST",
                    last_name: "LAST",
                },
                {
                    id: "",
                    first_name: "",
                    last_name: "TEST LAST",
                },
            ],
            schedule: [
                {
                    day: "Monday",
                    start: "14:30:00",
                    end: "15:45:00",
                    room: "205",
                },
                {
                    day: "Wednesday",
                    start: "14:30:00",
                    end: "15:45:00",
                    room: "205",
                },
                {
                    day: "Friday",
                    start: "14:30:00",
                    end: "15:45:00",
                    room: "207",
                },
            ],
        });
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body.instructors).to.be.a("array");
    expect(res.body.instructors[0].last_name).to.include("Admin");
    expect(res.body.schedule[2].day).to.include("Friday");
});

it("POST course 2", async function () {
    let res = await chai
        .request(baseUrl)
        .post("/courses/99991/515/1")
        .set({ Authorization: `Bearer ${token}` })
        .send({
            semester: 20211,
            catalog_number: "515",
            section_number: 1,
            catalog_title: "Civil Procedure :)",
            description: "Learning about Civil Procedures ... maybe TEST POST",
            curriculum_id: 3378,
            title_code: 1,
            credit_hours: "4.50",
            text_for_blank_credit_hour: "",
            class_schedule_block_type: "1",
            short_title: "CIVIL PROCEDURE",
            seating_capacity: 105,
            current_seating: 2,
            notes: "",
            instructors: [
                {
                    id: 111111111,
                    first_name: "TEST",
                    last_name: "LAST",
                },
                {
                    id: "",
                    first_name: "",
                    last_name: "TEST LAST",
                },
            ],
            schedule: [
                {
                    day: "Monday",
                    start: "14:30:00",
                    end: "15:45:00",
                    room: "205",
                },
                {
                    day: "Wednesday",
                    start: "14:30:00",
                    end: "15:45:00",
                    room: "205",
                },
                {
                    day: "Thursday",
                    start: "14:30:00",
                    end: "15:45:00",
                    room: "207",
                },
            ],
        });
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body.instructors).to.be.a("array");
    expect(res.body.instructors[0].last_name).to.include("Admin");
    expect(res.body.schedule[2].day).to.include("Thursday");
    expect(res.body.description).to.include("TEST POST");
});
