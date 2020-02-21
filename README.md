# Plus [![Build Status](https://travis-ci.org/{jordanmoore753}/{Plus}.png?branch=master)](https://travis-ci.org/{jordanmoore753}/{Plus})


*Plus* delivers non-native data structures to *JavaScript*. Included in this release of *Plus* are the following:

1. Queue
2. Stack
3. Linked List
4. Binary Tree
5. AVL Tree

By using these data structures, a developer can greatly increase the efficiency and power of their program. Additionally, *Plus* is made for developers first, so ease-of-use was of paramount concern at every stage of this package's creation. Many standard methods, like `insert` and `remove`, have been improved from their standard implementations, in addition to non-standard methods, like `countMultiple` for *Linked Lists*, also make the developer's life much easier.

The documentation has been written for novices, generalists, and experts alike, and contains all of the details necessary for one to get started today. Furthermore, these data structures do not eschew reliability for performance; every aspect of this package has been tested, and the **100%** test coverage is a testament to the fact that *Plus* simply **works well consistently**.

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
## Binary Tree

A **Binary Tree** is useful for storing hierarchal data, like in an application for mapping family trees. Essentially, the tree is comprised of nodes. Each node can be connect to a left and right child at most. These children can each also point to a left and right child of their own.

```js
let BinaryTree = new Plus.BinaryTree();          // Can be initialized with no data.
let BinaryTree = new Plus.BinaryTree([1, 2, 3]); // Can be initialized with data.
let BinaryTree = new Plus.BinaryTree([1]);       // Can be initialized with data.
```
The downside to using a simple binary tree instead of the next structure, an **AVL Tree**, is that a binary tree does not check to ensure any kind of relation between parent and children. This means that the tree cannot be searched in any way that prevents **O(n)** time.

## AVL Tree

An **AVL Tree** is a self-balancing *Binary Search Tree*. When new nodes are inserted into the tree, or when nodes are removed from the tree, the tree automatically rebalances itself to ensure **O(log2n)** time for common operations.

The **AVL Tree** in *Plus* is the strongest implementation of an AVL Tree in *JavaScript* up to this point in time. It includes all of the standard methods one expects from an AVL Tree, in addition to methods and data stores that I have included as improvements on the idea of an AVL Tree at its core.

Essentially, *Plus* enforces uniqueness and a singular data type for each `BST` object. This necessitates that the data included in the tree is consistent, reliable, and meaningful. Additionally, one can provide their own `compareFunction`, which dictates how nodes are compared against one another, and thereby, delegated into the tree's structure.

```js
let ObjectBST = new Plus.BST('object', { // A BST object which forces Object data only.
  compareFunction: validFunction, 
  key: 'id', 
  keyType: 'string' });

let StringBST = new Plus.BST('string');  // A BST object which allows String data only.
let NumberBST = new Plus.BST('number');  // A BST object which allows Number data only.
let DateBST = new Plus.BST('date');      // A BST object which allows Date data only.
```
# Next Steps

Read the documentation to get more specific information about initialization, methods, and more.