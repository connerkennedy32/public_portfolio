/* Need to work on this some more. It's a difficult one. I think I need to do some recursion... I'll chip away at it */
// 1/29/22
var ladderLength = function (beginWord, endWord, wordList) {
    let currWord = beginWord;
    let arr = [];
    let i = 0;
    while (currWord != endWord) {
        if (isOneAway(currWord, wordList[i])) {
            arr.push(currWord);
            currWord = wordList[i];
            i++;
        }
        if (isOneAway(currWord, endWord)) {
            arr.push(currWord);
            return arr.length + 1;
        }
    }
};

var isOneAway = function (word1, word2) {
    let letterDiff = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] != word2[i]) {
            letterDiff++;
        }
    }
    if (letterDiff > 1) {
        return false;
    } else {
        return true;
    }
};

let beginWord = "hit";
let endWord = "cog";
let wordList = ["hot", "dot", "dog", "lot", "log"];

console.log(ladderLength(beginWord, endWord, wordList));
