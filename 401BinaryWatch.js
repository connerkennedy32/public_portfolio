// The logic on this works perfectly, but for some reason it shows "..." after the 100th item. 12-22-21

function BinaryWatch(turnedOn) {
    if (turnedOn >= 9) return [];
    let map = {
        1: 60,
        2: 120,
        3: 240,
        4: 480,
        5: 1,
        6: 2,
        7: 4,
        8: 8,
        9: 16,
        10: 32,
    };
    let res = new Set();

    let bt = (i, s) => {
        if (s >= 720) return;
        if (i === turnedOn) {
            let hour = Math.floor(s / 60);
            let minute = s % 60 < 10 ? "0" + (s % 60) : s % 60;
            let conv = hour + ":" + minute;
            return res.add(conv);
        }
        if (i > turnedOn) return;

        for (let j = 1; j <= 10; j++) {
            if (s != map[j]) {
                bt(i + 1, s + map[j]);
            }
        }
    };
    bt(0, 0);
    let result = [];
    res.forEach((value) => result.push(value));
    return result;
}

let turnedOn = 3;
let ans = BinaryWatch(turnedOn);

console.log(ans);
