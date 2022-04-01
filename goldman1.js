function gameWinner(colors) {
    // Write your code here
    let whites,
        blacks,
        whiteScore,
        blackScore = 0;
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] === "w") {
            whites++;
            if (blacks >= 3) {
                blackScore += blacks - 2;
            }
            blacks = 0;
        } else {
            blacks++;
            if (whites >= 3) {
                whiteScore += whites - 2;
            }
            whites = 0;
        }
    }
    if (whites >= 3) {
        whiteScore += whites - 2;
    }
    if (blacks >= 3) {
        blackScore += blacks - 2;
    }
    if (whiteScore > blackScore) {
        return "WENDY";
    } else {
        return "BOB";
    }
}

let colors = "wwwbbbbwww";
console.log(gameWinner(colors));
