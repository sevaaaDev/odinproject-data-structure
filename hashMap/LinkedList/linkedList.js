class LinkedList {
  #list;
  constructor(head = null) {
    this.#list = head;
  }

  #queue() {
    let queue = [];
    if (!this.#list) return queue;
    queue.push(this.#list);
    while (queue[queue.length - 1].next) {
      queue.push(queue[queue.length - 1].next);
    }
    return queue;
  }

  prepend(key, value) {
    this.#list = new Node(key, value, this.#list);
  }

  append(key, value) {
    if (!this.#list) {
      this.prepend(key, value);
      return;
    }
    let queue = this.#queue();
    queue[queue.length - 1].next = new Node(key, value);
  }

  get size() {
    let queue = this.#queue();
    return queue.length;
  }

  get head() {
    return this.#list;
  }

  get tail() {
    let queue = this.#queue();
    return queue[queue.length - 1] || null;
  }

  at(index) {
    let queue = this.#queue();
    return queue[index] ? queue[index] : null;
  }

  pop() {
    let queue = this.#queue();
    queue[queue.length - 2].next = null;
    return queue[queue.length - 1];
  }

  contains(key) {
    let queue = this.#queue();
    for (let node of queue) {
      if (node.key === key) {
        return true;
      }
    }
    return false;
  }

  indexOf(key) {
    let queue = this.#queue();
    for (let index in queue) {
      if (queue[index].key === key) {
        return +index;
      }
    }
    return null;
  }

  get toString() {
    let queue = this.#queue();
    let formatted = [];
    for (let node of queue) {
      formatted.push(`( ${node.key}, ${node.value} )`);
    }
    formatted.push("null");
    return formatted.join(" -> ");
  }

  toArray() {
    return this.#queue();
  }

  insertAt(key, value, index) {
    let queue = this.#queue();
    if (!queue[index - 1]) {
      throw new Error("the target index is over the list length");
    }
    queue[index - 1].next = new Node(key, value, queue[index]);
  }

  removeAt(index) {
    let queue = this.#queue();
    if (!queue[index]) throw new Error("there is no node in target index");
    if (index === 0) {
      this.#list = this.#list.next;
      return;
    }
    queue[index - 1].next = queue[index + 1] ? queue[index + 1] : null;
  }
}

class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

module.exports = LinkedList;
