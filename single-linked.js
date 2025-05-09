// 可以理解成是一个构造函数，用来初始化一个链表节点。
var ListNode = function (val) {
	this.val = val;
	this.next = null;
};

// 输入一个数组，转换为一条单链表
var createLinkedList = function (arr) {
	if (arr === null || arr.length === 0) {
		return null;
	}
	var head = new ListNode(arr[0]);
	var cur = head;
	for (var i = 1; i < arr.length; i++) {
		cur.next = new ListNode(arr[i]); // 创建新节点并连接到当前节点的 next
		cur = cur.next; // 移动cur节点指针到新节点
	}
	return head;
};

// 创建一条单链表
let head = createLinkedList([1, 2, 3, 4, 5]);
// 遍历单链表
function traverseLinkedList(head) {
	for (let p = head; p !== null; p = p.next) {
		console.log(p);
	}
}

var newNode = new ListNode(0);
/**
 * 在单链表头部插入新元素
 * @param {*} _head - 链表的头节点
 * @param {*} newNode - 要插入的新节点
 */
function addFirst(_head, newNode) {
	newNode.next = _head; // 将新节点的 next 指向原链表的头节点
	head = newNode; // 更新头节点为新节点
}
// addFirst(head, newNode);
// traverseLinkedList(head);

var newNode = new ListNode(6);
/**
 * 在单链表尾部插入一个新节点
 * @param {*} _head - 链表的头节点
 * @param {*} newNode - 要插入的新节点
 */
function addLast(_head, newNode) {
	let p = _head; // 定义一个指针 p 指向链表的头节点
	while (p.next !== null) {
		p = p.next; // 移动指针 p 到链表的最后一个节点
	}
	p.next = newNode; // 将新节点 newNode 连接到链表的末尾
	head = _head; // 更新头节点为新的头节点
}

// addLast(head, newNode);
// traverseLinkedList(head);

/**
 * 在单链表的任意位置插入一个新节点
 * @param {ListNode} _head - 链表的头节点
 * @param {number} index - 插入位置的索引，从0开始
 * @param {ListNode} newNode - 要插入的新节点
 */
var newNode = new ListNode(99);
function addIndex(_head, index, newNode) {
	if (index < 0) {
		// 检查是否越界，抛出错误
		throw new Error("Index out of bounds");
	}
	// 处理插入到头部的情况
	if (index === 0) {
		addFirst(_head, newNode);
		return;
	}
	let p = _head; // 定义一个指针 p 指向链表的头节点
	for (let i = 0; i < index - 1; i++) {
		if (p === null) {
			// 检查是否越界，抛出错误
			throw new Error("Index out of bounds");
		}
		p = p.next; // 移动 p 到第 index-1 个节点
	}
	newNode.next = p.next; // 新节点的 next 指向原第 index 个节点
	p.next = newNode; // 原第 index-1 个节点的 next 指向新节点
	head = _head; // 更新头节点为新的头节点
}
// addIndex(head, -3, newNode, true);
// traverseLinkedList(head);

/**
 * 删除单链表中的第一个节点
 * @param {*} _head
 */
function removeFirst(_head) {
	if (_head === null) {
		// 检查链表是否为空，抛出错误
		throw new Error("Linked list is empty");
	}
	_head = _head.next; // 将头节点指向下一个节点
	head = _head; // 更新头节点为新的头节点
}
// removeFirst(head);
// traverseLinkedList(head);

/**
 * 删除单链表中的最后一个节点
 * @param {*} _head
 */
function removeLast(_head) {
	if (_head === null) {
		// 检查链表是否为空，抛出错误
		throw new Error("Linked list is empty");
	}
	if (_head.next === null) {
		// 链表只有一个节点，直接删除
		_head = null;
		return;
	}
	let p = _head; // 定义一个指针 p 指向链表的头节点
	while (p.next.next !== null) {
		p = p.next; // 移动 p 到倒数第二个节点
	}
	p.next = null; // 将倒数第二个节点的 next 指向 null，删除最后一个节点
	head = _head; // 更新头节点为新的头节点
}
// removeLast(head);
// traverseLinkedList(head);

/**
 * 在单链表中删除指定索引的节点
 * @param {ListNode} _head - 链表的头节点
 * @param {number} index - 要删除的节点的索引，从0开始
 */
function removeIndex(_head, index) {
	if (index < 0) {
		// 检查是否越界，抛出错误
		throw new Error("Index out of bounds");
	}
	if (index === 0) {
		// 处理删除头节点的情况
		removeFirst(_head);
		return;
	}
	let p = _head; // 定义一个指针 p 指向链表的头节点
	for (let i = 0; i < index - 1; i++) {
		if (p === null || p.next === null) {
			// 检查是否越界，抛出错误
			throw new Error("Index out of bounds");
		}
		p = p.next; // 移动 p 到第 index-1 个节点
	}
	if (p.next === null) {
		// 检查是否越界，抛出错误
		throw new Error("Index out of bounds");
	}
	p.next = p.next.next; // 将第 index-1 个节点的 next 指向第 index+1 个节点，跳过第 index 个节点
	head = _head; // 更新头节点为新的头节点
}

removeIndex(head, 4);
traverseLinkedList(head);
