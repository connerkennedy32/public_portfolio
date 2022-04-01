// {
//     semester: 20211,
//     catalog_number: "515",
//     section_number: 1,
//     catalog_title: "Civil Procedure :)",
//     description: "Learning about Civil Procedures ... maybe",
//     curriculum_id: 3378,
//     title_code: 1,
//     credit_hours: "4.50",
//     text_for_blank_credit_hour: "",
//     class_schedule_block_type: "1",
//     short_title: "CIVIL PROCEDURE",
//     seating_capacity: 105,
//     current_seating: 2,
//     notes: "",
//     // intructors: 011111111|TEST LAST
//     // intructors: 11111111,TEST LAST
//     instructors: [
//         {
//             id: 011111111,
//             first_name: "TEST",
//             last_name: "LAST",
//         },
//         {
//             id: "",
//             first_name: "",
//             last_name: "TEST LAST",
//         },
//     ],
//     schedule: [
//         {
//             day: "Monday",
//             start: "14:30:00",
//             end: "15:45:00",
//             room: "205",
//         },
//         {
//             day: "Wednesday",
//             start: "14:30:00",
//             end: "15:45:00",
//             room: "205",
//         },
//         {
//             day: "Friday",
//             start: "14:30:00",
//             end: "15:45:00",
//             room: "207",
//         },
//     ],
// }

async function getInstructorsAndSchedule(course, schedule, isHistory) {
    let nameArray = [];
    let idArray = [];
    let nonIdArray = [];
    let days = [];
    let person_list = [];

    for (let i in schedule) {
        days[i] = await getDaySchedule(schedule[i]);
    }
    for (let courseIndex in course) {
        let sequenceMap = new Map();
        let sequenceNameMap = new Map();
        let personMap = new Map();
        course[courseIndex].schedule = days[courseIndex];
        if (course[courseIndex].instructors == null) {
            nameArray = [];
        } else {
            nameArray = course[courseIndex].instructors.split("|");
        }
        idArray = numbersOrLettersOnly(nameArray, true);
        nonIdArray = numbersOrLettersOnly(nameArray, false);

        sequenceMap.set(course[courseIndex].sequence, idArray);

        person_list = await person
            .query()
            .select("id", "first_name", "last_name")
            .mostRecent()
            .where("id", "in", idArray);

        for (let person in person_list) {
            personMap.set(person_list[person].id, person_list[person]);
        }

        for (const [key, value] of sequenceMap.entries()) {
            for (let val in value) {
                if (!sequenceNameMap.has(key)) {
                    sequenceNameMap.set(key, [personMap.get(value[val])]);
                } else {
                    sequenceNameMap.get(key).push(personMap.get(value[val]));
                }
            }
        }

        if (
            course[courseIndex].instructors == undefined ||
            course[courseIndex].instructors == ""
        ) {
            course[courseIndex].instructors = {
                id: "",
                first_name: "",
                last_name: "",
            };
            continue;
        }

        course[courseIndex].instructors = sequenceNameMap.get(
            course[courseIndex].sequence
        );
        for (let index in nonIdArray) {
            if (course[courseIndex].instructors == undefined) {
                course[courseIndex].instructors = [];
            }
            course[courseIndex].instructors.push({
                id: "",
                first_name: "",
                last_name: nonIdArray[index],
            });
        }
    }
}
