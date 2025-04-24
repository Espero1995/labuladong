/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	// 利用map特性 key-value 存储 key为值 value为索引
	const map = new Map();
	for (let i = 0; i < nums.length; i++) {
		const num = nums[i];
        // 查表，看看是否有能和 nums[i] 凑出 target 的元素
		const diff = target - num;
		if (map.has(diff)) {
			return [map.get(diff), i];
		}
        // 存入 val -> index 的映射
		map.set(num, i);
	}
};

console.log(twoSum([2, 7, 11, 15], 9)); // [ 0, 1 ]
console.log(twoSum([3, 2, 4], 6)); // [ 1, 2 ]
console.log(twoSum([3, 3], 6)); // [ 0, 1 ]
