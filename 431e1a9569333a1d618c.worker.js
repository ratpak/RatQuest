/******/ ;(function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', {value: true})
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module.default
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s =
      './node_modules/babel-loader/lib/index.js!./client/utils/tester.worker.js')
  )
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './client/utils/createFunction.js':
      /*!****************************************!*\
  !*** ./client/utils/createFunction.js ***!
  \****************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.default = void 0

        /* eslint-disable no-new-func */
        var createFunction = function createFunction(args, body) {
          // Find and slice out function body
          try {
            var start

            for (var i = 0; i < body.length; i++) {
              if (body[i] === '/') {
                if (body.slice(i, i + 6) === '//**//') start = i + 6
              }
            }

            body = body.slice(start, body.length - 2)
            var wrapper = {}
            console.log(args, 'args')

            wrapper.stuff = function(thing) {
              return ''.concat(thing, ' got printed')
            }

            wrapper.createdFunc = new Function(
              args.join(', '),
              'arg3=this.stuff',
              body
            )
            return wrapper
          } catch (e) {
            console.log('weird error: ', e.toString())
          }
        }

        var _default = createFunction
        exports.default = _default

        /***/
      },

    /***/ './client/utils/testFunction.js':
      /*!**************************************!*\
  !*** ./client/utils/testFunction.js ***!
  \**************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.default = void 0

        function _toConsumableArray(arr) {
          return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _nonIterableSpread()
          )
        }

        function _nonIterableSpread() {
          throw new TypeError('Invalid attempt to spread non-iterable instance')
        }

        function _iterableToArray(iter) {
          if (
            Symbol.iterator in Object(iter) ||
            Object.prototype.toString.call(iter) === '[object Arguments]'
          )
            return Array.from(iter)
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i]
            }
            return arr2
          }
        }

        var testFunction = function testFunction(func, input, output) {
          var result = ''
          console.log('arguments', func, input, output)

          try {
            for (var i = 0; i < input.length; i++) {
              console.log('created function wrapper', func)
              var theirResult = func.createdFunc.apply(
                func,
                _toConsumableArray(input[i])
              )
              if (theirResult !== output[i])
                result += 'expected: '
                  .concat(output[i], ' actual: ')
                  .concat(theirResult, ' for inputs: ')
                  .concat(input[i].join(', '), '\n')
            }

            if (result === '') result = 'success'
          } catch (e) {
            result = e.toString()
          }

          return result
        }

        var _default = testFunction
        exports.default = _default

        /***/
      },

    /***/ './node_modules/babel-loader/lib/index.js!./client/utils/tester.worker.js':
      /*!***********************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./client/utils/tester.worker.js ***!
  \***********************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var _testFunction = _interopRequireDefault(
          __webpack_require__(
            /*! ./testFunction */ './client/utils/testFunction.js'
          )
        )

        var _createFunction = _interopRequireDefault(
          __webpack_require__(
            /*! ./createFunction */ './client/utils/createFunction.js'
          )
        )

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {default: obj}
        }

        // Worker.js
        // const _ = require('lodash')
        // const obj = {foo: 'foo'}
        // _.has(obj, 'foo')
        // // Post data to parent thread
        // // Respond to message from parent thread
        console.log('hello from utils worker.js') // Every time submit is clicked, a message is sent from /createAndTest which will trigger the whole process of creating, testing, and returing the result of a function.

        self.addEventListener('message', function(event) {
          var data = event.data
          var args = data.args,
            body = data.body,
            inputs = data.inputs,
            outputs = data.outputs
          console.log(
            'received from master in utils',
            args,
            body,
            inputs,
            outputs
          )
          self.postMessage(data) // self.postMessage(data)
        })

        /***/
      }

    /******/
  }
)
//# sourceMappingURL=431e1a9569333a1d618c.worker.js.map
