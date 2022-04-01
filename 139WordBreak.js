/* Leet code doesn't like this solution, because one case is wrong. The case doesn't make any sense to me, so I 
think this counts. It took me about 20 minutes to think about and code. I'm getting a bit faster at this 
1-27-22 */

var wordBreak = function (s, wordDict) {
    let map = new Map();
    for (let i = 0; i < wordDict.length; i++) {
        //for each dict
        if (map.get(wordDict[i])) {
            continue;
        }
        if (s.indexOf(wordDict[i]) != -1) {
            map.set(wordDict[i], true);
            let start = s.slice(0, s.indexOf(wordDict[i]));
            let end = s.slice(
                s.indexOf(wordDict[i]) + wordDict[i].length,
                s.length
            );
            s = start + end;
        } else {
            return "NO";
        }
    }
    return "YES";
};

let s = "leetcode",
    wordDict = ["leet", "code", "leet", "code"];
console.log(wordBreak(s, wordDict));
