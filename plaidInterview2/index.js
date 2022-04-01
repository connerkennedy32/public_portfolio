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

let map = new Map();

for (let i = 0; i < data.length; i++) {
    if (!map.has(data[i].description)) {
        map.set(data[i].description, [
            data[i].day, //Day [0]
            data[i].amount, //Amount [1]
            null, //Difference in Days [2]
            1, //Count [3]
            true, //Is valid sequence [4]
        ]);
    } else {
        //The description is in the map
        if (
            map.get(data[i].description)[1] === data[i]["amount"] &&
            map.get(data[i].description)[4]
        ) {
            //If amount is the same
            if (map.get(data[i].description)[2] === null) {
                //If there hasn't been a difference calculated yet
                let diff = data[i].day - map.get(data[i].description)[0];
                map.set(data[i].description, [
                    data[i].day,
                    data[i].amount,
                    diff,
                    map.get(data[i].description)[3] + 1,
                    true,
                ]);
            } else {
                //If the difference is not null
                //calc to see if difference is the correct amount
                let diff = data[i].day - map.get(data[i].description)[0];
                if (diff === map.get(data[i].description)[2]) {
                    map.set(data[i].description, [
                        data[i].day,
                        data[i].amount,
                        diff,
                        map.get(data[i].description)[3] + 1,
                        true,
                    ]);
                }
            }
        } else {
            //if the amount is not the same
            map.set(data[i].description, [
                data[i].day,
                data[i].amount,
                null,
                map.get(data[i].description)[3] + 1,
                false,
            ]);
        }
    }
}

let ans = [];

for (const [key, value] of map.entries()) {
    if (value[3] >= 3 && value[4]) {
        ans.push(key);
    }
}

console.log(ans);
