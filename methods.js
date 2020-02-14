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

  findHeight(node) {
    if (!node) {
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
      return 0;
    }

    let queue = new Plus.Queue();
    let oldNodes;
    let newNodes;
    let node;
    let correctNode;

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

    return 0;
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

        if (!node) {
          node = new Plus.TreeNode(valueQueue.dequeue());
          return this;
        }

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

  remove(value) {
    if (!this.root.val) {
      return 0;
    }

    let queue = new Plus.Queue();
    let foundMatch = false;
    let oldNodes;
    let newNodes;
    let deleteNode;
    let lastNode;
    let node;
    let i = 0;

    queue.enqueue([this.root]);

    while (queue.data[0].length > 0) {
      oldNodes = queue.dequeue();
      newNodes = [];

      for (let i = 0; i < oldNodes.length; i += 1) {
        node = oldNodes[i];

        if (node.val === value && !foundMatch) {
          foundMatch = true;
          deleteNode = node;
        } 

        if (node.val !== value) {
          lastNode = node;
        }

        if (node.left) {
          newNodes.push(node.left);
        }

        if (node.right) {
          newNodes.push(node.right);
        }
      }

      queue.enqueue(newNodes);
    }

    if (deleteNode && lastNode) {
      deleteNode.val = lastNode.val;
      lastNode.val = null;      
    }

    return this;
  }
};

// Node Prototype

Plus.TreeNode = class {
  constructor(val, left, right) {
    this.val = val || null;
    this.left = null;
    this.right = null;
    this.duplicates = 0;
  }

  // insert(node = this, value, compareFunction) {
  //   console.log(value);
  //   if (node === null) {
  //     return new Plus.TreeNode(value);
  //   } else if (node.val === null) {
  //     node.val = value;
  //   } else if (node.val === value) {
  //     return node;
  //   } else if (compareFunction(value, node.val)) {
  //     node.left = this.insert(node.left, value, compareFunction);
  //   } else {
  //     node.right = this.insert(node.right, value, compareFunction);
  //   }

  //   let lh, rh;
  //   lh = !node.left ? -1 : node.getHeight(node.left);
  //   rh = !node.right ? -1 : node.getHeight(node.right);

  //   node.height = 1 + Math.max(lh, rh);
  //   console.log(node);
  //   // this is actually inserting into the correct position
  //   // adjust the height
  //   // get the balance
  //   // do what you need to do
  //   // be calm
  //   // it is not inserting anything beyond a single nested node
  //   // it is a giant piece of shit but its your job to fix it
  // }

  // getHeight(node) {
  //   if (node === null) {
  //     return -1;
  //   }

  //   let left = this.getHeight(node.left);
  //   let right = this.getHeight(node.right);

  //   return 1 + Math.max(left, right);
  // }
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

        if (options['compareFunction'] && !isFunction(options['compareFunction'])) {
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

        if (!options['compareFunction'] || !isFunction(options['compareFunction'])) {
          throw `object[compareFunction] is not a valid function or is not present.`;
        }

        if (!options['key'] || typeof options['key'] !== 'string') {
          throw `'key' property must be a string value and be present for object data type.`;
        }

        if (!options['keyType'] || validKeyTypes.indexOf(options['keyType']) === -1) {
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
    this.compareFunction = options['compareFunction'] || Util.defaultComparison;
    this.key = options['key'];
    this.keyType = options['keyType'];
    this.duplicates = 0;
    this.root = null;
  }

  getBF(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  getHeight(node) {
    let h = 0;

    if (node === null || !node) {
      h = -1;
    } else {
      h = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    return h;
  }

  insert(value) {
    let queue = new Plus.Queue();

    if (!value) {
      return;
    } else if (Array.isArray(value)) {
      value.forEach((val) => queue.enqueue(val));
    } else {
      queue.enqueue(value);
    }

    let currentValue;
    let newNode;

    while (queue.data.length > 0) {
      currentValue = queue.dequeue();

      if (this.validData(currentValue)) {
        newNode = new Plus.TreeNode(currentValue);

        if (this.root === null) {
          this.root = newNode;
        } else {
          this.root = this.insertHelper(this.root, newNode);
        }
      }
    }

    return this;
  } 

  insertHelper(root, node) {
    if (root === null) {
      root = node;
    } else if (node.val === root.val) {
      root.duplicates += 1;
    } else if (this.compareFunction(node.val, root.val)) {
      root.left = this.insertHelper(root.left, node);

      if (root.left !== null && this.getBF(root) > 1) {
        if (!this.compareFunction(node.val, root.left.val)) {
          root = this.rotationLeftLeft(root);
        } else {
          root = this.rotationLeftRight(root);
        }
      }
    } else if (!this.compareFunction(node.val, root.val)) {
      root.right = this.insertHelper(root.right, node);

      if (root.right !== null && this.getBF(root) < -1) {
        if (!this.compareFunction(node.val, root.right.val)) {
          root = this.rotationRightRight(root);
        } else {
          root = this.rotationRightLeft(root);
        }
      }
    }

    return root;
  }

  rotationLeftLeft(node) {
    let newHead = node.left;
    node.left = newHead.right;
    newHead.right = node;
    return newHead;
  }

  rotationLeftRight(node) {
    node.left = this.rotationRightRight(node.left);
    return this.rotationLeftLeft(node);
  }

  rotationRightRight(node) {
   let newHead = node.right;
   node.right = newHead.left;
   newHead.left = node;
   return newHead;
  }

  rotationRightLeft(node) {
    node.right = this.rotationLeftLeft(node.right);
    return this.rotationRightRight(node);
  }

  remove(key) {

  }

  search(key) {

  }

  collect() {

  }

  betweenBounds() {

  }

  validData(value) {
    if (!value) {
      return false;
    }

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

  sorter() {

  }
};

// Graph Prototype

module.exports = Plus;