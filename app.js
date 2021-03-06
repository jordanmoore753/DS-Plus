/*jshint esversion: 6 */

const Util = require('./utility-methods.js');

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
        return null;
      }
    }
  }

  front() {
    return this.ll ? this.data.head : this.data[0];
  }

  rear() {
    return this.ll ? this.data.tail() : this.data[this.data.length - 1];
  }

  search(value) {
    if (value === undefined) {
      return null;
    }

    let self = this;

    if (this.ll) {
      return this.data.getNodeIndexByValue(value);
    } else {
      for (let i = 0; i < self.data.length; i += 1) {
        if (self.data[i] === value) {
          return { val: value, index: i };
        }
      }

      return null;
    }
  }

  length() {
    if (this.ll) {
      return this.data.length();
    } else {
      return this.data.length;
    }
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

  pop() {
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
      return this.data.head.val === null;
    } else {
      return this.data.length > 0 ? false : true;
    } 
  }

  search(value) {
    if (value === undefined) {
      return null;
    }

    let self = this;

    if (this.ll) {
      return this.data.getNodeIndexByValue(value);
    } else {
      for (let i = 0; i < self.data.length; i += 1) {
        if (self.data[i] === value) {
          return { val: value, index: i };
        }
      }

      return null;
    }
  }

  length() {
    if (this.ll) {
      return this.data.length();
    } else {
      return this.data.length;
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
    this.size = 1;
  }

  assignHeadValue(value = null) {
    this.head.val = value;
    return 1;
  }

  removeByTail() {
    let headNode = this.head;
    let deletedValue;

    if (headNode.next === null) {
      this.head = {
        val: null,
        next: null
      };

      return headNode;
    }

    while (headNode.next !== null) {
      if (headNode.next.next === null) {
        break;
      }

      headNode = headNode.next;
    }

    deletedValue = headNode.next.val;
    headNode.next = null;
    this.size -= 1;
    return deletedValue;    
  }

  insert(...newData) {
    if (newData.length === 0) {
      return null;
    }

    let nodes = newData.map(function(data) {
      return {
        val: data,
        next: null
      };
    });

    let tail = this.tail();

    while (nodes.length > 0) {
      if (this.head.val === null) {
        this.head = nodes[0];
        nodes.shift();
        this.size += 1;
        tail = this.head;
        continue;
      } else {
        tail.next = nodes[0]; // forms link between data and tail
      }

      this.size += 1;
      tail = tail.next;
      nodes.shift();
    }

    return this;
  }

  insertAtIndex(index, ...newData) {
    if (index === undefined || typeof index !== 'number' || index < 0 || newData.length === 0) {
      return null;
    }

    let nodes = newData.map(function(data) {
      return {
        val: data,
        next: null
      };
    });

    let tail = this.getNodeAtIndex(index);

    if (tail === null) {
      return this;
    }

    let nextNode = tail.next;

    while (nodes.length > 0) {
      this.size += 1;
      tail.next = nodes[0]; // forms link between data and tail
      tail = tail.next;     // next iteration, tail is the last added element
      nodes.shift();        // removes recently added data front front of queue
    }

    tail.next = nextNode;
    return this; 
  }

  toArray() {
    let values = [];

    let headNode = this.head;

    if (headNode.val === undefined) {
      return values;
    }

    while (headNode !== null) {
      values.push(headNode.val);
      headNode = headNode.next;
    }

    return values;
  }

  removeByValue(value) {
    if (!value) { return null; }

    let headNode = this.head;

    if (headNode.val === value) {
      if (this.head.next === null) {
        this.size -= 1;
        this.head = {
          val: null,
          next: null
        };

        return value;
      }

      this.head = this.head.next;
      this.size -= 1;
      return value;
    }

    while (headNode.next !== null) {
      if (headNode.next.val === value) {
        this.size -= 1;
        headNode.next = headNode.next.next;
        return value;
      }

      headNode = headNode.next;
    }

    return null;
  }

  removeByIndex(index) {
    if (index === undefined || typeof index !== 'number' || index < 0) { return null; }

    let val;

    if (index === 0) {
      val = this.head.val;

      if (this.head.next === null) {
        this.head = {
          val: null,
          next: null
        };
      } else {
        this.head = this.head.next;
      }

      this.size -= 1;
      return val;
    }

    let headNode = this.head;
    let i = 0;
 
    while (headNode.next !== null) {
      if (i === index - 1) {
        val = this.head.next.val;

        if (headNode.next.next === null) {
          headNode.next = null;
        } else {
          headNode.next = headNode.next.next;
        }
        
        this.size -= 1;
        return val;
      }

      headNode = headNode.next;
      i += 1;
    }
  }

  getNodeAtIndex(index) {
    if (typeof index !== 'number' || index < 0) { return null; }

    let headNode = this.head;

    for (let i = 0; i < index; i += 1) {
      if (headNode.next === null) {
        return null;
      } else {
        headNode = headNode.next;
      }
    }

    return headNode;
  }

  getNodeIndexByValue(value) {
    if (value === undefined) {
      return null;
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
          index: i - 1
        };
      }

      headNode = headNode.next;
      i += 1;
    }

    return null;
  }

  getMiddleNode() {
    let headNode = this.head;
    let nodes = [];

    while (headNode !== null) {
      nodes.push(headNode);
      headNode = headNode.next;
    }

    return nodes[Math.ceil((nodes.length - 1) / 2)];
  }

  length() { // refactor to be O(1)
    this.adjustSize();
    return this.size;
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
      return null;
    }

    let node = this.getNodeAtIndex(index);

    if (node === null) { return null; }

    node.val = value;
    return this;
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
    return this;
  }

  countMultiple(...values) {
    let counts = {};
    let headNode = this.head;

    values.forEach(function(property) {
      if (typeof property === 'number' || typeof property === 'string') {
        counts[property] = 0;
      } 
    });

    while (headNode !== null) {
      if (values.indexOf(headNode.val) !== -1) {
        counts[headNode.val] += 1;
      }

      headNode = headNode.next;
    }

    return counts;
  }

  count(value = null) {
    if (value === undefined || value === null) {
      return null;
    }

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

  clear() {
    this.head = {
      val: undefined,
      next: null
    };

    this.size = 1;
    return this;
  }

  contains(value) {
    let headNode = this.head;

    while (headNode !== null) {
      if (headNode.val === value) {
        return true;
      }

      headNode = headNode.next;
    }

    return false;
  }

  adjustSize() {
    if (this.size <= 0) {
      this.size = 1;
    }

    return;
  }
};

// Tree Prototype

Plus.BinaryTree = class {
  constructor(array) {
    const insertLevelOrder = (array = [1], root, index) => {
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

  findHeight(node) {
    if (!node || !node instanceof Plus.TreeNode) {
      throw 'Parameter is not a node.';
    }

    let queue = new Plus.Queue();
    queue.enqueue([node]);

    let newNodes;
    let oldNodes;
    let currentNode;
    let i = -1;

    while (queue.data[0].length > 0) {
      oldNodes = queue.dequeue();
      newNodes = [];

      for (let i = 0; i < oldNodes.length; i += 1) {
        currentNode = oldNodes[i];

        if (currentNode.left && currentNode.left.val) {
          newNodes.push(currentNode.left);  
        }
        
        if (currentNode.right && currentNode.right.val) {
          newNodes.push(currentNode.right);
        }
      }

      queue.enqueue(newNodes);
      i += 1;
    }

    return i;
  }

  findMaxDepth() {
    if (!this.root.val) {
      return 0;
    } else if (!this.root.left && !this.root.right) {
      return 1;
    }

    let queue = new Plus.Queue();
    queue.enqueue([this.root]);

    let newNodes;
    let oldNodes;
    let currentNode;
    let i = 0;

    while (queue.data[0].length > 0) {
      oldNodes = queue.dequeue();
      newNodes = [];

      for (let i = 0; i < oldNodes.length; i += 1) {
        currentNode = oldNodes[i];

        if (currentNode.left && currentNode.left.val) {
          newNodes.push(currentNode.left);  
        }
        
        if (currentNode.right && currentNode.right.val) {
          newNodes.push(currentNode.right);
        }
      }

      queue.enqueue(newNodes);
      i += 1;
    }

    return i;    
  }

  getValuesTraversal(type = 'post') {
    const acceptable = ['post', 'pre', 'in'];
    const traverse = (node) => {
      if (node === undefined || node.val === null) {
        return;
      }

      if (type === 'pre') { data.push(node.val); }

      if (node.left) {
        traverse(node.left);
      }

      if (type === 'in') { data.push(node.val); }

      if (node.right) {
        traverse(node.right);
      }

      if (type === 'post') { data.push(node.val); }
    };

    if (!acceptable.includes(type)) { return 0; }

    let data = [];
    traverse(this.root);
    return data;
  }

  manipulateTraversal(func, type = 'post') {
    const acceptable = ['post', 'pre', 'in'];
    const traverse = (node) => {
      if (node === undefined || node.val === null) {
        return;
      }

      if (type === 'pre') { func(node); }

      if (node.left) {
        traverse(node.left);
      }

      if (type === 'in') { func(node); }

      if (node.right) {
        traverse(node.right);
      }

      if (type === 'post') { func(node); }
    };

    const isFunction = (functionToCheck) => {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };

    if (!isFunction(func) || !acceptable.includes(type)) {
      return 0;
    }

    traverse(this.root);
    return this;
  }

  getNode(value) {
    if (!this.root.val) {
      return null;
    }

    let queue = new Plus.Queue();
    let oldNodes;
    let newNodes;
    let node;

    queue.enqueue([this.root]);

    while (queue.data[0].length > 0) {
      oldNodes = queue.dequeue();
      newNodes = [];

      for (let i = 0; i < oldNodes.length; i += 1) {
        node = oldNodes[i];

        if (!node) {
          continue;
        }

        if (node.val === value) { 
          return node;
        }

        newNodes.push(node.left);
        newNodes.push(node.right);
      }

      queue.enqueue(newNodes);
    }

    return null;
  }

  insert(value) {
    if (!this.root.val) {
      this.root.val = value;
      return this;
    } else if (!this.root.left || this.root.left.val === null) {
      this.root.left = new Plus.TreeNode(value);
      return this;
    } else if (!this.root.right || this.root.right.val === null) {
      this.root.right = new Plus.TreeNode(value);
      return this;
    }

    let queue = new Plus.Queue();
    let valueQueue = new Plus.Queue();
    let oldNodes;
    let newNodes;
    let node;

    queue.enqueue([this.root]);
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

        if (!node.left) {
          node.left = new Plus.TreeNode(valueQueue.dequeue());
          return this;
        }

        if (!node.right) {
          node.right = new Plus.TreeNode(valueQueue.dequeue());
          return this;
        }

        newNodes.push(node.left);
        newNodes.push(node.right);
      }

      queue.enqueue(newNodes);
    }
  }

  remove(value) {
    return this.removeHelper(value, this.root);
  }

  removeHelper(value, root) {
    if (root.left && root.left.val === value) {
      root.left = null;
      return this;
    }

    if (root.right && root.right.val === value) {
      root.right = null;
      return this;
    }

    if (root.left) {
      this.removeHelper(value, root.left); 
    }

    if (root.right) {
      this.removeHelper(value, root.right); 
    }

    return this;
  }
};

// Node Prototype

Plus.TreeNode = class {
  constructor(val = null, left, right) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 0;
  }

  leftHeight() {
    if (!this.left) {
      return -1;
    }

    return this.left.height;
  }

  rightHeight() {
    if (!this.right) {
      return -1;
    }

    return this.right.height;
  }

  rotateRight() {
    let temp = this.left;
    this.left = temp.right;
    temp.right = this; 

    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    temp.height = Math.max(this.leftHeight(), this.height) + 1;
    return temp;
  }

  rotateLeft() {
    let temp = this.right;
    this.right = temp.left;
    temp.left = this; 

    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    temp.height = Math.max(this.rightHeight(), this.height) + 1;
    return temp;
  }
};

// BST Prototype

Plus.BST = class {
  constructor(dataType, options) {
    const acceptableTypes = ['string', 'date', 'number', 'object'];
    const acceptableOptionsObject = ['key', 'keyType', 'compareFunction'];
    const acceptableOptionsNonObject = ['compareFunction'];

    const isFunction = (functionToCheck) => { return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'; };
    const isCorrectType = (dataType) => { 
      if (!dataType) {
        throw 'Data type must be defined as either string, number, date, or object.';
      }

      if (acceptableTypes.indexOf(dataType) === -1) {
        throw 'Data type was defined, but was not a correct value: string, date, number, or object.';
      }

      return true;
    };
    const hasCorrectProperties = (dataType, options) => {
      const nonObjects = ['string', 'date', 'number'];
      const isNonObject = (dataType) => { return nonObjects.indexOf(dataType) !== -1; };
      const hasNonObjectProperties = (options) => {
        if (!options) {
          return true;
        }

        let keys = Object.keys(options);

        for (let i = 0; i < keys.length; i += 1) {
          if (acceptableOptionsNonObject.indexOf(keys[i]) === -1) {
            throw `${keys[i]} is an unacceptable property for the options object and the specified data type.`;
          }
        }

        if (options.compareFunction && !isFunction(options.compareFunction)) {
          throw `object[compareFunction] is not a valid function.`;
        }

        return true;
      };

      const hasObjectProperties = (options) => {
        const validKeyTypes = ['string', 'number', 'date'];

        if (!options) {
          throw 'Options object is not defined, must be present for object data type.';
        }

        let keys = Object.keys(options);

        for (let i = 0; i < keys.length; i += 1) {
          if (acceptableOptionsObject.indexOf(keys[i]) === -1) {
            throw `${keys[i]} is an unacceptable property for the options object and the specified data type.`;
          }
        }

        if (!options.compareFunction || !isFunction(options.compareFunction)) {
          throw `object[compareFunction] is not a valid function or is not present.`;
        }

        if (!options.key || typeof options.key !== 'string') {
          throw `'key' property must be a string value and be present for object data type.`;
        }

        if (!options.keyType || validKeyTypes.indexOf(options.keyType) === -1) {
          throw `'keyType' property must be present and of 'string', 'number', or 'date' value for object data.`;
        }

        return true;
      };

      return isNonObject(dataType) ? hasNonObjectProperties(options) : hasObjectProperties(options);
    };

    isCorrectType(dataType);
    hasCorrectProperties(dataType, options);

    if (!options) {
      options = {};
    }

    this.type = dataType;
    this.compareFunction = options.compareFunction || Util.defaultComparison;
    this.key = options.key;
    this.keyType = options.keyType;
    this.duplicates = {};
    this.root = null;
    this.size = 0;
  }

  insert(values) {
    let queue = new Plus.Queue();

    if (values === undefined) {
      return;
    } else if (Array.isArray(values)) {
      values.forEach((val) => queue.enqueue(val));
    } else {
      queue.enqueue(values);
    }

    let currentValue;

    while (queue.data.length > 0) {
      currentValue = queue.dequeue();

      if (this.validData(currentValue) && !this.duplicates[JSON.stringify(currentValue)]) {
        this.root = this.insertHelper(currentValue, this.root);
        this.size += 1;
      }
    }

    return this;
  }

  insertHelper(value, root) {
    if (root === null) {
      this.duplicates[JSON.stringify(value)] = true;
      return new Plus.TreeNode(value);
    }

    if (this.compareFunction(value, root.val)) {
      root.left = this.insertHelper(value, root.left);
    } else {
      root.right = this.insertHelper(value, root.right);
    }

    root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
    let balance = this.getBF(root);

    if (balance === 5) {
      if (this.compareFunction(value, root.left.val)) {
        root = root.rotateRight();
      } else {
        root.left = root.left.rotateLeft();
        return root.rotateRight();
      }
    } else if (balance === 1) {
      if (this.compareFunction(value, root.right.val)) {
        root.right = root.right.rotateRight();
        return root.rotateLeft();
      } else {
        root = root.rotateLeft();
      }
    }

    return root;
  }

  remove(values) {
    let queue = new Plus.Queue();

    if (values === undefined) {
      return;
    } else if (Array.isArray(values)) {
      values.forEach((val) => queue.enqueue(val));
    } else {
      queue.enqueue(values);
    }

    let currentValue;

    while (queue.data.length > 0) {
      currentValue = queue.dequeue();

      if (this.validData(currentValue)) {
        this.root = this.removeHelper(currentValue, this.root);
      }
    }

    return this;
  }

  removeHelper(value, root) {
    if (root === null) {
      return root;
    }

    if (Util.defaultEqual(value, root.val, this.type)) {
      let successor;

      if (root.left === null && root.right === null) {
        root = null;
      } else if (root.left && root.right === null) {
        root = root.left;
      } else if (root.left === null && root.right) {
        root = root.right;
      } else {
        successor = this.maxValue(root.left);
        root.val = successor.val;
        root.left = this.removeHelper(successor.val, root.left);
      }

      if (this.type === 'object') {
        this.duplicates[JSON.stringify(value)] = false;
      } else {
        this.duplicates[value] = false;        
      }

      this.size -= 1;
    } else if (this.compareFunction(value, root.val)) {
      root.left = this.removeHelper(value, root.left);
    } else {
      root.right = this.removeHelper(value, root.right);
    }

    if (root === null) {
      return root;
    }

    root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
    let balance = this.getBF(root);

    if (balance === 5) {
      if (this.getBF(root.left) === 3 || this.getBF(root.left) === 4) {
        root = root.rotateRight();
      }

      if (this.getBF(root.left) === 2) {
        root.left = root.left.rotateLeft();
        return root.rotateRight();
      }
    } 

    if (balance === 1) {
      if (this.getBF(root.right) === 3 || this.getBF(root.right) === 2) {
        root = root.rotateLeft();
      }

      if (this.getBF(root.right) === 4) {
        root.right = root.right.rotateRight();
        return root.rotateLeft();
      }
    }   

    return root; 
  }

  getBF(node) {
    const diff = node.leftHeight() - node.rightHeight();

    switch (diff) {
      case -2:
        return 1;
      case -1:
        return 2;
      case 1:
        return 4;
      case 2:
        return 5;
      default:
        return 3;
    }
  }

  maxValue(root = this.root) {
    let current = root;

    while (current.right) {
      current = current.right;
    }

    return current;
  }

  minValue(root = this.root) {
    let current = root;

    while (current.left) {
      current = current.left;
    }

    return current;
  }

  search(value, root = this.root) {
    if (!value) {
      return null;
    }

    if (root === null || Util.defaultEqual(value, root.val, this.type)) {
      return root;
    }

    if (this.compareFunction(value, root.val)) {
      return this.search(value, root.left);
    } else {
      return this.search(value, root.right);
    }
  }

  length() {
    return this.size;
  }

  contains(value) {
    if (this.type === 'object') {
      return this.duplicates[JSON.stringify(value)] === undefined ? false : true;
    }

    return this.duplicates[value] === undefined ? false : true;
  }

  validData(value) {
    switch (this.type) {
      case 'string':
        return Util.isString(value);
      case 'date':
        return Util.isDate(value);
      case 'number':
        return Util.isNumber(value);
      default:
        return Util.isObject.call(this, value);
    }
  }

  getValuesTraversal(type = 'post') {
    const acceptable = ['post', 'pre', 'in'];
    const traverse = (node) => {
      if (node === null) {
        return;
      }

      if (type === 'pre') { data.push(node.val); }

      if (node.left) {
        traverse(node.left);
      }

      if (type === 'in') { data.push(node.val); }

      if (node.right) {
        traverse(node.right);
      }

      if (type === 'post') { data.push(node.val); }
    };

    if (!acceptable.includes(type)) { return 0; }

    let data = [];
    traverse(this.root);
    return data;
  }

  isEmpty() {
    return this.root === null;
  }
};

// Graph Prototype

Plus.Graph = class {
  constructor(dataType, direction) {
    const validDataType = function(type) {
      const acceptableOptions = { object: true, string: true, number: true };
      if (type === undefined || type === null) {
        return false;
      }

      return acceptableOptions[type] !== undefined;
    };

    const validDirection = function(dir) {
      const acceptableOptions = { one: true, two: true };
      if (dir === undefined || dir === null) {
        return false;
      }

      return acceptableOptions[dir];
    };

    if (!validDataType(dataType) || !validDirection(direction)) {
      throw 'Data type must be: string, number, object. Direction must be one or two.';
    }

    this.data = {};
    this.type = dataType;
    this.size = 0;
    this.way = direction;
  }

  addVertices(...vertices) {
    let str;

    vertices.forEach(function(vertex) {
      if (!this.validData(vertex)) {
        throw 'Incorrect data type for this graph.';
      }

      str = typeof vertex !== 'string' ? this.toString(vertex) : vertex;

      if (this.data[str]) {
        throw 'Vertex already exists in graph.';
      }

      this.data[str] = [];
      this.size += 1;
    }, this);

    return this;
  }

  removeVertex(vertex) {
    let str = this.toString(vertex);

    if (!this.data[str]) {
      return null;
    }

    let edges = this.data[str];

    edges.forEach(function(edge) {
      this.removeEdges(edge, [vertex]);
    }, this);

    // write test to check if null equals exists

    this.data[str] = null;
    this.size -= 1;
    return vertex;
  }

  addEdges(vertex, arr) {
    if (!this.validData(vertex) || !Array.isArray(arr)) {
      throw 'Must have two arguments: vertex and edges array.';
    }

    let str = this.toString(vertex);
    let self = this;

    arr.forEach(function(value) {
      if (!this.data[this.toString(value)]) {
        throw 'Vertex in edges array not a valid vertex.';
      }

      if (this.toString(value) === str) {
        throw 'Vertex in edges array cannot be the first argument.';
      }

      if (this.data[str].filter((val) => self.toString(val) === self.toString(value)).length === 1) {
        throw 'Vertex already exists as edge for passed vertex.';
      }

      if (this.way === 'one') {
        this.data[str].push(value);
      } else {
        this.data[str].push(value);
        this.data[this.toString(value)].push(vertex);
      }
    }, this);

    return this;
  }

  removeEdges(vertex, arr) {
    if (!this.validData(vertex) || !Array.isArray(arr)) {
      throw 'Must have two arguments: vertex and edges array.';
    }

    let str = this.toString(vertex);
    let self = this;

    arr.forEach(function(value) {
      if (this.way === 'one') {
        this.data[str] = this.data[str].filter((val) => self.toString(val) !== self.toString(value));
      } else {
        this.data[str] = this.data[str].filter((val) => self.toString(val) !== self.toString(value));
        this.data[this.toString(value)] = this.data[this.toString(value)].filter((val) => self.toString(val) !== self.toString(vertex));
      }     
    }, this);

    return this;
  }

  getSize() {
    return this.size;
  }

  getEdges(vertex) {
    if (vertex === undefined) {
      return null;
    }

    if (!this.data[this.toString(vertex)]) {
      throw 'Vertex does not exist.';
    }

    return this.data[this.toString(vertex)];
  }

  edgesToArray(vertex) {
    if (vertex === undefined) {
      return null;
    }

    let str = this.toString(vertex);

    if (!this.data[str]) {
      throw 'Vertex does not exist.';
    }

    let arr = [];

    this.data[str].forEach(function(edge) {
      arr.push([vertex, edge]);
    });

    return arr;
  }

  numberOfEdges(vertex) {
    if (vertex === undefined || !this.data[this.toString(vertex)]) {
      return null;
    }

    return this.data[this.toString(vertex)].length;
  }

  hasEdge(vertexOne, vertexTwo) {
    if (!this.data[this.toString(vertexOne)]) {
      throw 'First vertex does not exist.';
    }

    if (!this.data[this.toString(vertexTwo)]) {
      throw 'Second vertex does not exist.';
    }

    let self = this;

    return this.data[this.toString(vertexOne)].filter((val) => self.toString(val) === self.toString(vertexTwo)).length === 1;
  }

  hasVertex(vertex) {
    if (vertex === undefined) {
      return false;
    }

    let str = this.toString(vertex);

    if (!this.data[str]) {
      return false;
    } else {
      return true;
    }
  }

  validData(value) {
    switch (this.type) {
      case 'string':
        return Util.isString(value);
      case 'number':
        return Util.isNumber(value);
      default:
        return Util.isObjectGraph.call(this, value);
    }
  }

  toString(vertex) {
    if (this.type === 'string') {
      return vertex;
    } else if (this.type === 'number') {
      return vertex.toString();
    } else {
      return JSON.stringify(vertex);
    }
  }
};

module.exports = Plus;