/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
	let set = new Set();
	for (let i = 0; i < nums.length; i++) {
        // console.log("nums[i]:",nums[i]);
		if (set.has(nums[i])) {
			return true;
		} 
        set.add(nums[i]);
        console.log("set:",set);
	}
    return false;
};

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
