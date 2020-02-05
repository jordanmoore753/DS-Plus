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
});