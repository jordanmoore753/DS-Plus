const Plus = require('../app.js');

describe('Binary Tree', () => {
  it('should initialize with array', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);

    expect(tree.root.val).toBe(1);
    expect(tree.root.left.val).toBe(2);
    expect(tree.root.left.left.val).toBe(4);
    expect(tree.root.left.right.val).toBe(5);
    expect(tree.root.left.left.left.val).toBe(8);
    expect(tree.root.left.left.right).toBe(null);

    expect(tree.root.right.val).toBe(3);  
    expect(tree.root.right.left.val).toBe(6);
    expect(tree.root.right.right.val).toBe(7); 

    let arrTwo = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let treeTwo = new Plus.BinaryTree(arrTwo);

    expect(treeTwo.root.left.right.left.val).toBe(8);
    expect(treeTwo.root.left.left.left.val).toBe(null);

    tree = new Plus.BinaryTree();
    expect(tree.root.val).toBe(1);
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

    tree.insert(8).insert(9).insert(10);
    tree.insert(11).insert(12).insert(13);

    expect(tree.getValuesTraversal('post')).toEqual([8,9,4,11,12,10,2,13,6,7,3,1]);

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

    let arr6 = [1, 2, undefined];
    let tree6 = new Plus.BinaryTree(arr6);
    tree6.insert(12);
    expect(tree6.root.right.val).toBe(12);

    tree6 = new Plus.BinaryTree([1]);
    tree6.insert(2).insert(3).insert(4);

    expect(tree6.root.val).toBe(1);
    expect(tree6.root.left.val).toBe(2);
    expect(tree6.root.right.val).toBe(3);
  });

  it('should remove a single node of n value', () => {
    let arr = [1, 2, 3];
    let tree = new Plus.BinaryTree(arr);
    let sol = [2, 3];
    tree.remove(1);

    let res = tree.getValuesTraversal('pre');
    expect(tree.getValuesTraversal()).toEqual([2, 3, 1]);

    tree = new Plus.BinaryTree([1]);
    tree.insert(2).insert(3).remove(3);
    expect(tree.getValuesTraversal('post')).toEqual([2, 1]);

    tree = new Plus.BinaryTree([1, 2, 3, 4, 5]);
    tree.insert(6).remove(3);
    expect(tree.getValuesTraversal()).toEqual([4, 5, 2, 1]);

    tree.remove(34);
    expect(tree.getValuesTraversal()).toEqual([4, 5, 2, 1]);
  });

  it('should return a node of n value', () => {
    let arr = [10, 20, 30, undefined, undefined, undefined, 40];
    let tree = new Plus.BinaryTree(arr);
    let node = tree.getNode(30);
    expect(node.val).toBe(30); 
    expect(node.left.val).toBe(null);
    expect(node.right.val).toBe(40);

    arr = [10, 20, 30, undefined, undefined, 10, 40];
    tree = new Plus.BinaryTree(arr);
    node = tree.getNode(10);
    expect(node.val).toBe(10);
    expect(node.left.val).toBe(20);
    expect(node.right.val).toBe(30);

    arr = [];
    tree = new Plus.BinaryTree(arr);
    node = tree.getNode(30);
    expect(node).toBe(null);

    arr = [1];
    tree = new Plus.BinaryTree(arr);
    node = tree.getNode(1);
    expect(node.val).toBe(1);
    expect(node.left).toBe(null);
    expect(node.right).toBe(null);

    arr = [1, 2, 3, 4];
    tree = new Plus.BinaryTree(arr);
    node = tree.getNode(100);
    expect(node).toBe(null);    
  });

  it('should return height of given node', () => {
    let arr = [10, 20, 30, undefined, undefined, undefined, 40];
    let tree = new Plus.BinaryTree(arr);
    let node = tree.getNode(30);
    let res = tree.findHeight(node);
    expect(res).toBe(1);
  
    res = tree.findHeight(node);
    expect(res).toBe(1);

    node = tree.getNode(40);
    res = tree.findHeight(node);
    expect(res).toBe(0);

    arr = [];
    tree = new Plus.BinaryTree(arr);
    node = tree.getNode(2);
    expect(() => {
      tree.findHeight(node);
    }).toThrow('Parameter is not a node.');

    arr = [1, null, 3, undefined, undefined,
           5, undefined, undefined, undefined, undefined,
           undefined, 3, undefined, undefined, undefined, undefined,
           undefined, undefined, undefined, undefined, undefined,
           undefined, undefined, 5, 6];

    tree = new Plus.BinaryTree(arr);
    node = tree.getNode(1);
    expect(tree.findHeight(node)).toBe(4);

    arr = [1, 2, 3, 4, 5, 6, undefined,
           undefined, undefined, undefined, undefined, 7, undefined];

    tree = new Plus.BinaryTree(arr);
    node = tree.getNode(1);
    let nodeTwo = tree.getNode(5);
    let nodeThree = tree.getNode(6);
    let nodeFour = tree.getNode(3);

    expect(tree.findHeight(node)).toBe(3);
    expect(tree.findHeight(nodeTwo)).toBe(0);
    expect(tree.findHeight(nodeThree)).toBe(1);
    expect(tree.findHeight(nodeFour)).toBe(2);
    expect()
  });

  it('should be able to daisy chain methods', () => {
    const multiplyTwo = (node) => {
      return node.val = node.val * 2;
    };

    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    expect(tree.insert(44).remove(6)).toBe(tree);
    expect(tree.remove(17).manipulateTraversal()).toBe(0);
    expect(tree.insert(44)).toBe(tree);
    expect(tree.manipulateTraversal(multiplyTwo, 'pre')).toBe(tree);
  });

  it('should return an array of all values with preorder traversal', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [1, 2, 4, 8, 5, 3, 6, 7];
    let res = tree.getValuesTraversal('pre');

    res.forEach((num, i) => expect(num === solution[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);

    expect(treeTwo.getValuesTraversal('pre').length).toBe(0);
    expect(Array.isArray(treeTwo.getValuesTraversal('pre'))).toBe(true);

    let three = [1];
    let treeThree = new Plus.BinaryTree(three); 

    expect(treeThree.getValuesTraversal('pre').length).toBe(1);
    expect(treeThree.getValuesTraversal('pre')[0]).toBe(1);

    let arr4 = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let tree4 = new Plus.BinaryTree(arr4);
    let sol4 = [1, 2, 5, 8, 3, 6];
    let res4 = tree4.getValuesTraversal('pre');

    res4.forEach((num, i) => expect(num === sol4[i]).toBe(true));
  });

  it('should return an array of all values with postorder traversal', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [8, 4, 5, 2, 6, 7, 3, 1];
    let res = tree.getValuesTraversal();

    res.forEach((num, i) => expect(num === solution[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);

    expect(treeTwo.getValuesTraversal().length).toBe(0);
    expect(Array.isArray(treeTwo.getValuesTraversal())).toBe(true);

    let three = [1];
    let treeThree = new Plus.BinaryTree(three); 

    expect(treeThree.getValuesTraversal().length).toBe(1);
    expect(treeThree.getValuesTraversal()[0]).toBe(1);

    let arr4 = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let tree4 = new Plus.BinaryTree(arr4);
    let sol4 = [8, 5, 2, 6, 3, 1];
    let res4 = tree4.getValuesTraversal();

    res4.forEach((num, i) => expect(num === sol4[i]).toBe(true));
  });

  it('should return an array of all values with inorder traversal', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let tree = new Plus.BinaryTree(arr);
    let solution = [8, 4, 2, 5, 1, 6, 3, 7];
    let res = tree.getValuesTraversal('in');

    res.forEach((num, i) => expect(num === solution[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);

    expect(treeTwo.getValuesTraversal('in').length).toBe(0);
    expect(Array.isArray(treeTwo.getValuesTraversal('in'))).toBe(true);

    let three = [1];
    let treeThree = new Plus.BinaryTree(three); 

    expect(treeThree.getValuesTraversal('in').length).toBe(1);
    expect(treeThree.getValuesTraversal('in')[0]).toBe(1);

    let arr4 = [1, 2, 3, undefined, 5, 6, undefined, undefined, undefined, 8];
    let tree4 = new Plus.BinaryTree(arr4);
    let sol4 = [2, 8, 5, 1, 6, 3];
    let res4 = tree4.getValuesTraversal('in');

    res4.forEach((num, i) => expect(num === sol4[i]).toBe(true));

    expect(tree4.getValuesTraversal('opie')).toBe(0);
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
    tree.manipulateTraversal(double);

    let res = tree.getValuesTraversal();
    res.forEach((num, i) => expect(num === solution[i]).toBe(true)); 

    let sol3 = [32, 16, 20, 8, 24, 28, 12, 4];
    tree.manipulateTraversal(halve).manipulateTraversal(quadruple);
    res = tree.getValuesTraversal();

    res.forEach((num, i) => expect(num === sol3[i]).toBe(true)); 
    let two = [];
    let treeTwo = new Plus.BinaryTree(two);
    let res2 = treeTwo.manipulateTraversal(double);

    expect(res2.root).toBe(treeTwo.root);
    expect(tree.manipulateTraversal(not_function)).toBe(0);
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
    tree.manipulateTraversal(double, 'pre');

    let res = tree.getValuesTraversal('pre');
    res.forEach((num, i) => expect(num === solution[i]).toBe(true)); 

    tree.manipulateTraversal(halve, 'pre').manipulateTraversal(quadruple, 'pre');
    res = tree.getValuesTraversal('pre');
    res.forEach((num, i) => expect(num === sol3[i]).toBe(true));

    let two = [];
    let treeTwo = new Plus.BinaryTree(two);
    let res2 = treeTwo.manipulateTraversal(double, 'pre');

    expect(res2.root).toBe(treeTwo.root);
    expect(tree.manipulateTraversal(not_function, 'pre')).toBe(0);
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
    tree.manipulateTraversal(double, 'in');

    let res = tree.getValuesTraversal('in');
    res.forEach((num, i) => expect(num === solution[i]).toBe(true)); 

    tree.manipulateTraversal(halve, 'in').manipulateTraversal(quadruple, 'in');
    res = tree.getValuesTraversal('in');
    res.forEach((num, i) => expect(num === sol3[i]).toBe(true));
     
    let two = [];
    let treeTwo = new Plus.BinaryTree(two);
    let res2 = treeTwo.manipulateTraversal(double, 'in');

    expect(res2.root).toBe(treeTwo.root);
    expect(tree.manipulateTraversal(not_function, 'in')).toBe(0);
  });
});