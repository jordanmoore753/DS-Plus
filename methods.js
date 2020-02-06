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
        this.data.shift();
      } else {
        return 0;
      }
    }

    return 1;
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

    headNode.next = null;
    return this.head;    
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

  // traverse() {
  //   let headNode = this.head;

  //   while (headNode !== null) {
  //     console.log(headNode);
  //     headNode = headNode.next;
  //   }

  //   return 1;
  // }

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
    let tailNode = this.tail();
    let length = this.length();
    let headNode = this.head;
    let nextNode;
    let nextNextNode;
    let i = 0;

    while (i <= length) {
      nextNextNode = tailNode.next;
      tailNode.next = headNode;
      nextNode = headNode.next;
      headNode.next = nextNextNode;
      headNode = nextNode;
      i += 1;
    }

    this.head = tailNode;
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

// let list = new Plus.LinkedList();
// list.assignHeadValue(3);
// list.insertAtTail(4, 4, { one: 'two' }, 55, true);
// list.insertAtIndex(0, 'string', 'second string', 'third string');
// list.traverse();


// Tree Prototype

// BST Prototype

// Graph Prototype

// Array/Object methods

// String methods

// Number methods

module.exports = Plus;