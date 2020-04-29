/**
 * 数据类型判断
 */
const DataType = {
  'NaN'(variable) {
    return Number.isNaN(variable)
  },

  'undefined'(variable) {
    return typeof variable === 'undefined'
  },
  'null'(variable) {
    return typeof variable === null
  },
  'string'(variable) {
    return typeof variable === 'string'
  },
  'boolean'(variable) {
    return typeof variable === 'boolean'
  },
  'number'(variable) {
    return typeof variable === 'number' && !this.NaN(variable)
  },
  'symbol'(variable) {
    return typeof variable === 'symbol'
  },

  'function'(variable) {
    return typeof variable === 'function'
  },
  'array'(variable) {
    return typeof variable === 'object' && typeof variable.length === 'number' && variable instanceof Array
  },
  'object'(variable) {
    return typeof variable === 'object' && variable.toString() === '[object Object]' && variable instanceof Object
  },
}

function assert(variable, type) {
  try {
    return DataType[type.toLowerCase()](variable)
  } catch (error) {
    throw new TypeError(error)
    return false
  }
}

export default assert