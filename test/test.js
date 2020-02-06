const Plus = require('../methods.js');

describe('Queue', () => {
  it('should have data be an array', () => {
    let queue = new Plus.Queue();
    expect(Array.isArray(queue.data)).toBe(true);
    expect(queue.data.length).toBe(0);
    expect(queue.hasOwnProperty('data')).toBe(true);
  });

  it('should have data be a linked list', () => {
    let queue = new Plus.Queue('linkedlist');
    // expect for linked list stuff
  });

  it('should append single element to end of data', () => {
    let queue = new Plus.Queue();

    queue.enqueue(3);
    expect(queue.data.length === 1).toBe(true);
    expect(queue.data[0]).toBe(3);

    queue.enqueue({ one: 'more!' });
    expect(queue.data.length === 2).toBe(true);
    expect(queue.data[0]).toBe(3);  

    // Linked List  
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

    // Linked List
  });

  it('should remove from front of data', () => {
    let queue = new Plus.Queue();

    queue.enqueue(12, true, false);
    queue.dequeue();

    expect(queue.data.length).toBe(2);
    expect(queue.data[0]).toBe(true);
    expect(queue.data[1]).toBe(false);
    expect(queue.data.includes(12)).toBe(false);

    // Linked List
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

    // Linked List
  });

  it('should return the last element', () => {
    let queue = new Plus.Queue();

    queue.enqueue(12, true, false);

    let last = queue.rear();

    expect(last).toBe(false);
    expect(last === queue.data[2]).toBe(true);

    queue.dequeue();

    expect(last === queue.data[1]).toBe(true);   

    // Linked List    
  });
})

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
  });

  it('should remove the first node with matching value', () => {
    let ll = new Plus.LinkedList(4);

    ll.removeByValue(4);

    expect(ll.head.val).toBe(4);
    expect(ll.length()).toBe(1);

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

    expect(ll.head.val).toBe(4);
    expect(ll.length()).toBe(1);
    expect(ll.head.next).toBe(null);

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
    ll.removeByIndex(0);
    ll.reverse();

    expect(ll.head.val).toBe(8);
    expect(ll.getNodeAtIndex(1).val).toBe(7);
    expect(ll.getNodeAtIndex(2).val).toBe(6);
    expect(ll.getNodeAtIndex(3).val).toBe(5);
    expect(ll.getNodeAtIndex(4).val).toBe(3);
    expect(ll.getNodeAtIndex(5).val).toBe(2);
    expect(ll.getNodeAtIndex(6).val).toBe(1);

    ll.reverse();

    expect(ll.head.val).toBe(1);
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