const Plus = require('../methods.js');

describe('Queue Object', () => {
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