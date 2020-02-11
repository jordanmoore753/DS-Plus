const Plus = require('../methods.js');

describe('Queue With Array', () => {
  it('should have data be an array', () => {
    let queue = new Plus.Queue();
    expect(Array.isArray(queue.data)).toBe(true);
    expect(queue.data.length).toBe(0);
    expect(queue.hasOwnProperty('data')).toBe(true);
  });

  it('should append single element to end of data', () => {
    let queue = new Plus.Queue();

    queue.enqueue(3);
    expect(queue.data.length === 1).toBe(true);
    expect(queue.data[0]).toBe(3);

    queue.enqueue({ one: 'more!' });
    expect(queue.data.length === 2).toBe(true);
    expect(queue.data[0]).toBe(3);   
  });

  it('should append several elements to end of data', () => {
    let queue = new Plus.Queue();

    queue.enqueue(12, true, false, 'yes', { come: 'on!' });

    expect(queue.data.length === 5).toBe(true);
    expect(queue.data[0]).toBe(12);
    expect(queue.data[1]).toBe(true);
    expect(queue.data[2]).toBe(false);
    expect(queue.data[3]).toBe('yes');
    expect(queue.data[4]).toEqual({ come: 'on!' });
  });

  it('should remove from front of data', () => {
    let queue = new Plus.Queue();

    queue.enqueue(12, true, false);
    queue.dequeue();

    expect(queue.data.length).toBe(2);
    expect(queue.data[0]).toBe(true);
    expect(queue.data[1]).toBe(false);
    expect(queue.data.includes(12)).toBe(false);

    queue.dequeue();
    queue.dequeue();

    expect(queue.dequeue()).toBe(0);

  });

  it('should return the first element', () => {
    let queue = new Plus.Queue();

    queue.enqueue(12, true, false);

    let first = queue.front();

    expect(first).toBe(12);
    expect(first === queue.data[0]).toBe(true);

    queue.dequeue();

    expect(first === queue.data[0]).toBe(false);

    first = queue.front();

    expect(first).toBe(true);
    expect(first === queue.data[0]).toBe(true);    
  });

  it('should return the last element', () => {
    let queue = new Plus.Queue();

    queue.enqueue(12, true, false);

    let last = queue.rear();

    expect(last).toBe(false);
    expect(last === queue.data[2]).toBe(true);

    queue.dequeue();

    expect(last === queue.data[1]).toBe(true);   
  });
})

describe('Queue with Linked List', () => {
  it('should initialize without value', () => {
    let queue = new Plus.Queue('linkedlist');
    expect(queue.data.head.val).toBe(undefined);
    expect(queue.ll).toBe(true);
  });

  it('should add multiple or single elements to tail', () => {
    let queue = new Plus.Queue('linkedlist');
    queue.data.assignHeadValue(4);

    let res = queue.enqueue(2, 3, 5);
    expect(queue.data.head.val).toBe(4);
    expect(queue.data.getNodeAtIndex(1).val).toBe(2);
    expect(queue.data.getNodeAtIndex(2).val).toBe(3);
    expect(queue.data.getNodeAtIndex(3).val).toBe(5);
  });

  it('should remove element from head', () => {
    let queue = new Plus.Queue('linkedlist');
    queue.data.assignHeadValue(4);

    expect(queue.dequeue()).toBe(1);
    expect(queue.data.head).toBe(null);

    queue = new Plus.Queue('linkedlist');
    queue.data.assignHeadValue(4);    
    queue.enqueue(2, 3, 5);

    expect(queue.dequeue()).toBe(1);
    expect(queue.data.head.val).toBe(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.data.head.val).toBe(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.front().val).toBe(5);
  });

  it('should return the head node', () => {
    let queue = new Plus.Queue('linkedlist');
    queue.data.assignHeadValue(4);

    expect(queue.front().val).toBe(4);

    queue.enqueue(2, 3);
    queue.dequeue();
    expect(queue.front().val).toBe(2);
  });

  it('should return the tail node', () => {
    let queue = new Plus.Queue('linkedlist');
    queue.data.assignHeadValue(4);
    expect(queue.rear().val).toBe(4);

    let obj = { one: '1' };
    queue.enqueue(2, 3, 4, obj);
    expect(queue.rear().val).toBe(obj);
  });
});

describe('Stack with Array', () => {
  it('should initialize without value', () => {
    let s = new Plus.Stack();
    expect(s.data.length).toBe(0);
    expect(Array.isArray(s.data)).toBe(true);

    s = new Plus.Stack(3);
    expect(s.data.length).toBe(0);
    expect(Array.isArray(s.data)).toBe(true);
  });

  it('should push single or multiple elements to end of array', () => {
    let s = new Plus.Stack();
    s.push(1);

    expect(s.data[0]).toBe(1);
    expect(s.data.length).toBe(1);

    s.push(3, 4, { one: 'm' }, [1, 2, 3], true);

    expect(s.data[1]).toBe(3);
    expect(s.data[2]).toBe(4);
    expect(s.data[5]).toBe(true);
  });

  it('should pop single element from end of array', () => {
    let s = new Plus.Stack();

    let ret = s.pop();
    expect(ret).toBe(undefined);

    let arr = [1, 2, 3];
    s.push(1, 2, 3, arr);

    ret = s.pop();
    expect(ret).toBe(arr);

    ret = s.pop();
    expect(ret).toBe(3);
  });

  it('should peek the last element in the array', () => {
    let s = new Plus.Stack();

    let res = s.peek();
    expect(res).toBe(undefined);

    s.push(1, 2, 3, true, 'string');

    expect(s.peek()).toBe('string');
    s.pop();
    expect(s.peek()).toBe(true);
    s.pop();       
    expect(s.peek()).toBe(3);
  });

  it('should return a boolean for if the array is empty', () => {
    let s = new Plus.Stack();

    expect(s.isEmpty()).toBe(true);

    s.push(1, 2, 3);

    expect(s.isEmpty()).toBe(false);

    s.pop();
    s.pop();
    s.pop();

    expect(s.isEmpty()).toBe(true);    
  });
});

describe('Stack with Linked List', () => {
  it('should initialize with or without value', () => {
    let s = new Plus.Stack('linkedlist');
    expect(s.data.head.val).toBe(undefined);
    expect(s.ll).toBe(true);

    s = new Plus.Stack('linkedlist', 4);
    expect(s.data.head.val).toBe(4);
    expect(s.ll).toBe(true);
  });

  it('should push single or multiple elements to tail node', () => {
    let s = new Plus.Stack('linkedlist', 4);
    s.push(1);

    expect(s.data.length()).toBe(2);
    expect(s.peek().val).toBe(1);

    let arr = [1, 2, 3];
    s.push(2, 3, 9888, 'string', arr);

    expect(s.peek().val).toBe(arr);
    expect(s.data.length()).toBe(7);
  }); 

  it('should pop single tail element', () => {
    let s = new Plus.Stack('linkedlist', 4);
    s.pop();

    expect(s.data.head).toBe(null);

    s = new Plus.Stack('linkedlist', 4);
    s.push(2, 3, 4);
    s.pop();

    expect(s.peek().val).toBe(3);
    s.pop();
    expect(s.peek().val).toBe(2);
  });

  it('should return the last element', () => {
    let s = new Plus.Stack('linkedlist', 4);
    expect(s.peek().val).toBe(4);

    s.push(1, 2, 3);
    expect(s.peek().val).toBe(3);

    let r = new Plus.Stack('linkedlist');
    expect(r.peek().val).toBe(undefined);
  });

  it('should return true or false if head node is null', () => {
    let s = new Plus.Stack('linkedlist', 4);
    expect(s.isEmpty()).toBe(false);

    let r = new Plus.Stack('linkedlist');
    expect(s.isEmpty()).toBe(false);

    r.pop();
    expect(r.isEmpty()).toBe(true);
  });
});

describe('Linked List', () => {
  it('should initialize with or without value', () => {
    let ll = new Plus.LinkedList();
    expect(ll.head.val).toBe(undefined);

    let ll2 = new Plus.LinkedList(3);
    expect(ll2.head.val).toBe(3);

    [ll, ll2].forEach((obj) => expect(obj instanceof Plus.LinkedList).toBe(true));
  });

  it('should assign head value with method', () => {
    let ll = new Plus.LinkedList();
    expect(ll.head.val).toBe(undefined);

    ll.assignHeadValue(3);
    expect(ll.head.val).toBe(3);
  });

  it('should insert single or multiple elements at tail end by default', () => {
    let ll = new Plus.LinkedList(4);

    ll.insert(3);

    expect(ll.length()).toBe(2);
    expect(ll.tail().val).toBe(3);
    expect(ll.tail().next).toBe(null);

    ll.insert(29, { one: 'more' }, true, ['yes', 'sir'], 'string!');

    expect(ll.length()).toBe(7);
    expect(ll.tail().val).toBe('string!');
    expect(ll.tail().next).toBe(null);
    expect(ll.getNodeAtIndex(2).val).toBe(29);
    expect(ll.getNodeAtIndex(4).val).toBe(true);
  });

  it('should insert single or multiple elements at index', () => {
    let ll = new Plus.LinkedList(4);

    ll.insertAtIndex(0, 2, true);

    expect(ll.length()).toBe(3);
    expect(ll.tail().val).toBe(true);
    expect(ll.tail().next).toBe(null);
    expect(ll.getNodeAtIndex(1).val).toBe(2);    

    ll.insertAtIndex(0, 'string', { one: 'more.' });

    expect(ll.length()).toBe(5);
    expect(ll.tail().val).toBe(true);
    expect(ll.tail().next).toBe(null);
    expect(ll.getNodeAtIndex(1).val).toBe('string');
    expect(ll.getNodeAtIndex(2).val).toEqual({ one: 'more.' });  
    expect(ll.getNodeAtIndex(3).val).toBe(2);  

    ll.insertAtIndex(3, 54, 999);

    expect(ll.length()).toBe(7);
    expect(ll.tail().val).toBe(true);
    expect(ll.tail().next).toBe(null);
    expect(ll.getNodeAtIndex(3).val).toBe(2);
    expect(ll.getNodeAtIndex(4).val).toBe(54);
    expect(ll.getNodeAtIndex(5).val).toBe(999);

    ll.insertAtIndex(6, 'prototypeeeee');

    expect(ll.length()).toBe(8);
    expect(ll.tail().val).toBe('prototypeeeee');
    expect(ll.tail().next).toBe(null);
    expect(ll.getNodeAtIndex(6).val).toBe(true); 

    let invalid = ll.insertAtIndex(33939, 'la');
    expect(invalid).toBe(0);

    let i2 = ll.insertAtIndex(undefined, 'la');
    expect(i2).toBe(0);

    i2 = ll.insertAtIndex('kdkdk', 'la');
    expect(i2).toBe(0);

    i2 = ll.insertAtIndex(-1, 'la');
    expect(i2).toBe(0);
  });

  it('should remove the first node with matching value', () => {
    let ll = new Plus.LinkedList(4);

    ll.removeByValue(4);

    expect(ll.head.val).toBe(4);
    expect(ll.length()).toBe(1);
    expect(ll.removeByValue()).toBe(0);

    ll.insert(23, 44,  true, [2, 3, 4]);
    ll.removeByValue(44);

    expect(ll.length()).toBe(4);
    expect(ll.getNodeAtIndex(2).val).toBe(true);
    expect(ll.getNodeAtIndex(1).val).toBe(23);
    expect(ll.head.val).toBe(4);

    ll.removeByValue(5993939);

    expect(ll.length()).toBe(4);
    expect(ll.getNodeAtIndex(2).val).toBe(true);
    expect(ll.getNodeAtIndex(1).val).toBe(23);
    expect(ll.head.val).toBe(4);   

    ll.removeByValue([2, 3, 4]); // will NOT remove, loose equality is NOT enough

    expect(ll.length()).toBe(4);
    expect(ll.getNodeAtIndex(2).val).toBe(true);
    expect(ll.getNodeAtIndex(1).val).toBe(23);
    expect(ll.head.val).toBe(4);
  });

  it('should remove element at specified index', () => {
    let ll = new Plus.LinkedList(4);

    ll.removeByIndex(0);

    expect(ll.head).toBe(null);

    ll = new Plus.LinkedList(4);

    ll.removeByIndex(322);

    expect(ll.head.val).toBe(4);
    expect(ll.length()).toBe(1);

    let res = ll.removeByIndex('one');

    expect(res).toBe(0);

    ll.insert(2, 3, 4, 5);
    ll.removeByIndex(0);

    expect(ll.head.val).toBe(2);
    expect(ll.head.next.val).toBe(3);
    expect(ll.tail().val).toBe(5);

    ll.removeByIndex(2);

    expect(ll.getNodeAtIndex(2).val).toBe(5);
    expect(ll.getNodeAtIndex(2).next).toBe(null);
    expect(ll.head.val).toBe(2);

    ll.removeByIndex(2);

    expect(ll.getNodeAtIndex(2)).toBe(0);
    expect(ll.tail().next).toBe(null);
    expect(ll.tail().val).toBe(3);
  });

  it('should remove the tail', () => {
    let ll = new Plus.LinkedList(4);

    expect(ll.removeByTail()).toBe(null);

    ll = new Plus.LinkedList(4);
    ll.insert(1, 2, 3);
    ll.removeByTail();

    expect(ll.tail().val).toBe(2);

    ll.removeByTail();

    expect(ll.tail().val).toBe(1);

    ll.removeByTail();

    expect(ll.tail().val).toBe(4);
  });

  it('should get the node at specified index', () => {
    let ll = new Plus.LinkedList(4);

    let node = ll.getNodeAtIndex(0);
    let nonNode = ll.getNodeAtIndex(10);
    let nopeNode = ll.getNodeAtIndex('string');
    let noIndexNode = ll.getNodeAtIndex(-1);

    expect(nonNode).toBe(0);
    expect(nopeNode).toBe(0);
    expect(noIndexNode).toBe(0);
    expect(node.val).toBe(4);

    ll.insert(2, 3, 4, 5);

    let secondNode = ll.getNodeAtIndex(1);
    let fourthNode = ll.getNodeAtIndex(3);

    expect(secondNode.val).toBe(2);
    expect(fourthNode.val).toBe(4);

    ll.removeByIndex(0);

    let firstNode = ll.getNodeAtIndex(0);

    expect(firstNode.val).toBe(2);
    expect(secondNode.val).toBe(2);
  });

  it('should get node by value and return node and index in array', () => {
    let ll = new Plus.LinkedList(4);
    let fReq = ll.getNodeIndexByValue(4);

    expect(fReq.val).toBe(4);
    expect(fReq.val).toBe(ll.head.val);

    let badReq = ll.getNodeIndexByValue();
    let obj = { one: 'more' };

    expect(badReq).toBe(0);

    ll.insert(2, 3, 4, 5, obj);

    let grabObj = ll.getNodeIndexByValue(obj);

    expect(grabObj.node.val).toBe(obj);
    expect(grabObj.index).toBe(5); 

    let grab3 = ll.getNodeIndexByValue(3);

    expect(grab3.node.val).toBe(3);
    expect(grab3.index).toBe(2);

    let nope = ll.getNodeIndexByValue(null);

    expect(nope).toBe(0);
  });

  it('should get middle node', () => {
    let ll = new Plus.LinkedList(4);

    let first = ll.getMiddleNode();
    expect(first.val).toBe(4);
    expect(ll.length()).toBe(1);

    ll.insert(2, 3, 5, 1);
    let second = ll.getMiddleNode();

    expect(second.val).toBe(3);
    expect(ll.length()).toBe(5);

    ll.insert(11);
    let third = ll.getMiddleNode();

    expect(third.val).toBe(5);
  });

  it('should get number of nodes', () => {
    let ll = new Plus.LinkedList(4);

    expect(ll.length()).toBe(1);

    ll.insert(1, 2, 3, 4);
    expect(ll.length()).toBe(5);

    ll.removeByValue(4);
    expect(ll.length()).toBe(4);

    ll.removeByValue(4);
    expect(ll.length()).toBe(3);

    ll.insertAtIndex(1, true, { one: 'more' }, [1, 2, 3], 99);

    expect(ll.length()).toBe(7);
  });

  it('should get the last node', () => {
    let ll = new Plus.LinkedList();
    let tail = ll.tail();

    expect(tail.val).toBe(undefined);

    ll.assignHeadValue(4);
    tail = ll.tail();

    expect(tail.val).toBe(4);

    ll.insert(1, 2, 3);
    tail = ll.tail();

    expect(tail.val).toBe(3);

    ll.removeByValue(3);
    tail = ll.tail();

    expect(tail.val).toBe(2);
  });

  it('should update the node value at index', () => {
    let ll = new Plus.LinkedList(4);
    ll.insert(2, { one: 'more' }, [1, 2, 3], true, 'no!');

    ll.updateValueAtIndex(0, false);

    expect(ll.head.val).toBe(false);

    ll.updateValueAtIndex(2, 'bye bye Object');

    expect(ll.getNodeAtIndex(2).val).toBe('bye bye Object');

    ll.updateValueAtIndex(5, 'yes!');

    expect(ll.getNodeAtIndex(5).val).toBe('yes!');

    let invalid = ll.updateValueAtIndex(2222, 9);

    expect(invalid).toBe(0);

    let secondInvalid = ll.updateValueAtIndex(-1, 9);

    expect(secondInvalid).toBe(0);

    let thirdInvalid = ll.updateValueAtIndex('one', 9);

    expect(thirdInvalid).toBe(0);
  });

  it('should reverse the entire list destructively', () => {
    let ll = new Plus.LinkedList(4);
    ll.reverse();

    expect(ll.head.val).toBe(4);

    ll.insert(1, 2, 3, 5, 6, 7, 8);
    ll.reverse();

    expect(ll.head.val).toBe(8);
    expect(ll.getNodeAtIndex(1).val).toBe(7);
    expect(ll.getNodeAtIndex(2).val).toBe(6);
    expect(ll.getNodeAtIndex(3).val).toBe(5);
    expect(ll.getNodeAtIndex(4).val).toBe(3);
    expect(ll.getNodeAtIndex(5).val).toBe(2);
    expect(ll.getNodeAtIndex(6).val).toBe(1);

    ll.reverse();

    expect(ll.head.val).toBe(4);
    expect(ll.tail().val).toBe(8);
    expect(ll.getMiddleNode().val).toBe(5);
  });

  it('should get count for multiple strings and numbers', () => {
    let ll = new Plus.LinkedList(4);
    let firstCount = ll.countMultiple(4);

    expect(firstCount['4']).toBe(1);

    ll.insert(4, 3, 2, 'one', 'one', 3, 'one', 'two');

    let secondCount = ll.countMultiple(4, 3, 'one', 'two', 2);

    expect(secondCount['4']).toBe(2);
    expect(secondCount['3']).toBe(2);
    expect(secondCount['one']).toBe(3);
    expect(secondCount['two']).toBe(1);
    expect(secondCount['2']).toBe(1);

    ll.insert('4', '3', 2);
    let thirdCount = ll.countMultiple(4, 3, 2);

    expect(thirdCount['4']).toBe(2);
    expect(thirdCount['3']).toBe(2);
    expect(thirdCount['2']).toBe(2);
  });

  it('should get count for any single data', () => {
    let obj = { one: 'more' };
    let ll = new Plus.LinkedList(obj);
    let fCount = ll.count(obj);

    expect(fCount).toBe(1);

    ll.insert(obj); 
    fCount = ll.count(obj);

    expect(fCount).toBe(2);

    let arr = [1, 3, 2];
    ll.insert(arr);
    fCount = ll.count(arr);

    expect(fCount).toBe(1);

    fCount = ll.count([1, 3, 2]);

    expect(fCount).toBe(0);
  });
});

describe('Binary Tree', () => {
  it('should initialize with array', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);

    expect(tree.root.val).toBe(1);
    expect(tree.root.left.val).toBe(2);
    expect(tree.root.left.left.val).toBe(4);
    expect(tree.root.left.right.val).toBe(5);
    expect(tree.root.left.left.left.val).toBe(8);
    expect(tree.root.left.left.right).toBe(undefined);

    expect(tree.root.right.val).toBe(3);  
    expect(tree.root.right.left.val).toBe(6);
    expect(tree.root.right.right.val).toBe(7); 

    let arrTwo = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let treeTwo = new Plus.BinaryTree(arrTwo);

    expect(treeTwo.root.left.right.left.val).toBe(8);
    expect(treeTwo.root.left.left.left.val).toBe(undefined);

  });

  it('should find max depth for self', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);

    expect(tree.findMaxDepth()).toBe(4);

    let arrTwo = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let treeTwo = new Plus.BinaryTree(arrTwo);

    expect(treeTwo.findMaxDepth()).toBe(4);

    let arrThree = [1, undefined, 3, undefined, undefined,
                    5, undefined, undefined, undefined, undefined,
                    undefined, 3, undefined, undefined, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    undefined, undefined, 5, 6];
    let treeThree = new Plus.BinaryTree(arrThree);

    expect(treeThree.findMaxDepth()).toBe(5);

    let noRoot = new Plus.BinaryTree([]);

    expect(noRoot.findMaxDepth()).toBe(0);

    let someRoot = new Plus.BinaryTree([1]);

    expect(someRoot.findMaxDepth()).toBe(1);
  });

  it('should insert nodes one at a time', () => {
    let arr = [1, 2, 3, 4, undefined, 6, 7];
    let tree = new Plus.BinaryTree(arr);  
    tree.insert(5);

    expect(tree.root.left.right.val).toBe(5);

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);
    treeTwo.insert(5);

    expect(treeTwo.root.val).toBe(5);

    let three = [1];
    let treeThree = new Plus.BinaryTree(three);   
    treeThree.insert(22);

    expect(treeThree.root.left.val).toBe(22);

    let arr4 = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let tree4 = new Plus.BinaryTree(arr4);
    tree4.insert(77);

    expect(tree4.root.left.left.val).toBe(77);

    let arr5 = [1, 2, 3, 4, 5, 6, 7, 8, undefined];
    let tree5 = new Plus.BinaryTree(arr5);
    let res5 = tree5.insert('srrr');

    expect(res5).toBe(tree5);
    expect(tree5.root.left.left.right.val).toBe('srrr');

    let arr6 = [1, 2, undefined];
    let tree6 = new Plus.BinaryTree(arr6);
    tree6.insert(12);

    expect(tree6.root.right.val).toBe(12);
  });

  // it('should insert nodes multiple at a time with children', () => {

  // });

  it('should remove a single node of n value', () => {

  });

  it('should remove nodes at a certain level', () => {

  });

  it('should be able to daisy chain methods', () => {

  });

  it('should return an array of all values with preorder traversal', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [1, 2, 4, 8, 5, 3, 6, 7];
    let res = tree.getValuesPreorderTraversal();

    res.forEach((num, i) => expect(num === solution[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);

    expect(treeTwo.getValuesPreorderTraversal().length).toBe(0);
    expect(Array.isArray(treeTwo.getValuesPreorderTraversal())).toBe(true);

    let three = [1];
    let treeThree = new Plus.BinaryTree(three); 

    expect(treeThree.getValuesPreorderTraversal().length).toBe(1);
    expect(treeThree.getValuesPreorderTraversal()[0]).toBe(1);

    let arr4 = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let tree4 = new Plus.BinaryTree(arr4);
    let sol4 = [1, 2, 5, 8, 3, 6];
    let res4 = tree4.getValuesPreorderTraversal();

    res4.forEach((num, i) => expect(num === sol4[i]).toBe(true));
  });

  it('should return an array of all values with postorder traversal', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [8, 4, 5, 2, 6, 7, 3, 1];
    let res = tree.getValuesPostorderTraversal();

    res.forEach((num, i) => expect(num === solution[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);

    expect(treeTwo.getValuesPostorderTraversal().length).toBe(0);
    expect(Array.isArray(treeTwo.getValuesPostorderTraversal())).toBe(true);

    let three = [1];
    let treeThree = new Plus.BinaryTree(three); 

    expect(treeThree.getValuesPostorderTraversal().length).toBe(1);
    expect(treeThree.getValuesPostorderTraversal()[0]).toBe(1);

    let arr4 = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let tree4 = new Plus.BinaryTree(arr4);
    let sol4 = [8, 5, 2, 6, 3, 1];
    let res4 = tree4.getValuesPostorderTraversal();

    res4.forEach((num, i) => expect(num === sol4[i]).toBe(true));
  });

  it('should return an array of all values with inorder traversal', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [8, 4, 2, 5, 1, 6, 3, 7];
    let res = tree.getValuesInorderTraversal();

    res.forEach((num, i) => expect(num === solution[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);

    expect(treeTwo.getValuesInorderTraversal().length).toBe(0);
    expect(Array.isArray(treeTwo.getValuesInorderTraversal())).toBe(true);

    let three = [1];
    let treeThree = new Plus.BinaryTree(three); 

    expect(treeThree.getValuesInorderTraversal().length).toBe(1);
    expect(treeThree.getValuesInorderTraversal()[0]).toBe(1);

    let arr4 = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let tree4 = new Plus.BinaryTree(arr4);
    let sol4 = [2, 8, 5, 1, 6, 3];
    let res4 = tree4.getValuesInorderTraversal();

    res4.forEach((num, i) => expect(num === sol4[i]).toBe(true));
  });

  it('should mutate all values of root with postorder, return this for daisy chain', () => {
    const double = (node) => {
      return node.val = node.val * 2;
    };

    const halve = (node) => {
      return node.val = node.val / 2;
    };

    const quadruple = (node) => {
      return node.val = node.val * 4;
    };

    const not_function = 3;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [16, 8, 10, 4, 12, 14, 6, 2];
    tree.manipulatePostorder(double);

    let res = tree.getValuesPostorderTraversal();
    res.forEach((num, i) => expect(num === solution[i]).toBe(true)); 

    let sol3 = [32, 16, 20, 8, 24, 28, 12, 4];
    tree.manipulatePostorder(halve).manipulatePostorder(quadruple);
    res = tree.getValuesPostorderTraversal();

    res.forEach((num, i) => expect(num === sol3[i]).toBe(true)); 
    let two = [];
    let treeTwo = new Plus.BinaryTree(two);
    let res2 = treeTwo.manipulatePostorder(double);

    expect(res2.root).toBe(treeTwo.root);
    expect(tree.manipulatePostorder(not_function)).toBe(0);
  });

  it('should mutate all values of root with preorder, return this for daisy chain', () => {
    const double = (node) => {
      return node.val = node.val * 2;
    };

    const halve = (node) => {
      return node.val = node.val / 2;
    };

    const quadruple = (node) => {
      return node.val = node.val * 4;
    };

    const not_function = 3;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [2, 4, 8, 16, 10, 6, 12, 14];
    let sol3 = solution.map((num) => num * 2);
    tree.manipulatePreorder(double);

    let res = tree.getValuesPreorderTraversal();
    res.forEach((num, i) => expect(num === solution[i]).toBe(true)); 

    tree.manipulatePreorder(halve).manipulatePreorder(quadruple);
    res = tree.getValuesPreorderTraversal();
    res.forEach((num, i) => expect(num === sol3[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);
    let res2 = treeTwo.manipulatePreorder(double);

    expect(res2.root).toBe(treeTwo.root);
    expect(tree.manipulatePreorder(not_function)).toBe(0);
  });

  it('should mutate all values of root with inorder, return this for daisy chain', () => {
    const double = (node) => {
      return node.val = node.val * 2;
    };

    const halve = (node) => {
      return node.val = node.val / 2;
    };

    const quadruple = (node) => {
      return node.val = node.val * 4;
    };

    const not_function = 3;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [16, 8, 4, 10, 2, 12, 6, 14];
    let sol3 = solution.map((num) => num * 2);
    tree.manipulateInorder(double);

    let res = tree.getValuesInorderTraversal();
    res.forEach((num, i) => expect(num === solution[i]).toBe(true)); 

    tree.manipulateInorder(halve).manipulateInorder(quadruple);
    res = tree.getValuesInorderTraversal();
    res.forEach((num, i) => expect(num === sol3[i]).toBe(true));
     
    let two = [];
    let treeTwo = new Plus.BinaryTree(two);
    let res2 = treeTwo.manipulateInorder(double);

    expect(res2.root).toBe(treeTwo.root);
    expect(tree.manipulateInorder(not_function)).toBe(0);
  });
});