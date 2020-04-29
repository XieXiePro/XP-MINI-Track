/*  **************************************  五谷数据类型检验通用方法 start  ****************************************** */

// 说明：不出错的数据类型检验

/*  **************************************  五谷数据类型检验通用方法 end  ****************************************** */

const dataType = {
  isNull (val) { return val === null },
  isUndefined (val) { return val === undefined },
  isNumber (val) { return Object.prototype.toString.call(val) == '[object Number]' },
  isString (val) { return Object.prototype.toString.call(val) == '[object String]' },
  isBoolean (val) { return Object.prototype.toString.call(val) == '[object Boolean]' },
  isSymbol (val) { return Object.prototype.toString.call(val) == '[object Symbol]' },
  isArray (val) { return Object.prototype.toString.call(val) == '[object Array]' },
  isFunction (val) { return Object.prototype.toString.call(val) == '[object Function]' },
  isObject (val) {
    return (Object.prototype.toString.call(val) == '[object Object]' ||
      // if it isn't a primitive value, then it is a common object
      (
        !dataType.isNumber(val) &&
        !dataType.isString(val) &&
        !dataType.isBoolean(val) &&
        !dataType.isArray(val) &&
        !dataType.isNull(val) &&
        !dataType.isFunction(val) &&
        !dataType.isUndefined(val) &&
        !dataType.isSymbol(val)
      )
    )
  },
  isEmptyArray:function(array){
    if (!dataType.isArray(array)) {
      return false;
    }
    return array.length > 0 ? false : true;
  },
  isEmptyObject:function(obj){
    if (!dataType.isObject(obj)) {
      return false;
    }
    for (let key in obj) {
      return false;
    }
    return true;
  }
}

export default dataType