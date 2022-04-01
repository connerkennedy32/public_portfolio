/* Solved this in about 20 minutes. I had to look up how indexOf works exactly and ran into a problem that 
needed to be solved with parseInt, but overall not a super difficult problem. If I were to do it again,
i would use the split function instead of indexOf. That would have halved the time to solve the
question. 3/30/33*/
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
    if (cpdomains.length < 1) {
        return [];
    }
    let map = new Map();

    for (let i = 0; i < cpdomains.length; i++) {
        //loop through each domain
        //separate each subdomain
        let domain = [];

        let test = cpdomains[i].slice(cpdomains[i].indexOf(" ") + 1);
        let val = parseInt(cpdomains[i].slice(0, cpdomains[i].indexOf(" ")));
        domain.push(test);

        while (test.indexOf(".") != -1) {
            domain.push(test.slice(test.indexOf(".") + 1));
            test = test.slice(test.indexOf(".") + 1);
        }

        for (let j = 0; j < domain.length; j++) {
            if (!map.has(domain[j])) {
                map.set(domain[j], val);
            } else {
                map.set(domain[j], map.get(domain[j]) + val);
            }
        }
    }
    let ans = [];

    //now the map has all the values in it
    for (const [value, key] of map) {
        let s = "";
        s += key + " " + value;
        ans.push(s);
    }
    return ans;
};
