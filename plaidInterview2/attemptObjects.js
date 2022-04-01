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
    new Transaction("Amazon", 27.12, 32),
    new Transaction("Sprint", 50.11, 45),
    new Transaction("Sprint", 50.11, 55),
    new Transaction("Sprint", 50.11, 65),
    new Transaction("Sprint", 60.13, 77),
];

let map = {};

for (let i = 0; i < data.length; i++) {
    let desc = data[i].description;
    let amount = data[i].amount;
    let day = data[i].day;

    if (!map[`${desc}`]) {
        map[`${desc}`] = {
            amount: amount,
            day: day,
            isValid: true,
            count: 1,
        };
    } else {
        map[`${desc}`] = {
            amount: amount,
            day: day,
            isValid: true,
            count: map[`${desc}`].count + 1,
        };
    }
}

console.log("ETSET");
