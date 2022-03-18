class Queue {
  constructor() {
    this.queue = {};
    this.front = 0;
    this.rear = 0;
  }
  size() {
    if (this.queue[rear] === undefined) return 0;
    else return this.rear - this.front + 1;
  }
  push(data) {
    if (this.size() === 0) this.queue['0'] = data;
    else {
      this.queue[this.rear] = data;
      this.rear + 1;
    }
  }
  popLeft() {
    let temp;
    if (this.rear == this.front) {
      temp = this.queue[this.front];
      delete this.queue[this.front];
      this.front = 0;
      this.rear = 0;
    } else {
      temp = this.queue[this.front];
      delete this.queue[this.front];
      this.front++;
    }
    return temp;
  }
  peak() {
    return this.queue[this.front];
  }
}
