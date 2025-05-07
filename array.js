// 动态数组代码实现
// ⚠️注意事项：
// 1、当数组元素个数达到底层静态数组的容量上限时，扩容为原来的 2 倍；
// 2、当数组元素个数缩减到底层静态数组的容量的 1/4 时，缩容为原来的 1/2；
// 3、索引越界检查：只要涉及到index相关的操作，都要检查index的有效性；
// 4、插入元素，检查 index 索引位置是否可以添加元素，所以需要考虑最后一个位置，即 size 位置是否可以添加元素；
// 5、删除元素，需要移动位置，所以需要考虑最后一个位置，即 size-1 位置是否可以删除元素，且最后一个位置需要置空（null），防止内存泄漏；
// +———————————-+
// | MyArrayList |
// +———————————-+
// | 字段 (Fields) |
// | - E[] data | 数组存储数据 |
// | - int size | 当前数组大小 |
// | - static final int INIT_CAP | 默认初始容量 |
// +———————————-+
// | 构造方法 (Constructors) |
// | + MyArrayList() | 无参构造器 |
// | + MyArrayList(int initCapacity) | 带初始容量参数的构造器 |
// +———————————-+
// | 增 (Add) |
// | + addLast(E e): void | 在尾部添加元素 |
// | + add(int index, E e): void | 在指定位置插入元素 |
// | + addFirst(E e): void | 在头部插入元素 |
// +———————————-+
// | 删 (Remove) |
// | + removeLast(): E | 删除尾部元素 |
// | + remove(int index): E | 删除指定位置元素 |
// | + removeFirst(): E | 删除首个元素 |
// +———————————-+
// | 查 (Get) |
// | + get(int index): E | 获取指定索引的元素 |
// +———————————-+
// | 改 (Set) |
// | + set(int index, E element): E | 修改指定索引的元素 |
// +———————————-+
// | 工具方法 (Utility) |
// | + size(): int | 获取元素个数 |
// | + isEmpty(): boolean | 检查数组是否为空 |
// | - resize(int newCap): void | 动态调整数组容量 |
// | - isElementIndex(int index): boolean | 检查索引有效性 (操作元素) |
// | - isPositionIndex(int index): boolean | 检查索引有效性 (插入元素) |
// | - checkElementIndex(int index): void | 检查索引有效性 (抛异常) |
// | - checkPositionIndex(int index): void | 检查索引有效性 (抛异常) |
// | - display(): void | 打印数组状态 |
// +———————————-+
class MyArrayList {
	constructor(initCapacity = 1) {
		// 真正存储数据的底层数组
		this.data = [];
		// 记录当前元素个数
		this.size = 0;
		// // 默认初始容量
		// this.INIT_CAP = 1;

		// 初始化
		this.init(initCapacity);
	}

	init(initCapacity) {
		// 初始化底层数组
		this.data = new Array(initCapacity);
		this.size = 0;
	}

	// 增 - 按顺序添加元素
	addLast(element) {
		const cap = this.data.length;
		if (this.size === cap) {
			// 底层数组已满，自动扩容
			this.resize(cap * 2);
		}
		this.data[this.size] = element;
		this.size++;
	}
	// 增 - 按索引添加元素
	add(index, element) {
		this.checkPositionIndex(index);
		const cap = this.data.length;
		// 看data数组容量够不够，不够自动扩容
		if (this.size === cap) {
			this.resize(cap * 2);
		}
		// 搬移数据 data[index..] -> data[index+1..]
        // 给新元素腾出位置
		for (let i = this.size - 1; i >= index; i--) {
			this.data[i + 1] = this.data[i];
		}
		this.data[index] = element;
		this.size++;
	}
	// 增 - 头部添加元素
	addFirst(element) {
		this.add(0, element);
	}

	// 删
	removeLast() {
		// 当元素删除完后，记得抛出异常
		if (this.size === 0) {
			throw new Error("NoSuchElementException");
		}
		const cap = this.data.length;
		// 可以缩容，节约空间
		if (this.size === Math.floor(cap / 4)) {
			this.resize(Math.floor(cap / 2));
		}
		const lastElement = this.data[this.size - 1];
		// 删除最后一个元素
		// 必须给最后一个元素赋值为null，否则会内存泄漏
		this.data[this.size - 1] = null;
		this.size--;
		return lastElement;
	}
	// 删除指定下标的元素
	remove(index) {
		// 检查索引是否越界
		this.checkElementIndex(index);

		const cap = this.data.length;
		// 可以缩容，节约空间
		if (this.size === Math.floor(cap / 4)) {
			this.resize(Math.floor(cap / 2));
		}
		const deletedVal = this.data[index];
		// 搬移数据 data[index+1..] -> data[index..]
		for (let i = index; i < this.size - 1; i++) {
			this.data[i] = this.data[i + 1];
		}
		this.data[this.size - 1] = null;
		this.size--;
		return deletedVal;
	}

	// 删除第一个元素
	removeFirst() {
		return this.remove(0);
	}

	// 改
	set(index, element) {
		// 检查索引是否越界
		this.checkElementIndex(index);
		const oldVal = this.data[index];
		this.data[index] = element;
		return oldVal;
	}

	// 查
	get(index) {
		// 检查索引是否越界
		this.checkElementIndex(index);
		return this.data[index];
	}

	// 工具方法
	// 查询大小
	getSize() {
		return this.size;
	}
	// 是否为空
	isEmpty() {
		return this.size === 0;
	}
	// 将 data 的容量改为 newCap，自动扩容
	resize(newCap) {
		const temp = new Array(newCap);
		for (let i = 0; i < this.size; i++) {
			temp[i] = this.data[i];
		}
		this.data = temp;
	}

	isElementIndex(index) {
		return index >= 0 && index < this.size;
	}
	// 检查索引是否越界
	isPositionIndex(index) {
		return index >= 0 && index <= this.size;
	}
	// 检查 index 索引位置是否可以存在元素
	checkElementIndex(index) {
		if (!this.isElementIndex(index)) {
			throw new Error("Index: " + index + ", Size: " + this.size);
		}
	}
	// 检查 index 索引位置是否可以添加元素 (插入元素专用校验)
	checkPositionIndex(index) {
		if (!this.isPositionIndex(index)) {
			throw new Error("Index: " + index + ", Size: " + this.size);
		}
	}
	display() {
		console.log("size = " + this.size + " cap = " + this.data.length);
		console.log(this.data);
	}
}

const arr = new MyArrayList(10);
for (let i = 0; i < 11; i++) {
	arr.addLast(i);
}
arr.removeFirst();
arr.display();
