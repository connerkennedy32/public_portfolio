// Mention how difficult it was to split up the data into the correct time slots... the original data put
// all the date into one field fx "Mon 10-10:30". We had to parse that out and put it into the DB in a way that
// we could use an API on it

async function getCourseDirectory(req, res, authorizer) {
    const semester = req.query.semester || "%";
    const catalog_number = req.query.catalog_number || "%";
    const section_number = req.query.section_number || "%";
    const catalog_title = req.query.catalog_title || "%";
    const description = req.query.description || "%";
    const credits = req.query.credits || "%";
    const instructor_name = req.query.instructor_name || "%";
    const id = authorizer.id;
    const show_instructor_courses = req.query.show_instructor_courses || false;
    const days = {
        monday: req.query.monday || false,
        tuesday: req.query.tuesday || false,
        wednesday: req.query.wednesday || false,
        thursday: req.query.thursday || false,
        friday: req.query.friday || false,
        saturday: req.query.saturday || false,
    };

    try {
        const has_admin_registrar_operator_permissions =
            await permissionchecker.hasRights(authorizer, [
                "admin",
                "registrar",
                "operator",
            ]);
        const has_faculty_student_permissions =
            await permissionchecker.hasRights(authorizer, [
                "faculty",
                "student",
            ]);
        if (
            has_admin_registrar_operator_permissions ||
            has_faculty_student_permissions
        ) {
            let day_record = {};
            let no_day_params = false;

            if (
                !days.monday &&
                !days.tuesday &&
                !days.wednesday &&
                !days.thursday &&
                !days.friday &&
                !days.saturday
            ) {
                day_record.monday_start_time = "0:00";
                day_record.monday_end_time = "24:00";
                day_record.tuesday_start_time = "0:00";
                day_record.tuesday_end_time = "24:00";
                day_record.wednesday_start_time = "0:00";
                day_record.wednesday_end_time = "24:00";
                day_record.thursday_start_time = "0:00";
                day_record.thursday_end_time = "24:00";
                day_record.friday_start_time = "0:00";
                day_record.friday_end_time = "24:00";
                day_record.saturday_start_time = "0:00";
                day_record.saturday_end_time = "24:00";
                no_day_params = true;
            } else {
                day_record = getTimesFromDayParams(days);
            }

            let no_instructor_param = true;
            if (instructor_name !== "%") {
                no_instructor_param = false;
            }

            let all_courses = await courses
                .query()
                .select(
                    "courses.semester",
                    "courses.catalog_number",
                    "courses.section_number",
                    "courses.catalog_title",
                    "courses.description",
                    "courses.curriculum_id",
                    "courses.title_code",
                    "courses.credit_hours",
                    "courses.text_for_blank_credit_hour",
                    "courses.class_schedule_block_type",
                    "courses.short_title",
                    "courses.seating_capacity",
                    "courses.current_seating",
                    "courses.notes",
                    "courses.instructors",
                    "courses.start_date",
                    "courses.end_date",
                    "course_schedule.monday_start_time",
                    "course_schedule.monday_end_time",
                    "course_schedule.monday_room",
                    "course_schedule.tuesday_start_time",
                    "course_schedule.tuesday_end_time",
                    "course_schedule.tuesday_room",
                    "course_schedule.wednesday_start_time",
                    "course_schedule.wednesday_end_time",
                    "course_schedule.wednesday_room",
                    "course_schedule.thursday_start_time",
                    "course_schedule.thursday_end_time",
                    "course_schedule.thursday_room",
                    "course_schedule.friday_start_time",
                    "course_schedule.friday_end_time",
                    "course_schedule.friday_room",
                    "course_schedule.saturday_start_time",
                    "course_schedule.saturday_end_time",
                    "course_schedule.saturday_room",
                    "grade_status",
                    "grade_requirements",
                    "meets_grade_reqs"
                )
                .join("course_schedule", function () {
                    this.on("courses.semester", "course_schedule.semester")
                        .on(
                            "courses.catalog_number",
                            "course_schedule.catalog_number"
                        )
                        .on(
                            "courses.section_number",
                            "course_schedule.section_number"
                        );
                })
                .mostRecent()
                .joinMostRecent(course_schedule)
                .whereRaw(
                    `(courses.semester LIKE '%${semester}%' OR (courses.semester IS NULL AND '${semester}' = "%"))`
                )
                .whereRaw(
                    `(courses.catalog_number LIKE '%${catalog_number}%' OR (courses.catalog_number IS NULL AND '${catalog_number}' = "%"))`
                )
                .whereRaw(
                    `(courses.section_number LIKE '%${section_number}%' OR (courses.section_number IS NULL AND '${section_number}' = "%"))`
                )
                .whereRaw(
                    `(courses.catalog_title LIKE '%${catalog_title}%' OR (courses.catalog_title IS NULL AND '${catalog_title}' = "%"))`
                )
                .whereRaw(
                    `(courses.description LIKE '%${description}%' OR (courses.description IS NULL AND '${description}' = "%"))`
                )
                .whereRaw(
                    `(credit_hours LIKE '%${credits}%' OR (credit_hours IS NULL AND '${credits}' = "%"))`
                )
                .whereRaw(
                    `(${no_instructor_param} OR (instructors REGEXP '[0-9]') OR (instructors LIKE "%${instructor_name}%"))`
                )
                .whereRaw(
                    `(${no_day_params} OR NOT (monday_start_time IS NULL AND monday_end_time IS NULL AND tuesday_start_time IS NULL AND tuesday_end_time IS NULL AND wednesday_start_time IS NULL AND wednesday_end_time IS NULL AND thursday_start_time IS NULL AND thursday_end_time IS NULL AND friday_start_time IS NULL AND friday_end_time IS NULL AND saturday_start_time IS NULL AND saturday_end_time IS NULL))`
                )
                .whereRaw(
                    `(monday_start_time >= "${day_record.monday_start_time}" and monday_end_time <= "${day_record.monday_end_time}" or (monday_start_time is null and monday_end_time is null))`
                )
                .whereRaw(
                    `(tuesday_start_time >= "${day_record.tuesday_start_time}" and tuesday_end_time <= "${day_record.tuesday_end_time}" or (tuesday_start_time is null and tuesday_end_time is null))`
                )
                .whereRaw(
                    `(wednesday_start_time >= "${day_record.wednesday_start_time}" and wednesday_end_time <= "${day_record.wednesday_end_time}" or (wednesday_start_time is null and wednesday_end_time is null))`
                )
                .whereRaw(
                    `(thursday_start_time >= "${day_record.thursday_start_time}" and thursday_end_time <= "${day_record.thursday_end_time}" or (thursday_start_time is null and thursday_end_time is null))`
                )
                .whereRaw(
                    `(friday_start_time >= "${day_record.friday_start_time}" and friday_end_time <= "${day_record.friday_end_time}" or (friday_start_time is null and friday_end_time is null))`
                )
                .whereRaw(
                    `(saturday_start_time >= "${day_record.saturday_start_time}" and saturday_end_time <= "${day_record.saturday_end_time}" or (saturday_start_time is null and saturday_end_time is null))`
                )
                .notDeleted()
                .orderBy("courses.semester", "desc")
                .orderBy("courses.catalog_number", "asc")
                .orderBy("courses.section_number", "asc");

            let id_array = [];
            let course_map = new Map();
            let course_id_map = new Map();
            for (var i in all_courses) {
                let name_array = [];
                if (all_courses[i].instructors == null) {
                    name_array = [];
                } else {
                    name_array = all_courses[i].instructors.split("|");
                }
                let current_course_id_array = numbersOrLettersOnly(
                    name_array,
                    true
                );
                id_array = id_array.concat(current_course_id_array);

                if (
                    current_course_id_array.includes(
                        await permissionchecker.userid(authorizer)
                    ) ||
                    (await permissionchecker.hasRights(authorizer, [
                        "registrar",
                    ]))
                ) {
                    all_courses[i].can_edit = true;
                } else {
                    all_courses[i].can_edit = false;
                }
                let course_key =
                    all_courses[i].semester +
                    all_courses[i].catalog_number +
                    all_courses[i].section_number;
                course_map.set(course_key, all_courses[i]);
                if (name_array.length !== 0) {
                    course_id_map.set(course_key, name_array);
                }
            }

            let all_instructors = await person
                .query()
                .select("id", "first_name", "middle_name", "last_name")
                .where("type", "faculty")
                .where("id", "IN", id_array)
                .mostRecent()
                .notDeleted();

            let id_name_map = new Map();
            let first_last_map = new Map();
            let first_middle_last_map = new Map();
            for (var i in all_instructors) {
                var record = {};
                if (has_admin_registrar_operator_permissions) {
                    record = {
                        id: all_instructors[i].id,
                        first_name: all_instructors[i].first_name,
                        last_name: all_instructors[i].last_name,
                    };
                } else {
                    record = {
                        first_name: all_instructors[i].first_name,
                        last_name: all_instructors[i].last_name,
                    };
                }
                var first_last =
                    all_instructors[i].first_name +
                    " " +
                    all_instructors[i].last_name;
                var first_middle_last =
                    all_instructors[i].first_name +
                    " " +
                    all_instructors[i].middle_name +
                    " " +
                    all_instructors[i].last_name;
                id_name_map.set(all_instructors[i].id, record);
                first_last_map.set(all_instructors[i].id, first_last);
                first_middle_last_map.set(
                    all_instructors[i].id,
                    first_middle_last
                );
            }

            let course_name_map = new Map();
            if (!no_instructor_param) {
                for (const [key, value] of course_id_map) {
                    let has_matching_instructor = false;

                    let current_ids = numbersOrLettersOnly(value, true);
                    let current_last_names = numbersOrLettersOnly(value, false);

                    if (show_instructor_courses) {
                        let match = false;
                        for (let i in current_ids) {
                            if (current_ids[i] == id) {
                                match = true;
                            }
                        }
                        if (!match) {
                            course_map.delete(key);
                            continue;
                        }
                    }

                    for (let i in current_ids) {
                        if (
                            (first_last_map.has(current_ids[i]) &&
                                first_last_map
                                    .get(current_ids[i])
                                    .toLowerCase()
                                    .includes(instructor_name.toLowerCase())) ||
                            (first_middle_last_map.has(current_ids[i]) &&
                                first_middle_last_map
                                    .get(current_ids[i])
                                    .toLowerCase()
                                    .includes(instructor_name.toLowerCase()))
                        ) {
                            has_matching_instructor = true;
                        }
                    }
                    for (let i in current_last_names) {
                        let current_name = current_last_names[i].toLowerCase();
                        if (
                            current_name.includes(instructor_name.toLowerCase())
                        ) {
                            has_matching_instructor = true;
                        }
                    }

                    if (has_matching_instructor) {
                        for (let i in current_ids) {
                            if (course_name_map.has(key)) {
                                course_name_map
                                    .get(key)
                                    .push(id_name_map.get(current_ids[i]));
                            } else {
                                course_name_map.set(key, [
                                    id_name_map.get(current_ids[i]),
                                ]);
                            }
                        }
                        for (let i in current_last_names) {
                            let instructor_record = {
                                first_name: "",
                                last_name: current_last_names[i],
                            };
                            if (course_name_map.has(key)) {
                                course_name_map
                                    .get(key)
                                    .push(instructor_record);
                            } else {
                                course_name_map.set(key, [instructor_record]);
                            }
                        }
                    } else {
                        course_map.delete(key);
                    }
                }
            } else {
                for (const [key, value] of course_id_map) {
                    let current_ids = numbersOrLettersOnly(value, true);
                    let current_last_names = numbersOrLettersOnly(value, false);

                    if (show_instructor_courses) {
                        let match = false;
                        for (let i in current_ids) {
                            if (current_ids[i] == id) {
                                match = true;
                            }
                        }
                        if (!match) {
                            course_map.delete(key);
                            continue;
                        }
                    }

                    for (let i in current_ids) {
                        if (course_name_map.has(key)) {
                            course_name_map
                                .get(key)
                                .push(id_name_map.get(current_ids[i]));
                        } else {
                            course_name_map.set(key, [
                                id_name_map.get(current_ids[i]),
                            ]);
                        }
                    }
                    for (let i in current_last_names) {
                        var instructor_record = {};
                        if (has_admin_registrar_operator_permissions) {
                            instructor_record = {
                                id: "",
                                first_name: "",
                                last_name: current_last_names[i],
                            };
                        } else {
                            instructor_record = {
                                first_name: "",
                                last_name: current_last_names[i],
                            };
                        }
                        if (course_name_map.has(key)) {
                            course_name_map.get(key).push(instructor_record);
                        } else {
                            course_name_map.set(key, [instructor_record]);
                        }
                    }
                }
            }

            let final_result = [];
            for (let key of course_map.keys()) {
                let course_record = {};
                if (has_admin_registrar_operator_permissions) {
                    course_record = {
                        semester: course_map.get(key).semester,
                        catalog_number: course_map.get(key).catalog_number,
                        section_number: course_map.get(key).section_number,
                        catalog_title: course_map.get(key).catalog_title,
                        description: course_map.get(key).description,
                        curriculum_id: course_map.get(key).curriculum_id,
                        title_code: course_map.get(key).title_code,
                        credit_hours: course_map.get(key).credit_hours,
                        text_for_blank_credit_hour:
                            course_map.get(key).text_for_blank_credit_hour,
                        class_schedule_block_type:
                            course_map.get(key).class_schedule_block_type,
                        short_title: course_map.get(key).short_title,
                        seating_capacity: course_map.get(key).seating_capacity,
                        current_seating: course_map.get(key).current_seating,
                        notes: course_map.get(key).notes,
                        start_date: course_map.get(key).start_date,
                        end_date: course_map.get(key).end_date,
                        grade_requirements:
                            course_map.get(key).grade_requirements,
                        grade_status: course_map.get(key).grade_status,
                        meets_grade_reqs: course_map.get(key).meets_grade_reqs,
                        can_edit: course_map.get(key).can_edit,
                        instructors: [],
                        schedule: [],
                    };
                } else {
                    course_record = {
                        semester: course_map.get(key).semester,
                        catalog_number: course_map.get(key).catalog_number,
                        section_number: course_map.get(key).section_number,
                        catalog_title: course_map.get(key).catalog_title,
                        description: course_map.get(key).description,
                        curriculum_id: course_map.get(key).curriculum_id,
                        title_code: course_map.get(key).title_code,
                        credit_hours: course_map.get(key).credit_hours,
                        text_for_blank_credit_hour:
                            course_map.get(key).text_for_blank_credit_hour,
                        class_schedule_block_type:
                            course_map.get(key).class_schedule_block_type,
                        short_title: course_map.get(key).short_title,
                        seating_capacity: course_map.get(key).seating_capacity,
                        current_seating: course_map.get(key).current_seating,
                        notes: course_map.get(key).notes,
                        start_date: course_map.get(key).start_date,
                        end_date: course_map.get(key).end_date,
                        grade_requirements:
                            course_map.get(key).grade_requirements,
                        can_edit: course_map.get(key).can_edit,
                        instructors: [],
                        schedule: [],
                    };
                }

                if (
                    course_record.grade_requirements == null ||
                    course_record.grade_requirements === ""
                ) {
                    course_record.grade_requirements = "None";
                } else {
                    let grading_criteria = eval(
                        "new Grades." + course_record.grade_requirements + "()"
                    );
                    course_record.grade_requirements =
                        grading_criteria.returnFriendlyName();
                }

                let schedule_record = getDaySchedule(course_map.get(key));
                course_record.schedule = schedule_record;
                if (course_name_map.has(key)) {
                    let instructors_record = course_name_map.get(key);
                    course_record.instructors = instructors_record;
                }
                final_result.push(course_record);
            }
            final_result.sort(sortArrayOfJsonHelper("catalog_number", "asc"));
            final_result.sort(sortArrayOfJsonHelper("semester", "desc"));

            return res.status(200).send(JSON.stringify(final_result));
        } else {
            throw new ServiceError(403, insufficientRightsErr);
        }
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.statusCode).send(err.message);
        } else {
            return res.status(
                500,
                "Unknown Error while returning Course Directory"
            );
        }
    }
}
