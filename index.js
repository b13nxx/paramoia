/**
 * @typedef {Object} module:Paramoia.Types
 * @property Number {Number} Number type.
 * @property String {Number} String type.
 * @property Boolean {Number} Boolean type.
 * @property Array {Number} Array type.
 * @property Object {Number} Object type.
 * @property Null {Number} Null type.
 * @property Undefined {Number} Undefined type.
 */

/**
 * @typedef {Object} module:Paramoia.Include
 * @property Only {Number} Only condition.
 * @property Must {Number} Must condition.
 * @property MustOnly {Number} Must only condition.
 */

/**
 * Cure for being paranoia about parameters which are coming in every single wrong way to our functions.
 *
 * @module Paramoia
 */
module.exports = class Paramoia {
  static get Types () {
    return {
      Number: 1,
      String: 2,
      Boolean: 3,
      Array: 4,
      Object: 5,
      Null: 6,
      Undefined: 7
    }
  }

  static get Include () {
    return {
      Only: 1,
      Must: 2,
      MustOnly: 3
    }
  }

  /**
   * It checks if **param** includes **contain** or not.
   *
   * @param {(Array.<String>|Object.<String, *>)} param Parameter which will be checked.
   * @param {(Array.<String>|Object.<String, *>)} contain Parameter which will be checked against.
   * @param {Number} [condition=Paramoia.Include.Must] Parameter which indicates check condition:
   * `Only`: **param** *can include less* than **contain** but different.
   * `Must`: **param** *must include* **contain**.
   * `MustOnly`: **param** *must only include* **contain**.
   * You should use one of [Paramoia.Include.*]{@link module:Paramoia.Include}
   *
   * @returns {Boolean} Result of check.
   * - `TRUE`: Check condition met.
   * - `FALSE`: Check condition didn't meet.
   */
  static includes (param, contain, condition = Paramoia.Include.Must) {
    if (condition === Paramoia.Include.Only) {
      return this._contains(contain, param)
    } else if (condition === Paramoia.Include.Must) {
      return this._contains(param, contain)
    } else if (condition === Paramoia.Include.MustOnly) {
      return this._contains(param, contain) && this._contains(contain, param)
    }
    return false
  }

  /**
   * It checks if **param** equals *at least* one of **types** or not.
   *
   * @param {*} param Parameter which will be checked.
   * @param {(Array.<Number>|...Number)} types Parameter(s) which will be checked against. You should use [Paramoia.Types.*]{@link module:Paramoia.Types}
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** DOES equal *at least* one of **types**.
   * - `FALSE`: **param** DOES NOT equal any of **types**.
   */
  static equals (param, types) {
    if (!this._isArray(types)) {
      types = Object.values(arguments)
      types.shift()
    }
    for (let type of types) {
      if (this._is(param, type)) {
        return true
      }
    }
    return false
  }

  /**
   * It checks if **param** is one of **whitelist** or not.
   *
   * @param {*} param Parameter which will be checked.
   * @param {Array.<*>} whitelist Parameter which will be checked against.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS one of **whitelist**.
   * - `FALSE`: **param** IS NOT one of **whitelist**.
   */
  static valid (param, whitelist) {
    return this.has(whitelist, param)
  }

  /**
   * It checks if **param** is not one of **blacklist** or it is.
   *
   * @param {*} param Parameter which will be checked.
   * @param {Array.<*>} blacklist Parameter which will be checked against.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS NOT one of **blacklist**.
   * - `FALSE`: **param** IS one of **blacklist**.
   */
  static invalid (param, blacklist) {
    return !this.has(blacklist, param)
  }

  /**
   * It checks if **param** has **key** or not.
   *
   * @param {(Array.<String>|Object.<String, *>)} param Parameter which will be checked.
   * @param {String} key Parameter which will be checked against.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** HAS **key**.
   * - `FALSE`: **param** HAS NOT **key**.
   */
  static has (param, key) {
    if (this._isArray(param)) {
      return param.includes(key)
    } else if (this._isObject(param)) {
      return key in param
    }
    return false
  }

  /**
   * It checks if every value of **param** is one of **types** or not.
   *
   * @param {(Array.<*>|Object.<String, *>)} param Parameter which will be checked.
   * @param {(Array.<Number>|...Number)} types Parameter(s) which will be checked against. You should use [Paramoia.Types.*]{@link module:Paramoia.Types}
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** HAS values which are one of **types**.
   * - `FALSE`: **param** HAS values which are NOT one of **types**.
   */
  static values (param, types) {
    if (!this._isArray(types)) {
      types = Object.values(arguments)
      types.shift()
    }
    if (this._isObject(param)) {
      param = Object.values(param)
    }
    for (let item of param) {
      if (!this.equals(item, types)) {
        return false
      }
    }
    return true
  }

  /**
   * It checks if **param** is *empty* or not.
   *
   * @param {(String|Array.<*>|Object.<String, *>)} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *empty*.
   * - `FALSE`: **param** IS NOT *empty*.
   */
  static empty (param) {
    if (this._isString(param)) {
      return param === ''
    } else if (this._isArray(param)) {
      return param.length === 0
    } else if (this._isObject(param)) {
      return Object.keys(param).length === 0
    }
    return false
  }

  /**
   * It checks if **param** is not less than *threshold* or it is.
   *
   * @param {(Number|String|Array.<*>|Object.<String, *>)} param Parameter which will be checked.
   * @param {Number} threshold Parameter which will be checked against.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS NOT less than *threshold*.
   * - `FALSE`: **param** IS less than *threshold*.
   */
  static min (param, threshold) {
    if (this._isNumber(param)) {
      return param > threshold
    } else if (this._isString(param) || this._isArray(param)) {
      return param.length > threshold
    } else if (this._isObject(param)) {
      return Object.keys(param).length > threshold
    }
    return false
  }

  /**
   * It checks if **param** is not more than *threshold* or it is.
   *
   * @param {(Number|String|Array.<*>|Object.<String, *>)} param Parameter which will be checked.
   * @param {Number} threshold Parameter which will be checked against.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS NOT more than *threshold*.
   * - `FALSE`: **param** IS more than *threshold*.
   */
  static max (param, threshold) {
    if (this._isNumber(param)) {
      return param < threshold
    } else if (this._isString(param) || this._isArray(param)) {
      return param.length < threshold
    } else if (this._isObject(param)) {
      return Object.keys(param).length < threshold
    }
    return false
  }

  /**
   * It checks if **param** includes **contain** or not.
   *
   * @private
   * @param {(Array.<String>|Object.<String, *>)} param Parameter which will be checked.
   * @param {(Array.<String>|Object.<String, *>)} contain Parameter which will be checked against.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** DOES include **contain**.
   * - `FALSE`: **param** DOES NOT include **contain**.
   */
  static _contains (param, contain) {
    contain = this._isObject(contain) ? Object.keys(contain) : contain
    for (let item of contain) {
      if (!this.has(param, item)) {
        return false
      }
    }
    return true
  }

  /**
   * It checks if **param** equals **type** or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @param {Number} type Parameter which will be checked against. You should use one of [Paramoia.Types.*]{@link module:Paramoia.Types}
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** DOES equal **type**.
   * - `FALSE`: **param** DOES NOT equal **type**.
   */
  static _is (param, type) {
    if (type === this.Types.Number) {
      return this._isNumber(param)
    } else if (type === this.Types.String) {
      return this._isString(param)
    } else if (type === this.Types.Boolean) {
      return this._isBoolean(param)
    } else if (type === this.Types.Array) {
      return this._isArray(param)
    } else if (type === this.Types.Object) {
      return this._isObject(param)
    } else if (type === this.Types.Null) {
      return this._isNull(param)
    } else if (type === this.Types.Undefined) {
      return this._isUndefined(param)
    }
    return false
  }

  /**
   * It checks if **param** is *number* or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *number*.
   * - `FALSE`: **param** IS NOT *number*.
   */
  static _isNumber (param) {
    return typeof param === 'number'
  }

  /**
   * It checks if **param** is *string* or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *string*.
   * - `FALSE`: **param** IS NOT *string*.
   */
  static _isString (param) {
    return typeof param === 'string'
  }

  /**
   * It checks if **param** is *boolean* or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *boolean*.
   * - `FALSE`: **param** IS NOT *boolean*.
   */
  static _isBoolean (param) {
    return typeof param === 'boolean'
  }

  /**
   * It checks if **param** is *array* or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *array*.
   * - `FALSE`: **param** IS NOT *array*.
   */
  static _isArray (param) {
    return Array.isArray(param)
  }

  /**
   * It checks if **param** is *object* or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *object*.
   * - `FALSE`: **param** IS NOT *object*.
   */
  static _isObject (param) {
    return param !== null && typeof param === 'object' && !this._isArray(param)
  }

  /**
   * It checks if **param** is *null* or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *null*.
   * - `FALSE`: **param** IS NOT *null*.
   */
  static _isNull (param) {
    return param === null
  }

  /**
   * It checks if **param** is *undefined* or not.
   *
   * @private
   * @param {*} param Parameter which will be checked.
   * @returns {Boolean} Result of check.
   * - `TRUE`: **param** IS *undefined*.
   * - `FALSE`: **param** IS NOT *undefined*.
   */
  static _isUndefined (param) {
    return typeof param === 'undefined'
  }
}
