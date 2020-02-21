exports.isDate = (value) => {
  return Object.prototype.toString.call(value) === '[object Date]';
};

exports.isString = (value) => {
  return typeof value === 'string';
};

exports.isNumber = (value) => {
  return typeof value === 'number';
};

exports.isObject = function(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') { 
    return false; 
  }

  return typeof value === 'object' && !Array.isArray(value) && typeof value[this.key] === this.keyType;
};

exports.defaultComparison = function(childNodeValue, parentNodeValue) {
  return childNodeValue < parentNodeValue;
};

exports.defaultEqual = function(value, nodeValue, type, key) {
  if (type === 'number' || type === 'string') {
    return value === nodeValue;
  } else if (type === 'date') {
    return value.toString() === nodeValue.toString();
  } else {
    return JSON.stringify(value) === JSON.stringify(nodeValue);
  }
};
