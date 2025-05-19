// 定义一个双链表节点的构造函数
// 双链表，说白了就是循环一个数组，每个元素的next指向下一个元素，prev指向上一个元素
// 每个节点有三个属性：
// 1. val：节点的值
// 2. next：指向下一个节点的指针
// 3. prev：指向上一个节点的指针
// 双链表的头节点的prev指向null，尾节点的next指向null

function DoublyListNode(x) {
	this.val = x;
	// 初始化的时候头和尾节点都为null
	this.next = this.prev = null;
}

// 输入一个数组，转换为一条双链表
var createDoublyLinkedList = function (arr) {
	if (arr === null || arr.length === 0) {
		return null;
	}
	var head = new DoublyListNode(arr[0]);
	var cur = head;
	for (let i = 1; i < arr.length; i++) {
		let newNode = new DoublyListNode(arr[i]);
		cur.next = newNode;
		newNode.prev = cur;
		cur = cur.next;
	}
	return head;
};

/**
 * 遍历双链表
 * @param {*} head - 双链表的头节点
 * @param {*} isReverse - 是否反向遍历，默认为 false
 */
function traverseDoublyLinkedList(head, isReverse = false) {
	let tail = null;
	for (let p = head; p !== null; p = p.next) {
		tail = p;
		if (!isReverse) {
			console.log("从前往后遍历：", p.val);
		}
	}
	if (isReverse) {
		console.log("双链表尾节点：", tail);
		for (let p = tail; p !== null; p = p.prev) {
			console.log("从后往前遍历：", p.val);
		}
	}
}

/**
 * 在双链表头部插入新元素
 * @param {*} _head - 双链表的头节点
 * @param {*} newNode - 要插入的新节点
 */
function addFirst(_head, newNode) {
	// 如果链表为空，直接将新节点作为头节点
	if (_head === null) {
		_head = newNode;
	} else {
		// 如果链表不为空，将新节点插入到链表头部
		newNode.next = _head;
		_head.prev = newNode;
		_head = newNode;
	}
	return _head;
}

/**
 * 在双链表尾部插入一个新节点
 * @param {*} _head - 双链表的头节点
 * @param {*} newNode - 要插入的新节点
 */
function addLast(_head, newNode) {
	// 如果链表为空，直接将新节点作为头节点
	if (_head === null) {
		_head = newNode;
	} else {
		var tail = _head;
		// 先走到链表的最后一个节点
		while (tail.next !== null) {
			tail = tail.next;
		}
		// 将新节点插入到链表尾部
		tail.next = newNode;
		newNode.prev = tail;
		tail = newNode;
	}
	return _head;
}

/**
 * 在双链表中的指定位置插入一个新节点
 * @param {*} _head - 双链表的头节点
 * @param {*} index - 要插入的位置
 * @param {*} newNode - 要插入的新节点
 */
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
	if (p.next !== null) {
		p.next.prev = newNode; // 原第 index 个节点的 prev 指向新节点
	}
	p.next = newNode; // 原第 index-1 个节点的 next 指向新节点
	newNode.prev = p; // 新节点的 prev 指向原第 index-1 个节点
	return _head;
}

/**
 * 删除双链表中的第一个节点
 * @param {*} _head - 双链表的头节点
 * @returns - 删除后的头节点
 */
function removeFirst(_head) {
	if (_head === null) {
		// 检查链表是否为空，抛出错误
		throw new Error("Linked list is empty");
	}
	let p = _head; // 保存要删除的节点
	_head = _head.next; // 将头节点指向下一个节点
	if (_head !== null) {
		_head.prev = null; // 将新的头节点的 prev 指向 null
	}
	p.next = null; // 将要删除的节点的 next 指向 null
	return _head;
}

/**
 * 删除双链表中的最后一个节点
 * @param {*} _head - 双链表的头节点
 * @returns - 删除后的头节点
 */
function removerLast(_head) {
	if (_head === null) {
		// 检查链表是否为空，抛出错误
		throw new Error("Linked list is empty");
	}
	let p = _head; // 保存要删除的节点
	while (p.next !== null) {
		p = p.next; // 移动 p 到链表的最后一个节点
	}

	// 现在 p 指向尾节点
	// 把尾节点从链表中摘除
	p.prev.next = null; // 将倒数第二个节点的 next 指向 null
	p.prev = null; // 将尾节点的 prev 指向 null
	return _head;
}

/**
 * 删除双链表中的指定位置的节点
 * @param {*} _head - 双链表的头节点
 * @param {*} index - 要删除的节点的索引
 * @returns - 删除后的头节点
 */
function removeIndex(_head, index) {
	if (index < 0) {
		// 检查是否越界，抛出错误
		throw new Error("Index out of bounds");
	}
	if (index === 0) {
		// 如果要删除的是头节点，调用 removeFirst 方法
		return removeFirst(_head);
	}
	let p = _head; // 定义一个指针 p 指向链表的头节点
	for (let i = 0; i < index; i++) {
		if (p === null || p.next === null) {
			// 检查是否越界，抛出错误
			throw new Error("Index out of bounds");
		}
		p = p.next; // 移动 p 到第 index 个节点
	}
	if (p.next === null) {
		// 检查是否越界，抛出错误
		throw new Error("Index out of bounds");
	}
	// 现在 p 指向要删除的节点
	let toDel = p.next; // 保存要删除的节点
	p.next = toDel.next; // 将 p 的 next 指向要删除节点的下一个节点
	toDel.next.prev = p; // 将要删除节点的下一个节点的 prev 指向 p

	toDel.next = null; // 将要删除节点的 next 指向 null
	toDel.prev = null; // 将要删除节点的 prev 指向 null
	return _head;
}



const head = createDoublyLinkedList([1, 2, 3, 4, 5]);
// console.log("双链表：", head);
// 遍历双链表
// traverseDoublyLinkedList(head, true);

// 在双链表头部插入新元素
// const newNode = new DoublyListNode(0);
// const newHead = addFirst(head, newNode);
// console.log("在双链表头部插入新元素：", newHead);

// 在双链表尾部插入新元素
// const newNode = new DoublyListNode(6);
// const newHead2 = addLast(head, newNode);
// console.log("在双链表尾部插入新元素：", newHead2);
// traverseDoublyLinkedList(newHead2, true);

// 在双链表中的指定位置插入新元素
// const newNode = new DoublyListNode(100);
// const newHead3 = addIndex(head, 3, newNode);
// console.log("在双链表中的指定位置插入新元素：", newHead3);
// traverseDoublyLinkedList(newHead3);

// 删除双链表中的第一个节点
// const newHead4 = removeFirst(head);
// console.log("删除双链表中的第一个节点：", newHead4);
// traverseDoublyLinkedList(newHead4);

// 删除双链表中的最后一个节点
// const newHead5 = removerLast(head);
// console.log("删除双链表中的最后一个节点：", newHead5);
// traverseDoublyLinkedList(newHead5, true);