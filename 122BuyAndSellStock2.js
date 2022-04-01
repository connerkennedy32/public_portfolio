/*figured this one out completely without help. I drew out a little design, and it helped me come up with an idea
of how to do it. It always helps to draw it out. 1/1/22. Also, this was my 30th one. I can technically start
applying to jobs now */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let profit = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i + 1] > prices[i]) {
            profit += prices[i + 1] - prices[i];
        }
    }
    return profit;
    // return max profit
};

let prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices));
