const Plus = require('../app.js');

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

    expect(queue.dequeue()).toBe(null);

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

  it('should find and return object with value and index', () => {
    let queue = new Plus.Queue();

    expect(queue.search()).toBe(null);
    expect(queue.search(3)).toBe(null);

    queue.enqueue(12, true, false);

    let res = queue.search(true);

    expect(res).toEqual({
      val: true,
      index: 1
    });

    res = queue.search(99);

    expect(res).toBe(null);
  });

  it('should return length of array', () => {
    let queue = new Plus.Queue();
    expect(queue.length()).toBe(0);

    queue.enqueue(1, 2, 3);
    expect(queue.length()).toBe(3);

    queue.dequeue();
    expect(queue.length()).toBe(2);

    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    expect(queue.length()).toBe(0);

    queue.enqueue(1);
    expect(queue.length()).toBe(1);
  });
});

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

    expect(queue.dequeue()).toBe(4);
    expect(queue.data.head.val).toBe(null);

    queue = new Plus.Queue('linkedlist');
    queue.data.assignHeadValue(4);    
    queue.enqueue(2, 3, 5);

    expect(queue.dequeue()).toBe(4);
    expect(queue.data.head.val).toBe(2);
    expect(queue.dequeue()).toBe(2);
    expect(queue.data.head.val).toBe(3);
    expect(queue.dequeue()).toBe(3);
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

  it('should find and return object with value and index', () => {
    let queue = new Plus.Queue('linkedlist');

    expect(queue.search()).toBe(null);
    expect(queue.search(3)).toBe(null);

    queue.enqueue(12, true, false);

    let res = queue.search(true);

    expect(res.node.val).toBe(true);
    expect(res.index).toBe(1);

    res = queue.search(99);

    expect(res).toBe(null);
  });

  it('should return length of list', () => {
    let queue = new Plus.Queue('linkedlist');
    expect(queue.length()).toBe(1);

    queue.enqueue(1, 2, 3);
    expect(queue.length()).toBe(4);

    queue.dequeue();
    expect(queue.length()).toBe(3);

    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    expect(queue.length()).toBe(1);

    queue.enqueue(1);
    expect(queue.length()).toBe(2);
  });
});
