let Plus = {};

// Queue Prototype

Plus.Queue = class {
  constructor(ds, value) {
    if (ds === 'linkedlist') {
      this.data = new Plus.LinkedList(value);
      this.ll = true;
    } else {
      this.data = [];  
    }
  }

  enqueue(...newData) {
    if (this.ll) {
      return this.data.insert.apply(this.data, newData);
    } else {
      newData.forEach((element) => this.data.push(element));
    }
    
    return 1;
  }

  dequeue() {
    if (this.ll) {
      return this.data.removeByIndex(0);
    } else {
      if (this.data.length > 0) {
        return this.data.shift();
      } else {
        return 0;
      }
    }
  }

  front() {
    return this.ll ? this.data.head : this.data[0];
  }

  rear() {
    return this.ll ? this.data.tail() : this.data[this.data.length - 1];
  }
};

// Stack Prototype

Plus.Stack = class {
  constructor(ds, value) {
    if (ds === 'linkedlist') {
      this.data = new Plus.LinkedList(value);
      this.ll = true;
    } else {
      this.data = [];  
    }
  }

  push(...newData) {
    if (this.ll) {
      this.data.insert.apply(this.data, newData);
    } else {
      newData.forEach((e) => this.data.push(e));
    }

    return 1;
  }

  pop(newData) {
    if (this.ll) {
      return this.data.removeByTail();
    } else {
      return this.data.pop();
    }
  }

  peek() {
    if (this.ll) {
      return this.data.tail();
    } else {
      return this.data[this.data.length - 1];
    }
  }

  isEmpty() {
    if (this.ll) {
      return this.data.head === null;
    } else {
      return this.data.length > 0 ? false : true;
    } 
  }
};

// Linked List Prototype

Plus.LinkedList = class {
  constructor(value) {
    let headNode = {
      val: value,
      next: null
    };

    this.head = headNode;
  }

  assignHeadValue(value) {
    this.head.val = value;
    return 1;
  }

  removeByTail() {
    let headNode = this.head;
    let deletedValue;

    if (headNode.next === null) {
      this.head = null;
      return this.head;
    }

    while (headNode.next !== null) {
      if (headNode.next.next === null) {
        break;
      }

      headNode = headNode.next;
    }

    deletedValue = headNode.next.val;
    headNode.next = null;
    return deletedValue;    
  }

  insert(...newData) {
    let nodes = newData.map(function(data) {
      return {
        val: data,
        next: null
      };
    });

    let tail = this.tail();
    let currentNode;

    while (nodes.length > 0) {
      tail.next = nodes[0]; // forms link between data and tail
      tail = tail.next;     // next iteration, tail is the last added element
      nodes.shift();        // removes recently added data front front of queue
    }

    return 1;
  }

  insertAtIndex(index, ...newData) {
    if (index === undefined || typeof index !== 'number' || index < 0) {
      return 0;
    }

    let nodes = newData.map(function(data) {
      return {
        val: data,
        next: null
      };
    });

    let tail = this.getNodeAtIndex(index);

    if (tail === 0) {
      return 0;
    }

    let nextNode = tail.next;
    let currentNode;

    while (nodes.length > 0) {
      tail.next = nodes[0]; // forms link between data and tail
      tail = tail.next;     // next iteration, tail is the last added element
      nodes.shift();        // removes recently added data front front of queue
    }

    tail.next = nextNode;
    return 1;
  }

  removeByValue(value) {
    if (!value) { return 0; }

    let headNode = this.head;

    if (headNode.val === value) {
      if (this.head.next === null) {
        return 0;
      }

      this.head = this.head.next;
      return 1;
    }

    while (headNode.next !== null) {
      if (headNode.next.val === value) {
        headNode.next = headNode.next.next;
        return 1;
      }

      headNode = headNode.next;
    }

    return 0;
  }

  removeByIndex(index) {
    if (index === undefined || typeof index !== 'number') { return 0; }

    if (index === 0) {
      if (this.head.next === null) {
        this.head = null;
      } else {
        this.head = this.head.next;
      }

      return 1;
    }

    let headNode = this.head;
    let i = 0;
 
    while (headNode.next !== null) {
      if (i === index - 1) {
        if (headNode.next.next === null) {
          headNode.next = null;
        } else {
          headNode.next = headNode.next.next;
        }
        
        return 1;
      }

      headNode = headNode.next;
      i += 1;
    }
  }

  getNodeAtIndex(index) {
    if (typeof index !== 'number' || index < 0) { return 0; }

    let headNode = this.head;

    for (let i = 0; i < index; i += 1) {
      if (headNode.next === null) {
        return 0;
      } else {
        headNode = headNode.next;
      }
    }

    return headNode;
  }

  getNodeIndexByValue(value) {
    if (value === undefined) {
      return 0;
    }

    if (this.head.val === value) {
      return this.head;
    }

    let headNode = this.head;
    let i = 0;

    while (headNode !== null) {
      if (headNode.val === value) {
        return {
          node: headNode,
          index: i
        };
      }

      headNode = headNode.next;
      i += 1;
    }

    return 0;
  }

  getMiddleNode() {
    let headNode = this.head;
    let nodes = [];

    while (headNode !== null) {
      nodes.push(headNode);
      headNode = headNode.next
    }

    return nodes[Math.ceil((nodes.length - 1) / 2)];
  }

  length() {
    let i = 1;
    let headNode = this.head;

    while (headNode.next !== null) {
      i += 1;
      headNode = headNode.next;
    }

    return i;
  }

  tail() {
    let headNode = this.head;

    if (headNode.next === null) {
      return headNode;
    }

    while (headNode.next !== null) {
      headNode = headNode.next;
    }

    return headNode;
  }

  updateValueAtIndex(index, value) {
    if (index === undefined || typeof index !== 'number' || index < 0) {
      return 0;
    }

    let node = this.getNodeAtIndex(index);

    if (node === 0) { return 0; }

    node.val = value;
    return 1;
  }

  reverse() {
    let prev = null;
    let next = null;
    let headNode = this.head;

    while (headNode !== null) {
      next = headNode.next;
      headNode.next = prev;
      prev = headNode;
      headNode = next;
    }

    this.head = prev;
    return 1;
  }

  countMultiple(...values) {
    let counts = {};
    let headNode = this.head;

    values.forEach((property) => counts[property] = 0);

    while (headNode !== null) {
      if (values.indexOf(headNode.val) !== -1) {
        counts[headNode.val] += 1;
      }

      headNode = headNode.next;
    }

    return counts;
  }

  count(value) {
    let count = 0;
    let headNode = this.head;

    while (headNode !== null) {
      if (headNode.val === value) {
        count += 1;
      }

      headNode = headNode.next;
    }

    return count;
  }
};

// Tree Prototype

Plus.BinaryTree = class {
  constructor(array) {
    const insertLevelOrder = (array, root, index) => {
      if (index < array.length) {
        let temp = new Plus.TreeNode(array[index]);
        root = temp;

        root.left = insertLevelOrder(array, root.left, 2 * index + 1);
        root.right = insertLevelOrder(array, root.right, 2 * index + 2);
      }

      return root;
    };

    this.root = insertLevelOrder(array, new Plus.TreeNode(), 0);
  }

  findMaxDepth() {
    if (!this.root.val) {
      return 0;
    } else if (this.root.left === undefined && this.root.right === undefined) {
      return 1;
    }

    let queue = new Plus.Queue();
    queue.enqueue([this.root.left, this.root.right]);

    let newNodes;
    let oldNodes;
    let i = 1;

    while (queue.data.length > 0) {
      oldNodes = queue.dequeue();
      newNodes = [];

      oldNodes.forEach(function(node) {
        if (node.left !== undefined) {
          newNodes.push(node.left);
        }

        if (node.right !== undefined) {
          newNodes.push(node.right);
        }
      });

      if (newNodes.length > 0) {
        queue.enqueue(newNodes);
      }

      i += 1;
    }

    return i;    
  }

  getValuesPreorderTraversal() {
    const traverse = (node) => {
      if (node === undefined || node.val === undefined) {
        return;
      }

      data.push(node.val);

      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }
    };

    let data = [];
    traverse(this.root);
    return data;
  }

  getValuesPostorderTraversal() {
    const traverse = (node) => {
      if (node === undefined || node.val === undefined) {
        return;
      }

      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }

      data.push(node.val);
    };

    let data = [];
    traverse(this.root);
    return data;
  }

  getValuesInorderTraversal() {
    const traverse = (node) => {
      if (node === undefined || node.val === undefined) {
        return;
      }

      if (node.left) {
        traverse(node.left);
      }

      data.push(node.val);

      if (node.right) {
        traverse(node.right);
      }
    };

    let data = [];
    traverse(this.root);
    return data;
  }

  manipulatePostorder(func) {
    const isFunction = (functionToCheck) => {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };

    const traverse = (node) => {
      if (node === undefined || node.val === undefined) {
        return;
      }

      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }

      func(node);
    };

    if (!isFunction(func)) {
      return 0;
    }

    traverse(this.root);
    return this;
  }

  manipulatePreorder(func) {
    const isFunction = (functionToCheck) => {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };

    const traverse = (node) => {
      if (node === undefined || node.val === undefined) {
        return;
      }
      
      func(node);

      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }
    };

    if (!isFunction(func)) {
      return 0;
    }

    traverse(this.root);
    return this;
  }

  manipulateInorder(func) {
    const isFunction = (functionToCheck) => {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };

    const traverse = (node) => {
      if (node === undefined || node.val === undefined) {
        return;
      }
      
      if (node.left) {
        traverse(node.left);
      }

      func(node);

      if (node.right) {
        traverse(node.right);
      }
    };

    if (!isFunction(func)) {
      return 0;
    }

    traverse(this.root);
    return this;
  }

  insert(value) {
    if (!this.root.val) {
      this.root.val = value;
      return this;
    } else if (!this.root.left) {
      this.root.left = new Plus.TreeNode(value);
      return this;
    }

    let queue = new Plus.Queue();
    let valueQueue = new Plus.Queue();
    let oldNodes;
    let newNodes;
    let node;

    queue.enqueue([this.root.left, this.root.right]);
    valueQueue.enqueue(value);

    while (valueQueue.data.length > 0) {
      oldNodes = queue.dequeue();
      newNodes = [];

      for (let i = 0; i < oldNodes.length; i += 1) {
        node = oldNodes[i];

        if (!node.val) {
          node.val = valueQueue.dequeue();
          return this;
        } 

        newNodes.push(node.left);
        newNodes.push(node.right);
      }

      queue.enqueue(newNodes);
    }
  }
};

// Node Prototype

Plus.TreeNode = class {
  constructor(val, left, right) {
    this.val = val;
    this.left = undefined;
    this.right = undefined;
  }
};

// BST Prototype

// Heap Prototype

// Graph Prototype

module.exports = Plus;