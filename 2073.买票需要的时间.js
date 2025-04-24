/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
    // 首先得出结论，下标index在 哪一位上，那一位的tickets[index]的值就是循环的次数
	const counts = tickets[k];
	let time = 0;
	for (let i = 0; i < counts; i++) {
		for (let j = 0; j < tickets.length; j++) {
            // 在到票刚好为0的那一刻，后面的人无需再循环了，直接跳出循环
            if (tickets[k] === 0) break;
			if (tickets[j] > 0) {
				tickets[j]--;
				time++;
			}
		}
	}
	console.log("最后的余票：",tickets);
	return time;
};

console.log(timeRequiredToBuy([2, 3, 2], 2));
console.log(timeRequiredToBuy([5, 1, 1, 1], 0));
console.log(timeRequiredToBuy([84, 49, 5, 24, 70, 77, 87, 8], 3));