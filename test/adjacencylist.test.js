const Plus = require('../app.js');

describe('Graph', () => {
  // add option for two or one way connected
  it('should be initialized with a string', () => {
    expect(() => {
      new Plus.Graph();
    }).toThrow('Data type must be: string, number, object. Direction must be one or two.');

    expect(() => {
      new Plus.Graph('string', 'de');
    }).toThrow('Data type must be: string, number, object. Direction must be one or two.');

    expect(() => {
      new Plus.Graph('string', undefined);
    }).toThrow('Data type must be: string, number, object. Direction must be one or two.');

    expect(() => {
      new Plus.Graph('random', undefined);
    }).toThrow('Data type must be: string, number, object. Direction must be one or two.');

    let g = new Plus.Graph('string', 'one');
    expect(g).toEqual({
      data: {},
      type: 'string',
      size: 0,
      way: 'one'
    });

    g = new Plus.Graph('number', 'two');
    expect(g).toEqual({
      data: {},
      type: 'number',
      size: 0,
      way: 'two'
    });

    g = new Plus.Graph('object', 'one');
    expect(g).toEqual({
      data: {},
      type: 'object',
      size: 0,
      way: 'one'
    });
  });

  it('should add keys as values to data', () => {
    // number

    let g = new Plus.Graph('number', 'one');

    expect(g.addVertices(1)).toBe(g);
    expect(g.data['1']).toEqual([]);

    expect(() => {
      g.addVertices(1);
    }).toThrow('Vertex already exists in graph.');

    g.addVertices(2, 3, 4);
    expect(g.data['2']).toEqual([]);
    expect(g.data['3']).toEqual([]);
    expect(g.data['4']).toEqual([]);

    // object

    g = new Plus.Graph('object', 'one');

    g.addVertices({ id: 1 });
    expect(g.data[JSON.stringify({ id: 1 })]).toEqual([]);

    expect(() => {
      g.addVertices({ id: 1 });
    }).toThrow('Vertex already exists in graph.');

    g.addVertices({ id: 2 }, { id: 3 });
    expect(g.data[JSON.stringify({ id: 2 })]).toEqual([]);
    expect(g.data[JSON.stringify({ id: 3 })]).toEqual([]); 

    // string

    g = new Plus.Graph('string', 'one');

    g.addVertices('first');
    expect(g.data.first).toEqual([]);

    g.addVertices('second', 'third');
    expect(g.data.second).toEqual([]);
    expect(g.data.third).toEqual([]);

    // no data passed

    expect(g.addVertices()).toBe(g); 
  });

  it('should throw error for adding the wrong type of data', () => {
    // string

    let g = new Plus.Graph('string', 'one');

    expect(() => {
      g.addVertices(1);
    }).toThrow('Incorrect data type for this graph.');

    expect(() => {
      g.addVertices('first', 'second', { id: 1 });
    }).toThrow('Incorrect data type for this graph.');

    // number

    g = new Plus.Graph('number', 'one');

    expect(() => {
      g.addVertices({ id: 1 });
    }).toThrow('Incorrect data type for this graph.');


    expect(() => {
      g.addVertices(1, 'string');
    }).toThrow('Incorrect data type for this graph.');

    // object

    g = new Plus.Graph('object', 'one');

    expect(() => {
      g.addVertices('string');
    }).toThrow('Incorrect data type for this graph.');

    expect(() => {
      g.addVertices(new Date());
    }).toThrow('Incorrect data type for this graph.');

    expect(() => {
      g.addVertices({ id: 1 }, 1);
    }).toThrow('Incorrect data type for this graph.');
  });

  it('should link keys to specific values in array', () => {
    // number

    let g = new Plus.Graph('number', 'two');
    g.addVertices(2, 3, 4, 5, 6, 7, 8);

    expect(() => {
      g.addEdges(2, 3, 4, 5);
    }).toThrow('Must have two arguments: vertex and edges array.');

    expect(() => {
      g.addEdges('string', [2]);
    }).toThrow('Must have two arguments: vertex and edges array.');

    expect(g.addEdges(2, [3, 4, 5])).toBe(g);
    expect(g.data[2]).toEqual([3, 4, 5]);

    // check that ALL edges were added to relevant vertices
    expect(g.data[3]).toEqual([2]);
    expect(g.data[4]).toEqual([2]);
    expect(g.data[5]).toEqual([2]);

    expect(() => {
      g.addEdges(2, [3]);
    }).toThrow('Vertex already exists as edge for passed vertex.');

    // object

    g = new Plus.Graph('object', 'one');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });

    expect(() => {
      g.addEdges({ id: 1 }, [{ id: 0 }]);
    }).toThrow('Vertex in edges array not a valid vertex.');

    expect(() => {
      g.addEdges({ id: 1 }, [{ id: 1 }]);
    }).toThrow('Vertex in edges array cannot be the first argument.');

    expect(g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }])).toBe(g);
    expect(g.data[JSON.stringify({ id : 1 })]).toEqual([{ id: 2 }, { id: 3 }, { id: 4 }]);

    expect(() => {
      g.addEdges({ id: 1 }, [{ id: 2 }]);
    }).toThrow('Vertex already exists as edge for passed vertex.');
    
    // string

    g = new Plus.Graph('string', 'one');
    g.addVertices('first');
    g.addVertices('second', 'third', 'four', 'fifth');

    expect(() => {
      g.addEdges('first', ['k']);
    }).toThrow('Vertex in edges array not a valid vertex.');

    expect(() => {
      g.addEdges('first', ['first']);
    }).toThrow('Vertex in edges array cannot be the first argument.');

    expect(g.addEdges('first', ['third', 'four'])).toBe(g);
    expect(g.data.first).toEqual(['third', 'four']);

    expect(() => {
      g.addEdges('first', ['third']);
    }).toThrow('Vertex already exists as edge for passed vertex.');
  });

  it('should unlink keys with specific values in array', () => {
    // number

    let g = new Plus.Graph('number', 'two');
    g.addVertices(2, 3, 4, 5, 6, 7, 8);
    g.addEdges(2, [3, 4, 5]);

    g.removeEdges(2, [3, 4, 5, 6]);
    expect(g.data['2']).toEqual([]);
    expect(g.data['3']).toEqual([]);
    expect(g.data['4']).toEqual([]);
    expect(g.data['5']).toEqual([]);

    // object

    g = new Plus.Graph('object', 'one');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]);

    g.removeEdges({ id: 1 }, [{ id: 2 }]);
    g.removeEdges({ id: 1 }, [{ id: 3 }, { id: 4 }]);
    expect(g.data[JSON.stringify({ id: 1 })]).toEqual([]);

    // string

    g = new Plus.Graph('string', 'one');
    g.addVertices('first');
    g.addVertices('second', 'third', 'four', 'fifth');
    g.addEdges('first', ['third', 'four']);

    expect(() => { 
      g.removeEdges();
    }).toThrow('Must have two arguments: vertex and edges array.');

    expect(() => { 
      g.removeEdges('first');
    }).toThrow('Must have two arguments: vertex and edges array.');

    expect(() => { 
      g.removeEdges('first', 'one');
    }).toThrow('Must have two arguments: vertex and edges array.');

    expect(g.removeEdges('first', ['second'])).toBe(g);
    g.removeEdges('first', ['third']);
    expect(g.data.first).toEqual(['four']);
  });

  it('should get all edges for specific key', () => {
    // number

    let g = new Plus.Graph('number', 'one');
    g.addVertices(2, 3, 4, 5, 6, 7, 8);
    g.addEdges(2, [3, 4, 5]);

    expect(g.getEdges(2)).toEqual([3, 4, 5]);
    expect(g.getEdges(3)).toEqual([]);
    expect(() => {
      g.getEdges(1);
    }).toThrow('Vertex does not exist.');

    // two way num

    g = new Plus.Graph('number', 'two');
    g.addVertices(2, 3, 4, 5, 6, 7, 8);
    g.addEdges(2, [3, 4, 5, 6, 7]);

    expect(g.getEdges(2)).toEqual([3, 4, 5, 6, 7]);
    expect(g.getEdges(3)).toEqual([2]);

    g.removeEdges(5, [2]);
    expect(g.getEdges(5)).toEqual([]);
    expect(g.getEdges(2)).toEqual([3, 4, 6, 7]);

    // object

    g = new Plus.Graph('object', 'one');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]);

    expect(g.getEdges({ id: 1 })).toEqual([{ id: 2 }, { id: 3 }, { id: 4 }]);
    expect(g.getEdges({ id: 2 })).toEqual([]);
    expect(() => {
      g.getEdges({ id: -1 });
    }).toThrow('Vertex does not exist.'); 

    // string

    g = new Plus.Graph('string', 'one');
    g.addVertices('first');
    g.addVertices('second', 'third', 'four', 'fifth');
    g.addEdges('first', ['third', 'four', 'fifth']);

    expect(g.getEdges('first')).toEqual(['third', 'four', 'fifth']);
    expect(g.getEdges('second')).toEqual([]);
    expect(g.getEdges()).toEqual(null);
    expect(() => {
      g.getEdges('dd');
    }).toThrow('Vertex does not exist.');
  });

  it('should return size of data', () => {
    let g = new Plus.Graph('object', 'one');
    expect(g.getSize()).toBe(0);

    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    expect(g.getSize()).toBe(5);
  });

  it('should return number of edges for given value', () => {
    let g = new Plus.Graph('object', 'one');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]);

    expect(g.numberOfEdges({ id: 1 })).toBe(3);
    expect(g.numberOfEdges({ id: 2 })).toBe(0);
    expect(g.numberOfEdges({ id: 3 })).toBe(0);

    g.removeEdges({ id: 1 }, [{ id: 2 }]);
    expect(g.numberOfEdges({ id: 1 })).toBe(2);
    expect(g.numberOfEdges({ id: 2 })).toBe(0);
    expect(g.numberOfEdges({ id: -1 })).toBe(null);

    // vertex doesnt exist
    expect(g.numberOfEdges({ id: 0 })).toBe(null);

    // empty arg
    expect(g.numberOfEdges()).toBe(null);

    // two way
    g = new Plus.Graph('object', 'two');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]); 
    g.addEdges({ id: 4 }, [{ id: 2 }, { id: 5 }]);

    expect(g.numberOfEdges({ id: 1 })).toBe(3);
    expect(g.numberOfEdges({ id: 2 })).toBe(2);
    expect(g.numberOfEdges({ id: 3 })).toBe(1);
    expect(g.numberOfEdges({ id: 4 })).toBe(3);

    g.removeEdges({ id: 4 }, [{ id: 1 }]);
    expect(g.numberOfEdges({ id: 1 })).toBe(2);
    expect(g.numberOfEdges({ id: 4 })).toBe(2);

    g.removeEdges({ id: 2 }, [{ id: 1 }]);
    expect(g.numberOfEdges({ id: 1 })).toBe(1);
    expect(g.numberOfEdges({ id: 2 })).toBe(1);
  });

  it('should return true || false if first param has second as edge', () => {
    let g = new Plus.Graph('object', 'one');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]);

    expect(g.hasEdge({ id: 1 }, { id: 2 })).toBe(true);
    expect(g.hasEdge({ id: 1 }, { id: 5 })).toBe(false);
    expect(g.hasEdge({ id: 2 }, { id: 1 })).toBe(false);

    expect(() => { 
      g.hasEdge({ id: 1 }, { id: -11 })
    }).toThrow('Second vertex does not exist.');
    expect(() => { 
      g.hasEdge({ id: 111 }, { id: 2 })
    }).toThrow('First vertex does not exist.');

    g = new Plus.Graph('object', 'two');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]);

    expect(g.hasEdge({ id: 1 }, { id: 2 })).toBe(true);
    expect(g.hasEdge({ id: 1 }, { id: 5 })).toBe(false);
    expect(g.hasEdge({ id: 2 }, { id: 1 })).toBe(true);
    expect(g.hasEdge({ id: 3 }, { id: 1 })).toBe(true);
    expect(g.hasEdge({ id: 4 }, { id: 1 })).toBe(true);       
  });

  it('should remove vertex and remove all edges to it', () => {
    // one way, object
    let g = new Plus.Graph('object', 'two');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]);

    expect(g.removeVertex({ id: 1 })).toEqual({ id: 1 });
    expect(g.data[JSON.stringify({ id: 1 })]).toBe(null);
    expect(g.data[JSON.stringify({ id: 2 })]).toEqual([]);
    expect(g.data[JSON.stringify({ id: 3 })]).toEqual([]);

    // two way, object
    g = new Plus.Graph('object', 'one');
    g.addVertices({ id: 1 });
    g.addVertices({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 });
    g.addEdges({ id: 1 }, [{ id: 2 }, { id: 3 }, { id: 4 }]);
    g.addEdges({ id: 2 }, [{ id: 3 }, { id: 1 }]);

    expect(g.removeVertex({ id: 1 })).toEqual({ id: 1 });
    expect(g.data[JSON.stringify({ id: 1 })]).toBe(null);
    expect(g.data[JSON.stringify({ id: 2 })]).toEqual([{ id: 3 }]);
    expect(g.data[JSON.stringify({ id: 3 })]).toEqual([]);

    // empty args
    expect(g.removeVertex()).toBe(null);

    // former vertex
    expect(g.removeVertex({ id: 1 })).toBe(null);

    // non existent vertex
    expect(g.removeVertex({ id: 1010 })).toBe(null);
  });

  it('should return an array of subarrays with edges', () => {
    let g = new Plus.Graph('number', 'one');
    g.addVertices(2, 3, 4, 5, 6, 7, 8);
    g.addEdges(2, [4, 5, 6]);

    expect(g.edgesToArray(2)).toEqual([[2, 4], [2, 5], [2, 6]]);
    expect(g.edgesToArray(3)).toEqual([]);
    expect(g.edgesToArray(4)).toEqual([]);

    g.removeEdges(2, [4]);
    expect(g.edgesToArray(2)).toEqual([[2, 5], [2, 6]]);

    g.removeEdges(2, [7]);
    expect(g.edgesToArray(2)).toEqual([[2, 5], [2, 6]]);

    // two way

    g = new Plus.Graph('number', 'two');
    g.addVertices(2, 3, 4, 5, 6, 7, 8);
    g.addEdges(2, [4, 5, 6]);

    expect(g.edgesToArray(2)).toEqual([[2, 4], [2, 5], [2, 6]]);
    expect(g.edgesToArray(3)).toEqual([]);
    expect(g.edgesToArray(4)).toEqual([[4, 2]]);
    expect(g.edgesToArray(5)).toEqual([[5, 2]]);

    g.removeEdges(5, [2]);

    expect(g.edgesToArray(2)).toEqual([[2, 4], [2, 6]]);
    expect(g.edgesToArray(3)).toEqual([]);
    expect(g.edgesToArray(4)).toEqual([[4, 2]]);
    expect(g.edgesToArray(5)).toEqual([]);

    // non existent vertex

    expect(() => { 
      g.edgesToArray('string')
    }).toThrow('Vertex does not exist.');

    // empty arg

    expect(g.edgesToArray()).toEqual(null);
  });

  it('should handle bigger cases', () => {
    let g = new Plus.Graph('number', 'two');

    g.addVertices(2, 3, 4, 5, 6, 7, 8, 9, 10);
    g.addEdges(2, [3, 4, 5]);
    g.addEdges(3, [4, 6, 8]);
    g.addEdges(9, [2, 3, 8]);
    g.addEdges(6, [5, 7, 10]);

    expect(g.getSize()).toBe(9);
    expect(g.getEdges(2)).toEqual([3, 4, 5, 9]);
    expect(g.getEdges(3)).toEqual([2, 4, 6, 8, 9]);
    expect(g.getEdges(4)).toEqual([2, 3]);
    expect(g.getEdges(5)).toEqual([2, 6]);
    expect(g.getEdges(8)).toEqual([3, 9]);

    g.removeVertex(9);

    expect(g.getSize()).toBe(8);
    expect(g.getEdges(2)).toEqual([3, 4, 5]);
    expect(g.getEdges(3)).toEqual([2, 4, 6, 8]);
    expect(g.getEdges(4)).toEqual([2, 3]);
    expect(g.getEdges(5)).toEqual([2, 6]);
    expect(g.getEdges(8)).toEqual([3]);

    g.removeEdges(2, [4, 5]);

    expect(g.getEdges(2)).toEqual([3]);
    expect(g.getEdges(3)).toEqual([2, 4, 6, 8]);
    expect(g.getEdges(4)).toEqual([3]);
    expect(g.getEdges(5)).toEqual([6]);
    expect(g.getEdges(8)).toEqual([3]);

    g.removeVertex(3);

    expect(g.getEdges(2)).toEqual([]);
    expect(g.getEdges(4)).toEqual([]);
    expect(g.getEdges(5)).toEqual([6]);
    expect(g.getEdges(8)).toEqual([]);
    expect(() => {
      g.getEdges(3);
    }).toThrow('Vertex does not exist.');  
  });

  it('should return true || false if vertex exists', () => {
    let g = new Plus.Graph('number', 'one');
    g.addVertices(1, 2, 3);

    expect(g.hasVertex(1)).toBe(true);
    expect(g.hasVertex(0)).toBe(false);
    expect(g.hasVertex()).toBe(false);

    g = new Plus.Graph('object', 'two');
    g.addVertices({ id: 0 });

    expect(g.hasVertex({ id: 1 })).toBe(false);
    expect(g.hasVertex({ id: 0 })).toBe(true);
  });
});