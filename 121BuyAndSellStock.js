/*I couldn't figure this one out for some reason. I looked up the solution and this one came up. I was
severely overthinking it. I needed to ask myself better questions and reframe it in my mind better.
I'll get better at this one 1/1/22*/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let min = Number.MAX_VALUE;
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i];
        } else if (prices[i] - min > maxProfit) {
            maxProfit = prices[i] - min;
        }
    }
    return maxProfit;
};
