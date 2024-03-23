const LinkedList = require("./LinkedList/linkedList");

class HashMap {
  #buckets;
  constructor(size) {
    this.#buckets = Array(size).fill(null);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    const size = this.#buckets.length;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  }
  set(key, value) {
    let code = this.hash(key);
    let head = this.#buckets[code];
    if (this.#buckets[code] === null) {
      this.#buckets[code] = new LinkedList();
      this.#buckets[code].append(key, value);
      return "empty";
    }
    if (head.contains(key)) {
      let index = head.indexOf(key);
      head.at(index).value = value;
      return "overwrite";
    }
    head.append(key, value);
    return "collision";
  }

  get(key) {
    let code = this.hash(key);
    let head = this.#buckets[code];
    if (head === null) return null;
    let index = head.indexOf(key);
    if (index !== null) {
      return head.at(index).value;
    }
    return null;
  }
  has(key) {
    let code = this.hash(key);
    let head = this.#buckets[code];
    if (head === null) return false;
    if (head.contains(key)) return true;
    return false;
  }

  remove(key) {
    let code = this.hash(key);
    let head = this.#buckets[code];
    if (head === null) return false;
    let index = head.indexOf(key);
    if (index !== null) {
      head.removeAt(index);
      return true;
    }
    return false;
  }

  length() {
    return this.#buckets.reduce((prev, curr) => {
      if (curr !== null) {
        return prev + curr.size;
      }
      return prev;
    }, 0);
  }

  clear() {
    this.#buckets = this.#buckets.map(() => {
      return null;
    });
  }

  #toArray() {
    return this.#buckets.reduce((prev, curr) => {
      if (curr === null) return prev;
      return prev.concat(curr.toArray());
    }, []);
  }

  keys() {
    let arr = this.#toArray();
    return arr.map((el) => {
      return el.key;
    });
  }

  values() {
    let arr = this.#toArray();
    return arr.map((el) => {
      return el.value;
    });
  }
  entries() {
    let arr = this.#toArray();
    return arr.map((el) => {
      return [el.key, el.value];
    });
  }
}
