class Transaction {
    constructor(description, amount, day) {
        this.description = description;
        this.amount = amount;
        this.day = day;
    }
}

const data = [
    new Transaction("Netflix", 9.99, 10),
    new Transaction("Netflix", 9.99, 20),
    new Transaction("Netflix", 9.99, 30),
    new Transaction("Netflix", 9.99, 40),
    new Transaction("Amazon", 27.12, 32),
    new Transaction("Amazon", 27.12, 43),
    new Transaction("Amazon", 27.12, 52),
    new Transaction("Sprint", 50.11, 45),
    new Transaction("Sprint", 50.11, 55),
    new Transaction("Sprint", 50.11, 65),
    // new Transaction("Sprint", 60.13, 77),
];

//test to see if amount is the same
//test to see if day difference is the same
//test to see if it's three or more days

let map = new Map();

for (let i = 0; i < data.length; i++) {
    let desc = data[i].description;
    let amount = data[i].amount;
    let day = data[i].day;

    if (!map.has(desc)) {
        map.set(desc, [amount, day, null, 1, true]);
    } else {
        let isValid = map.get(desc)[4];
        // is the amount the same
        if (map.get(desc)[0] === amount) {
            // if no day diff, calc day diff
            if (map.get(desc)[2] === null) {
                let diff = day - map.get(desc)[1];
                map.set(desc, [
                    amount,
                    day,
                    diff,
                    map.get(desc)[3] + 1,
                    isValid,
                ]);
            } else {
                //  is the day diff the same
                let diff = day - map.get(desc)[1];
                if (diff === map.get(desc)[2]) {
                    //  if it is, add to the number of transactions
                    map.set(desc, [
                        amount,
                        day,
                        diff,
                        map.get(desc)[3] + 1,
                        isValid,
                    ]);
                } else {
                    map.set(desc, [amount, day, null, 0, isValid]);
                }
            }
        } else {
            map.set(desc, [amount, day, null, 0, isValid]);
        }
        // if any of these are false, disqualify the description
    }
}

let ans = [];
for (let [key, value] of map.entries()) {
    // if three or more meet the criteria and days in between is consistent
    if (value[3] >= 3 && value[4] === true) {
        ans.push(key);
    }
}

console.log(ans);
