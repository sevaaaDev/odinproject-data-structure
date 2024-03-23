class LinkedList {
  constructor() {
    this.next = null;
  }

  #queue() {
    let queue = [];
    if (!this.next) return queue;
    queue.push(this.next);
    while (queue[queue.length - 1].next) {
      queue.push(queue[queue.length - 1].next);
    }
    return queue;
  }

  prepend(value) {
    this.next = new Node(value, this.next);
  }

  append(value) {
    if (!this.next) {
      this.prepend(value);
      return;
    }
    let queue = this.#queue();
    queue[queue.length - 1].next = new Node(value);
  }

  get size() {
    let queue = this.#queue();
    return queue.length;
  }

  get head() {
    return this.next;
  }

  get tail() {
    let queue = this.#queue();
    return queue[queue.length - 1];
  }

  at(index) {
    let queue = this.#queue();
    return queue[index] ? queue[index] : null;
  }

  get pop() {
    let queue = this.#queue();
    queue[queue.length - 2].next = null;
  }

  contains(value) {
    let queue = this.#queue();
    for (let node of queue) {
      if (node.value === value) {
        return true;
      }
    }
    return false;
  }

  find(value) {
    let queue = this.#queue();
    for (let index in queue) {
      if (queue[index].value === value) {
        return index;
      }
    }
    return null;
  }

  get toString() {
    let queue = this.#queue();
    let formatted = [];
    for (let node of queue) {
      formatted.push(`( ${node.value} )`);
    }
    formatted.push("null");
    return formatted.join(" -> ");
  }

  insertAt(value, index) {
    let queue = this.#queue();
    if (!queue[index - 1]) {
      throw new Error("the target index is over the list length");
    }
    queue[index - 1].next = new Node(value, queue[index]);
  }

  removeAt(index) {
    let queue = this.#queue();
    if (!queue[index]) throw new Error("there is no node in target index");
    queue[index - 1].next = queue[index + 1];
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}
