const Plus = require('../app.js');

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

    expect(s.data.head.val).toBe(null);

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

  it('should find and return object with value and index', () => {
    let s = new Plus.Stack('linkedlist');

    expect(s.search()).toBe(null);
    expect(s.search(3)).toBe(null);

    s.push(12, true, false);
    let res = s.search(true);

    expect(res.node.val).toBe(true);
    expect(res.index).toBe(1);

    res = s.search(99);

    expect(res).toBe(null);
  });

  it('should return length of list', () => {
    let stack = new Plus.Stack('linkedlist');
    expect(stack.length()).toBe(1);

    stack.push(1, 2, 3);
    expect(stack.length()).toBe(4);

    stack.pop();
    expect(stack.length()).toBe(3);

    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    expect(stack.length()).toBe(1);

    stack.push(1);
    expect(stack.length()).toBe(2);
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

  it('should find and return object with value and index', () => {
    let s = new Plus.Stack();

    expect(s.search()).toBe(null);
    expect(s.search(3)).toBe(null);

    s.push(12, true, false);
    let res = s.search(true);

    expect(res.val).toBe(true);
    expect(res.index).toBe(1);

    res = s.search(99);

    expect(res).toBe(null);
  });

  it('should return length of array', () => {
    let stack = new Plus.Stack();
    expect(stack.length()).toBe(0);

    stack.push(1, 2, 3);
    expect(stack.length()).toBe(3);

    stack.pop();
    expect(stack.length()).toBe(2);

    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    expect(stack.length()).toBe(0);

    stack.push(1);
    expect(stack.length()).toBe(1);
  });
});
