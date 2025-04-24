/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
	let map = new Map();
	for (let i = 0; i < nums.length; i++) {
		const num = nums[i];
		map.set(num, (map.get(num) || 0) + 1);
	}
	for (let [key, value] of map) {
		if (value === 1) {
			return key;
		}
	}
};

console.log(singleNumber([2, 2, 1])); // 1
console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log(singleNumber([1])); // 1
