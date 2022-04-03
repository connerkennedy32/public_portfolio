{
    monday_start_time = ;
    monday_end_time;
    tuesday_start_time;
    tuesday_end_time;
    wednesday_start_time;
    wednesday_end_time;
    thursday_start_time;
    thursday_end_time;
    friday_start_time;
    friday_end_time;
    saturday_start_time;
    saturday_end_time;
}

function getDaySchedule(schedule) {
    let days = [];
    if (schedule.monday_start_time != null) {
        let monday = {
            day: "Monday",
            start: schedule.monday_start_time,
            end: schedule.monday_end_time,
            room: schedule.monday_room,
        };
        days.push(monday);
    }
    if (schedule.tuesday_start_time != null) {
        let tuesday = {
            day: "Tuesday",
            start: schedule.tuesday_start_time,
            end: schedule.tuesday_end_time,
            room: schedule.tuesday_room,
        };
        days.push(tuesday);
    }
    if (schedule.wednesday_start_time != null) {
        let wednesday = {
            day: "Wednesday",
            start: schedule.wednesday_start_time,
            end: schedule.wednesday_end_time,
            room: schedule.wednesday_room,
        };
        days.push(wednesday);
    }
    if (schedule.thursday_start_time != null) {
        let thursday = {
            day: "Thursday",
            start: schedule.thursday_start_time,
            end: schedule.thursday_end_time,
            room: schedule.thursday_room,
        };
        days.push(thursday);
    }
    if (schedule.friday_start_time != null) {
        let friday = {
            day: "Friday",
            start: schedule.friday_start_time,
            end: schedule.friday_end_time,
            room: schedule.friday_room,
        };
        days.push(friday);
    }
    if (schedule.saturday_start_time != null) {
        let saturday = {
            day: "Saturday",
            start: schedule.saturday_start_time,
            end: schedule.saturday_end_time,
            room: schedule.saturday_room,
        };
        days.push(saturday);
    }
    return days;
}

function getScheduleRecord(schedule) {
    let record = {};
    for (var days in schedule) {
        var day = schedule[days].day;
        day = day.toLowerCase();
        record[`${day}_start_time`] = schedule[days].start;
        record[`${day}_end_time`] = schedule[days].end;
        record[`${day}_room`] = schedule[days].room;
    }
    return record;
}

// getSchedule Function

function getSchedule(schedule, og_time, days, room) {
    var time = getTimeForCourse(og_time);
    days = getDayForCourse(days);
    days = days.toLowerCase();
    if (days.includes("m")) {
        schedule.monday_start_time = time.start;
        schedule.monday_end_time = time.end;
        schedule.monday_room = room;
    }
    if (days.includes("tu")) {
        schedule.tuesday_start_time = time.start;
        schedule.tuesday_end_time = time.end;
        schedule.tuesday_room = room;
    }
    if (days.includes("w")) {
        schedule.wednesday_start_time = time.start;
        schedule.wednesday_end_time = time.end;
        schedule.wednesday_room = room;
    }
    if (days.includes("th")) {
        schedule.thursday_start_time = time.start;
        schedule.thursday_end_time = time.end;
        schedule.thursday_room = room;
    }
    if (days.includes("f")) {
        schedule.friday_start_time = time.start;
        schedule.friday_end_time = time.end;
        schedule.friday_room = room;
    }
    if (days.includes("s")) {
        schedule.saturday_start_time = time.start;
        schedule.saturday_end_time = time.end;
        schedule.saturday_room = room;
    }
    return schedule;
}
