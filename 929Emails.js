// I figured this one out in a few minutes on my own. I'm starting to figure out the string js commands
// 12-24-21

var numUniqueEmails = function (emails) {
    let finalSet = new Set();
    for (let i = 0; i < emails.length; i++) {
        let local = emails[i].split("@")[0].split("+")[0].split(".").join("");
        let domain = emails[i].split("@")[1];
        let email = local + "@" + domain;
        finalSet.add(email);
    }
    return finalSet.size;
    // return number of emails that are emailed to
};

const emails = [
    "test.email+alex@leetcode.com",
    "test.e.mail+bob.cathy@leetcode.com",
    "testemail+david@lee.tcode.com",
];
console.log(numUniqueEmails(emails));
