import mergeSort from "./mergeSort.mjs";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(new Set(array));
  }

  insert(value) {
    if (this.find(value)) {
      return;
    }
    let node = this.root;
    let direction;
    while (true) {
      direction = "left";
      if (value > node.data) {
        direction = "right";
      }
      if (!node[direction]) {
        node[direction] = new Node(value);
        return;
      }
      node = node[direction];
    }
  }

  delete(value) {
    let root = this.root;
    let prevRoot;
    let direction;
    while (root) {
      if (value === root.data) break;
      if (value > root.data) {
        direction = "right";
        prevRoot = root;
        root = root.right;
        continue;
      }
      direction = "left";
      prevRoot = root;
      root = root.left;
    }
    if (root === null) {
      console.error("the value doesnt exist");
      return;
    }
    if (!root.left && !root.right) {
      prevRoot[direction] = null;
      return;
    }
    if (root.left && root.right) {
      let minRoot = root.right;
      let prevMinRoot;
      while (minRoot.left) {
        prevMinRoot = minRoot;
        minRoot = minRoot.left;
      }
      root.data = minRoot.data;
      if (!prevMinRoot) {
        root.right = minRoot.right;
      }
      if (prevMinRoot) {
        prevMinRoot.left = null;
      }
      return;
    }
    if (root.left) {
      prevRoot[direction] = root.left;
      return;
    }
    prevRoot[direction] = root.right;
    return;
  }

  find(value) {
    let node = this.root;
    while (node) {
      if (value === node.data) break;
      if (value > node.data) {
        node = node.right;
        continue;
      }
      node = node.left;
    }
    return node;
  }

  levelOrder(callback) {
    let queue = [];
    let arr = [];
    queue.push(this.root);
    while (queue.length) {
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      if (callback) {
        callback(queue[0].data);
      } else {
        arr.push(queue[0].data);
      }
      queue.shift();
    }
    return arr.length ? arr : undefined;
  }

  levelOrderRec(cb, queue = [this.root]) {
    if (!queue.length) {
      return [];
    }
    let arr = [];
    if (queue[0].left) queue.push(queue[0].left);
    if (queue[0].right) queue.push(queue[0].right);
    if (cb) {
      cb(queue[0].data);
    } else {
      arr.push(queue[0].data);
    }
    queue.shift();
    arr = arr.concat(this.levelOrderRec(cb, queue));
    return arr.length ? arr : undefined;
  }

  inOrder(cb, node = this.root) {
    if (!node) {
      return [];
    }
    if (cb) {
      cb(node.data);
    }
    let arr = [];
    arr = arr.concat(
      this.inOrder(cb, node.left),
      node.data,
      this.inOrder(cb, node.right),
    );

    return !cb ? arr : undefined;
  }

  preOrder(cb, node = this.root) {
    if (!node) return [];
    if (cb) {
      cb(node.data);
    }
    return [].concat(
      node.data,
      this.preOrder(cb, node.left),
      this.preOrder(cb, node.right),
    );
  }

  postOrder(cb, node = this.root) {
    if (!node) return [];
    if (cb) {
      cb(node.data);
    }
    return [].concat(
      this.postOrder(cb, node.left),
      this.postOrder(cb, node.right),
      node.data,
    );
  }

  height(node) {
    if (!node) {
      return -1;
    }
    let r = 0 + this.height(node.right);
    let l = 0 + this.height(node.left);
    return r > l ? 1 + r : 1 + l;
  }

  depth(node) {
    if (!node) return -1;
    let root = this.root;
    let depth = 0;
    while (root.data != node.data) {
      if (node.data > root.data) {
        root = root.right;
      } else {
        root = root.left;
      }
      depth++;
    }
    return depth;
  }

  isBalance() {
    let left = this.height(this.root.left);
    let right = this.height(this.root.right);
    if (left - right < 2 && left - right > -2) {
      return true;
    }
    return false;
  }

  rebalance() {
    let inOrderArr = this.inOrder();
    this.root = buildTree(inOrderArr, 0, inOrderArr.length - 1);
  }
}

function buildTree(set) {
  let arr = Array.from(set);
  let array = mergeSort(arr);
  return merging(array, 0, array.length - 1);
}

function merging(arr, start, end) {
  if (start > end) return null;
  let mid = Math.ceil((start + end) / 2);
  let root = new Node(arr[mid]);
  root.left = merging(arr, start, mid - 1);
  root.right = merging(arr, mid + 1, end);
  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randArray(max) {
  let myset = new Set();
  while (myset.size < max) {
    myset.add(Math.floor(Math.random() * 100));
  }
  return Array.from(myset);
}
function script() {
  let arr = randArray(99);
  let tree = new Tree(arr);
  if (tree.isBalance === false) {
    console.log("error");
    return;
  }
  console.log("tree is balance");
  console.log(tree.levelOrder());
  for (let i = 0; i < 50; i++) {
    tree.insert(Math.floor(Math.random() * 1000));
  }
  if (tree.isBalance() === false) {
    console.log("tree is unbalance");
  }
  tree.rebalance();
  if (tree.isBalance()) {
    console.log("tree is balance again");
  }
  console.log(tree.levelOrder());
}

let tree = new Tree(randArray(19));
prettyPrint(tree.root);
console.log(tree.inOrder());
