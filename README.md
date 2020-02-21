# Plus

*Plus* delivers non-native data structures to *JavaScript*. Included in this release of *Plus* are the following:

1. Queue
2. Stack
3. Linked List
4. Binary Tree
5. AVL Tree

By using these data structures, a developer can greatly increase the efficiency and power of their program. Additionally, *Plus* is made for developers first, so ease-of-use was of paramound concern at every stage of this package's creation. Many standard methods, like `insert` and `remove`, have been improved from their standard implementations, in addition to non-standard methods, like `countMultiple` for *Linked Lists*, also make the developer's life much easier.

The documentation has been written for novices, generalists, and experts alike, and contains all of the details necessary for one to get started today.

## Queue

A **Queue** is a data structure which follows a **first-in, first-out** algorithm. The first element added to the queue will be the first to be removed from the queue. Each new element is added to the end of the queue.

In *Plus*, a **Queue** object can be initialized with either an **array** or a **linked list** as its data storage.

```js
let LinkedListQueue = new Plus.Queue('linkedlist'); // This queue stores data in a linked list.
let ArrayQueue = new Plus.Queue();                  // This queue stores data in an array.
```
For certain applications, linked lists are a much smarter choice than an array. 

## Stack

A **Stack** is a data structure which follows a **first-in, last-out** algorithm. Elements are removed and inserted after the final element of the list.

In *Plus*, a **Stack** object can be initialized with either an **array** or a **linked list** as its data storage.

```js
let LinkedListStack = new Plus.Stack('linkedlist'); // This stack stores data in a linked list.
let ArrayStack = new Plus.Stack();                  // This stack stores data in an array.
```
Much like with queues, linked lists are suitable for many applications.

## Linked List

A **Linked List** is a data structure which uses **nodes** to store data and a **pointer** to another node. In *Plus*, a single node connects to another node. These nodes form a **link**, and the series of nodes forms a **linked list**. 

```js
let linkedListOne = new Plus.LinkedList();  // Initialized with no value in head node.
let linkedListTwo = new Plus.LinkedList(3); // Initialized with a value in head node.
```
