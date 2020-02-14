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

  return typeof value === 'object' && !Array.isArray(value) && value[this.key] && typeof value[this.key] === this.keyType;
};

exports.defaultComparison = function(childNodeValue, parentNodeValue) {
  return childNodeValue < parentNodeValue;
};

