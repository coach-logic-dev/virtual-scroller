"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollableWindowContainer = exports["default"] = void 0;

var _DOM = require("./DOM");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollableContainer = /*#__PURE__*/function () {
  function ScrollableContainer(element) {
    _classCallCheck(this, ScrollableContainer);

    this.element = element;
  }

  _createClass(ScrollableContainer, [{
    key: "getScrollY",
    value: function getScrollY() {
      return this.element.scrollTop;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(scrollX, scrollY) {
      this.element.scrollTo(scrollX, scrollY);
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.element.offsetWidth;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      // if (!this.element && !precise) {
      // 	return getScreenHeight()
      // }
      return this.element.offsetHeight;
    }
  }, {
    key: "getContentHeight",
    value: function getContentHeight() {
      return this.element.scrollHeight;
    }
  }, {
    key: "getTopOffset",
    value: function getTopOffset(element) {
      var scrollableContainerTop = this.element.getBoundingClientRect().top;
      var scrollableContainerBorderTopWidth = this.element.clientTop;
      var top = element.getBoundingClientRect().top;
      return top - scrollableContainerTop + this.getScrollY() - scrollableContainerBorderTopWidth;
    } // isVisible() {
    // 	const { top, bottom } = this.element.getBoundingClientRect()
    // 	return bottom > 0 && top < getScreenHeight()
    // }

  }, {
    key: "addScrollListener",
    value: function addScrollListener(listener) {
      var _this = this;

      this.element.addEventListener('scroll', listener);
      return function () {
        return _this.element.removeEventListener('scroll', listener);
      };
    }
  }, {
    key: "onResize",
    value: function onResize(_onResize) {
      var _this2 = this;

      // Could somehow track DOM Element size.
      // For now, `scrollableContainer` is supposed to have constant width and height.
      // (unless window is resized).
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
      // https://web.dev/resize-observer/
      var unobserve;

      if (typeof ResizeObserver !== 'undefined') {
        var resizeObserver = new ResizeObserver(function (entries) {
          for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
            var entry = _step.value;
            // // If `entry.contentBoxSize` property is supported by the web browser.
            // if (entry.contentBoxSize) {
            // 	// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
            // 	const width = entry.contentBoxSize.inlineSize
            // 	const height = entry.contentBoxSize.blockSize
            // }
            return _onResize();
          }
        });
        resizeObserver.observe(this.element);

        unobserve = function unobserve() {
          return resizeObserver.unobserve(_this2.element);
        };
      } // I guess, if window is resized, `onResize()` will be triggered twice:
      // once for window resize, and once for the scrollable container resize.
      // But `onResize()` also has an internal check: if the size didn't change
      // then it's not run.


      var unlistenWindowResize = new ScrollableWindowContainer().onResize(_onResize);
      return function () {
        if (unobserve) {
          unobserve();
        }

        unlistenWindowResize();
      };
    }
  }]);

  return ScrollableContainer;
}();

exports["default"] = ScrollableContainer;

var ScrollableWindowContainer = /*#__PURE__*/function (_ScrollableContainer) {
  _inherits(ScrollableWindowContainer, _ScrollableContainer);

  var _super = _createSuper(ScrollableWindowContainer);

  function ScrollableWindowContainer() {
    _classCallCheck(this, ScrollableWindowContainer);

    return _super.call(this, window);
  }

  _createClass(ScrollableWindowContainer, [{
    key: "getScrollY",
    value: function getScrollY() {
      return (0, _DOM.getScrollY)();
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return (0, _DOM.getScreenWidth)();
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return (0, _DOM.getScreenHeight)();
    }
  }, {
    key: "getContentHeight",
    value: function getContentHeight() {
      return document.documentElement.scrollHeight;
    }
  }, {
    key: "getTopOffset",
    value: function getTopOffset(element) {
      var borderTopWidth = document.clientTop || document.body.clientTop || 0;
      return element.getBoundingClientRect().top + this.getScrollY() - borderTopWidth;
    }
  }, {
    key: "onResize",
    value: function onResize(_onResize2) {
      window.addEventListener('resize', _onResize2);
      return function () {
        return window.removeEventListener('resize', _onResize2);
      };
    } // isVisible() {
    // 	return true
    // }

  }]);

  return ScrollableWindowContainer;
}(ScrollableContainer);

exports.ScrollableWindowContainer = ScrollableWindowContainer;
//# sourceMappingURL=ScrollableContainer.js.map