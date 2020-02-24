const Plus = require('../app.js');

describe('BST', () => {
  const sortById = function(a, b) {
    return a.id < b.id;
  };

  const invalidFunction = 42;

  const validFunction = (one) => {
    return one + 1;
  };

  const solHelper = (res, sol) => {
    return res.forEach((val, i) => expect(val === sol[i]).toBe(true));
  };

  const solDateHelper = (res, sol) => {
    return res.forEach((val, i) => expect(val.toString() === sol[i]).toBe(true));
  };

  const solObjHelper = (res, sol) => {
    return res.forEach((val, i) => expect(val.id === sol[i]).toBe(true));
  };

  it('should initialize a string-type BST', () => {
    // invalid cases

    expect(() => {
      new Plus.BST();
    }).toThrow('Data type must be defined as either string, number, date, or object.');

    expect(() => {
      new Plus.BST(23);
    }).toThrow('Data type was defined, but was not a correct value: string, date, number, or object.');

    expect(() => { 
      new Plus.BST('string', { tucker: 'no!' });
    }).toThrow('tucker is an unacceptable property for the options object and the specified data type.');

    expect(() => { 
      new Plus.BST('string', { compareFunction: invalidFunction });
    }).toThrow(`object[compareFunction] is not a valid function.`);

    // valid cases

    let bst = new Plus.BST('string');
    expect(bst.root).toBe(null);

    bst = new Plus.BST('string', { compareFunction: validFunction });
    expect(bst.root).toBe(null);
  });

  it('should initialize a number-type BST', () => {
    // invalid cases

    expect(() => { 
      new Plus.BST('number', { tucker: 'no!' });
    }).toThrow('tucker is an unacceptable property for the options object and the specified data type.');

    expect(() => { 
      new Plus.BST('number', { compareFunction: invalidFunction });
    }).toThrow(`object[compareFunction] is not a valid function.`);

    // valid cases

    bst = new Plus.BST('number', { compareFunction: validFunction });
    expect(bst.root).toBe(null);
  });

  it('should initialize a date-type BST', () => {
    // invalid cases

    expect(() => { 
      new Plus.BST('date', { tucker: 'no!' });
    }).toThrow('tucker is an unacceptable property for the options object and the specified data type.');

    expect(() => { 
      new Plus.BST('date', { compareFunction: invalidFunction });
    }).toThrow(`object[compareFunction] is not a valid function.`);

    // valid cases

    let bst = new Plus.BST('date');
    expect(bst.root).toBe(null);

    bst = new Plus.BST('date', { compareFunction: validFunction });
    expect(bst.root).toBe(null);
  });

  it('should initialize an object-type BST', () => {
    // invalid cases

    expect(() => {
      new Plus.BST('object');
    }).toThrow('Options object is not defined, must be present for object data type.');

    expect(() => {
      new Plus.BST('object', { tucker: 'no!' });
    }).toThrow('tucker is an unacceptable property for the options object and the specified data type.');

    expect(() => {
      new Plus.BST('object', { compareFunction: validFunction })
    }).toThrow(`'key' property must be a string value and be present for object data type.`);

    expect(() => {
      new Plus.BST('object', { compareFunction: 23 })
    }).toThrow(`object[compareFunction] is not a valid function or is not present.`);

    expect(() => {
      new Plus.BST('object', { compareFunction: validFunction, key: 83 })
    }).toThrow(`'key' property must be a string value and be present for object data type.`);

    expect(() => {
      new Plus.BST('object', { compareFunction: validFunction, key: 'id' })
    }).toThrow(`'keyType' property must be present and of 'string', 'number', or 'date' value for object data.`); 

    expect(() => {
      new Plus.BST('object', { compareFunction: validFunction, key: 'id', keyType: 23 })
    }).toThrow(`'keyType' property must be present and of 'string', 'number', or 'date' value for object data.`);   

    // valid cases

    let bst = new Plus.BST('object', { compareFunction: validFunction, key: 'id', keyType: 'string' });
    expect(bst.root).toBe(null);

    bst = new Plus.BST('object', { compareFunction: validFunction, key: 'id', keyType: 'string' });
    expect(bst.root).toBe(null);
  });

  it('should validate parameter data type', () => {
    let bst = new Plus.BST('string');
    expect(bst.validData('okay')).toBe(true);
    expect(bst.validData(undefined)).toBe(false);
    expect(bst.validData(23)).toBe(false);
    expect(bst.validData([])).toBe(false);

    bst = new Plus.BST('number');
    expect(bst.validData('okay')).toBe(false);
    expect(bst.validData(undefined)).toBe(false);
    expect(bst.validData(23)).toBe(true);
    expect(bst.validData([])).toBe(false);

    bst = new Plus.BST('date');
    expect(bst.validData('okay')).toBe(false);
    expect(bst.validData(undefined)).toBe(false);
    expect(bst.validData(23)).toBe(false);
    expect(bst.validData(new Date())).toBe(true);
    expect(bst.validData([])).toBe(false);
    expect(bst.validData({})).toBe(false);

    bst = new Plus.BST('object', { compareFunction: validFunction, key: 'id', keyType: 'string' });
    expect(bst.validData('okay')).toBe(false);
    expect(bst.validData(undefined)).toBe(false);
    expect(bst.validData(23)).toBe(false);
    expect(bst.validData(new Date())).toBe(false);
    expect(bst.validData([])).toBe(false);
    expect(bst.validData({ id: 'yes' })).toBe(true);
  });

  it('should insert value of specified data type in single or array form', () => {
    // number cases
    let bst = new Plus.BST('number');

    bst.insert();
    expect(bst.root).toBe(null);

    bst.insert(1);
    expect(bst.root.val).toBe(1);

    bst.insert(1);
    expect(bst.root.right).toBe(null);
    expect(bst.root.left).toBe(null);

    bst = new Plus.BST('number');

    // random nums
    bst.insert([10, 9, 8, 7, 3, 4]);
    solHelper(bst.getValuesTraversal(), [4,3,8,10,9,7]);
    
    // right right
    bst = new Plus.BST('number');
    bst.insert([3, 2, 1]);
    solHelper(bst.getValuesTraversal(), [1,3,2]);

    // left left
    bst = new Plus.BST('number');
    bst.insert([1,2,3]);
    solHelper(bst.getValuesTraversal(), [1,3,2]);

    // right left
    bst = new Plus.BST('number');
    bst.insert([10, 6, 7]);
    solHelper(bst.getValuesTraversal(), [6, 10, 7]);

    // left right
    bst = new Plus.BST('number');
    bst.insert([10, 14, 12]);
    solHelper(bst.getValuesTraversal(), [10, 14, 12]);

    // big data
    bst = new Plus.BST('number');
    bst.insert([32,57,68,18,94,148,323,2,586]);
    solHelper(bst.getValuesTraversal(), [2,32,18,68,148,586,323,94,57]);

    // custom compare function
    bst = new Plus.BST('object', { compareFunction: sortById, key: 'id', keyType: 'number' });
    bst.insert([{ id: 1 }, { id: -1 }, { id: 0 }, { id: 0 }]);
    solObjHelper(bst.getValuesTraversal(), [-1, 1, 0]);

    // date

    // bst = new Plus.BST('date');
    // bst.insert([new Date('October 13, 2019'), new Date('October 14, 2020'), new Date('October 15, 2021')]);
    // solDateHelper(bst.getValuesTraversal(), ['Sun Oct 13 2019 00:00:00 GMT-0400 (EDT)',
    //                                          'Fri Oct 15 2021 00:00:00 GMT-0400 (EDT)',
    //                                          'Wed Oct 14 2020 00:00:00 GMT-0400 (EDT)']);

    // string

    bst = new Plus.BST('string');
    bst.insert(['coal', 'mining', 'SUCKS']);
    solHelper(bst.getValuesTraversal(), ['SUCKS', 'mining', 'coal']);
  });

  it('should remove elements and rebalance', () => {
    let bst = new Plus.BST('number');

    bst.remove();
    expect(bst.root).toBe(null);    

    bst.remove(1);
    expect(bst.root).toBe(null);

    bst.insert([1,2,3]);
    bst.remove(1);
    solHelper(bst.getValuesTraversal(), [3,2]);

    // invalid type test
    bst.remove('none');
    solHelper(bst.getValuesTraversal(), [3,2]);

    bst = new Plus.BST('number');
    bst.insert([10, 14, 18, 12]);
    bst.remove(10);
    solHelper(bst.getValuesTraversal(), [12, 18, 14]);

    bst = new Plus.BST('number');
    bst.insert([3,2,0,-2]);
    bst.remove(0);
    solHelper(bst.getValuesTraversal(), [-2, 3, 2]);

    bst = new Plus.BST('number');
    bst.insert([11,5,20,4,18,25]);
    bst.remove(11);
    solHelper(bst.getValuesTraversal(), [4,18,25,20,5]);

    bst = new Plus.BST('number');
    bst.insert([3, 11, 5, 1, 15]);
    bst.remove(11);
    solHelper(bst.getValuesTraversal(), [1,3,15,5]);

    // tree is not always balanced but will be with another insertion
    bst = new Plus.BST('number');
    bst.insert([10,4,7,8,9,4,3,5,1]);
    bst.remove([10,9]);
    solHelper(bst.getValuesTraversal(), [1,3,5,8,7,4]);

    // big data
    bst = new Plus.BST('number');
    bst.insert([10, 20, 1000, 500, 23, 24.5, 101, 567, 333.3, 
      0, -23, 922, 921, 911, 243, 34, 543, 87, 231, 762, 81, 819]);
    bst.remove([10, 20, 1000, 500, 23, 24.5, 101, 567, 333.3, 
      0, -23, 922, 921, 911, 243, 34, 543, 87, 231, 762, 81, 819]);
    expect(bst.root).toBe(null);

    // date

    // bst = new Plus.BST('date');
    // bst.insert([new Date('October 13, 2019'), new Date('October 14, 2020'), new Date('October 15, 2021')]);
    // solDateHelper(bst.getValuesTraversal(), ['Sun Oct 13 2019 00:00:00 GMT-0400 (EDT)',
    //                                          'Fri Oct 15 2021 00:00:00 GMT-0400 (EDT)',
    //                                          'Wed Oct 14 2020 00:00:00 GMT-0400 (EDT)']);
    // bst.remove(new Date('October 14, 2020'));
    // solDateHelper(bst.getValuesTraversal(), ['Fri Oct 15 2021 00:00:00 GMT-0400 (EDT)',
    //                                          'Sun Oct 13 2019 00:00:00 GMT-0400 (EDT)']);

    // bst.insert([new Date('November 15, 2020'),
    //             new Date('December 25, 2020'),
    //             new Date('March 25, 2020'),
    //             new Date('July 4, 2029')]);
    // bst.remove(new Date('October 15, 2021'));
    // solDateHelper(bst.getValuesTraversal(), ['Wed Mar 25 2020 00:00:00 GMT-0400 (EDT)',
    //                                          'Sun Oct 13 2019 00:00:00 GMT-0400 (EDT)',
    //                                          'Wed Jul 04 2029 00:00:00 GMT-0400 (EDT)',
    //                                          'Fri Dec 25 2020 00:00:00 GMT-0500 (EST)',
    //                                          'Sun Nov 15 2020 00:00:00 GMT-0500 (EST)']);

    // bst.remove(new Date('December 25, 2020'));
    // solDateHelper(bst.getValuesTraversal(), ['Wed Mar 25 2020 00:00:00 GMT-0400 (EDT)',
    //                                          'Sun Oct 13 2019 00:00:00 GMT-0400 (EDT)',
    //                                          'Wed Jul 04 2029 00:00:00 GMT-0400 (EDT)',
    //                                          'Sun Nov 15 2020 00:00:00 GMT-0500 (EST)']);
    // string

    bst = new Plus.BST('string');
    bst.insert(['coal', 'mining', 'SUCKS']);
    solHelper(bst.getValuesTraversal(), ['SUCKS', 'mining', 'coal']);

    bst.remove('coal');
    solHelper(bst.getValuesTraversal(), ['mining', 'SUCKS']);

    bst = new Plus.BST('string');
    bst.insert(['coal', 'mining', 'SUCKS', 'nooo', 'sandwich', 'sleePer']);
    solHelper(bst.getValuesTraversal(), ['SUCKS', 'mining', 'coal', 'sleePer', 'sandwich', 'nooo']);
    bst.remove('nooo');
    solHelper(bst.getValuesTraversal(), ['SUCKS', 'coal', 'sleePer', 'sandwich', 'mining']);
    bst.remove(['SUCKS', 'coal']);
    solHelper(bst.getValuesTraversal(), ['mining', 'sleePer', 'sandwich'])
    
    // object

    bst = new Plus.BST('object', {
      compareFunction: sortById,
      key: 'id',
      keyType: 'number'
    });

    bst.insert([{ id: 1 }, { id: 2 }, { id: 3 }]);
    bst.remove({ id: 2 });
    solObjHelper(bst.getValuesTraversal(), [3, 1]);

    bst.insert([{ id: 2 }, { id: 4 }]);
    solObjHelper(bst.getValuesTraversal(), [1, 4, 3, 2]);

    bst.remove({ id: 1 });
    solObjHelper(bst.getValuesTraversal(), [2, 4, 3]);

    bst.insert([{ id: 5 },
                { id: 6 },
                { id: 7 }]);
    bst.remove(3);
    solObjHelper(bst.getValuesTraversal(), [2, 4, 3, 7, 6, 5]);
  });

  it('should return values based on parameter', () => {
    let bst = new Plus.BST('number');
    bst.insert([1,2,3,4,5,6,7]);
    solHelper(bst.getValuesTraversal('in'), [1,2,3,4,5,6,7]);
    solHelper(bst.getValuesTraversal('pre'), [4,2,1,3,6,5,7]);

    // test for none
    bst.remove([1,2,3,4,5,6,7]);
    expect(bst.getValuesTraversal().length).toBe(0);

    // test for invalid type
    expect(bst.getValuesTraversal('no!')).toBe(0);
  });

  it('should return last value of node', () => {
    let node = new Plus.TreeNode(4);
    let bst = new Plus.BST('number');

    node.right = new Plus.TreeNode(5);
    node.right.right = new Plus.TreeNode(6);
    expect(bst.maxValue(node).val).toBe(6);
  });

  it('should return sought after node with given value', () => {
    let bst = new Plus.BST('number');

    expect(bst.search()).toBe(null);
    expect(bst.search(3)).toBe(null);

    // left case
    bst.insert([3, 1, 2]);
    expect(bst.search(1).val).toBe(1);

    // right case
    bst.insert(4);
    expect(bst.search(4).val).toBe(4);
    expect(bst.search(3).val).toBe(3);

    // root case
    expect(bst.search(2).val).toBe(2);
    expect(bst.search(2)).toBe(bst.root);

    bst = new Plus.BST('object', {
      key: 'id',
      keyType: 'number',
      compareFunction: sortById
    });

    bst.insert([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]);

    expect(bst.search({ id: 1 }).val.id).toBe(1);
  });

  it('should return boolean on if value is in tree', () => {
    let bst = new Plus.BST('number');

    expect(bst.contains()).toBe(false);
    expect(bst.contains(3)).toBe(false);

    // left side
    bst.insert([1, 2, 3, 4, 0]);

    expect(bst.contains(0)).toBe(true);
    expect(bst.contains(1)).toBe(true);

    // right side
    expect(bst.contains(3)).toBe(true);
    expect(bst.contains(4)).toBe(true);

    // root
    expect(bst.contains(2)).toBe(true);

    // object
    bst = new Plus.BST('object', {
      compareFunction: sortById,
      key: 'id',
      keyType: 'number'
    });

    bst.insert([{ id: 1 }, { id: 2 }]);
    expect(bst.contains({ id: 1 })).toBe(true);
    expect(bst.contains({ id: 3 })).toBe(false);
  });

  it('should return number of nodes', () => {
    let bst = new Plus.BST('date');

    expect(bst.length()).toBe(0);

    bst.insert([new Date('October 13, 2019'), new Date('October 14, 2020'), new Date('October 15, 2021')])
    expect(bst.length()).toBe(3);

    bst.insert(new Date('November 18, 2020'));
    expect(bst.length()).toBe(4);

    bst.remove([new Date('October 13, 2019'), new Date('October 14, 2020'), new Date('October 15, 2021')]);
    expect(bst.length()).toBe(1);

    bst.remove(new Date('November 18, 2020'));
    expect(bst.length()).toBe(0);

    bst = new Plus.BST('object', {
      compareFunction: sortById,
      key: 'id',
      keyType: 'number'
    });

    bst.insert([{ id: 1 }, { id: 2 }]);
    expect(bst.length()).toBe(2);
  });

  it('should get minimum value from root or given node', () => {
    bst = new Plus.BST('object', {
      compareFunction: sortById,
      key: 'id',
      keyType: 'number'
    });

    bst.insert([{ id: 1 }, { id: 2 }, { id: 3 }, { id: -1 }, { id: 0 }, { id: -2 }]);
    let n = bst.search({ id: 1 });

    expect(bst.minValue(n).val.id).toBe(1);
    expect(bst.minValue().val.id).toBe(-2);
  });

  it('should get maximum value from root or given node', () => {
    bst = new Plus.BST('object', {
      compareFunction: sortById,
      key: 'id',
      keyType: 'number'
    });

    bst.insert([{ id: 1 }, { id: 2 }, { id: 3 }, { id: -1 }, { id: 0 }, { id: -2 }]);
    let n = bst.search({ id: 1 });

    expect(bst.maxValue(n).val.id).toBe(1);
    expect(bst.maxValue().val.id).toBe(3);

    // string

    bst = new Plus.BST('string');
    bst.insert(['coal', 'mining', 'sucks', 'now', 'believe', 'me!', 'magnets!']);
    let b = bst.search('coal');

    expect(bst.maxValue().val).toBe('sucks');
    expect(bst.maxValue(b).val).toBe('me!');
    expect(bst.minValue(b).val).toBe('believe');
    expect(bst.minValue().val).toBe('believe');
  });

  it('should return true or false for tree being empty', () => {
    let bst = new Plus.BST('number');

    expect(bst.isEmpty()).toBe(true);

    bst.insert([1,2,3]);
    expect(bst.isEmpty()).toBe(false);

    bst.remove([1,2,3]);
    expect(bst.isEmpty()).toBe(true);

    // date

    bst = new Plus.BST('date');
    expect(bst.isEmpty()).toBe(true);

    bst.insert(new Date('October 13, 2012'));
    expect(bst.isEmpty()).toBe(false);

    bst.remove(new Date('October 13, 2012'));
    expect(bst.isEmpty()).toBe(true);

    // object

    bst = new Plus.BST('object', {
      compareFunction: sortById,
      key: 'id',
      keyType: 'number'
    });

    expect(bst.isEmpty()).toBe(true);
    bst.insert([{ id: 1 }, { id: 2 }, { id: 3 }, { id: -1 }, { id: 0 }, { id: -2 }]);
    
    expect(bst.isEmpty()).toBe(false);
    // string

    bst = new Plus.BST('string');
    expect(bst.isEmpty()).toBe(true);

    bst.insert('string');
    expect(bst.isEmpty()).toBe(false);

    bst.remove('string');
    expect(bst.isEmpty()).toBe(true);
  });
});