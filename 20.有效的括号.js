/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    // 利用栈的特性 后进先出 先遇到的左括号要后闭合
    // 1. 先把所有的左括号入栈
	let left_stack = [];
    // 匹配的map
    const right_map = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
	for (let c = 0; c < s.length; c++) {
		if (s[c] === "(" || s[c] === "[" || s[c] === "{") {
			left_stack.push(s[c]);
		}else {
            // 2. 遇到右括号时，栈顶出栈，和这个右括号比较
            // 如果和栈顶的左括号不匹配，说明非法，直接返回 false
            let left = left_stack.pop();
            if (right_map[left] !== s[c]) {
                return false;
            }
        }
	}
    return left_stack.length === 0;
};

console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));