class Node {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.head = new Node(-1);
    this.tail = new Node(-1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  enQueue(data) {
    let node = new Node(data);
    node.next = this.tail;
    node.prev = this.tail.prev;
    this.tail.prev.next = node;
    this.tail.prev = node;
    this.size++;
  }
  deQueue() {
    if (this.ifEmpty()) return -1;
    let tmp = this.head.next;
    tmp.next.prev = this.head;
    this.head.next = tmp.next;
    this.size--;
    return tmp.data;
  }
  ifEmpty() {
    return this.size ? false : true;
  }
}
