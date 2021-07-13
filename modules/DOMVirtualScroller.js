function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import VirtualScroller from './VirtualScroller';
import log from './log';
import { px } from './utility';

var DOMVirtualScroller = /*#__PURE__*/function () {
  function DOMVirtualScroller(element, _items, renderItem) {
    var _this = this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, DOMVirtualScroller);

    _defineProperty(this, "onStateChange", function (state, prevState) {
      var items = state.items,
          firstShownItemIndex = state.firstShownItemIndex,
          lastShownItemIndex = state.lastShownItemIndex,
          beforeItemsHeight = state.beforeItemsHeight,
          afterItemsHeight = state.afterItemsHeight;
      log('~ On state change ~');
      log('Previous state', prevState);
      log('New state', state); // Set container padding top and bottom.
      // Work around `<tbody/>` not being able to have `padding`.
      // https://gitlab.com/catamphetamine/virtual-scroller/-/issues/1
      // `this.virtualScroller` hasn't been initialized yet at this stage,
      // so using `this.tbody` instead of `this.virtualScroller.tbody`.

      if (!_this.tbody) {
        _this.container.style.paddingTop = px(beforeItemsHeight);
        _this.container.style.paddingBottom = px(afterItemsHeight);
      } // Perform an intelligent "diff" re-render if the `items` are the same.


      var diffRender = prevState && items === prevState.items && items.length > 0; // Remove no longer visible items from the DOM.

      if (diffRender) {
        log('Incremental rerender'); // Decrement instead of increment here because
        // `this.container.removeChild()` changes indexes.

        var _i = prevState.lastShownItemIndex;

        while (_i >= prevState.firstShownItemIndex) {
          if (_i >= firstShownItemIndex && _i <= lastShownItemIndex) {// The item is still visible.
          } else {
            log('Remove item index', _i); // The item is no longer visible. Remove it.

            _this.unmountItem(_this.container.childNodes[_i - prevState.firstShownItemIndex]);
          }

          _i--;
        }
      } else {
        log('Rerender from scratch');

        while (_this.container.firstChild) {
          _this.unmountItem(_this.container.firstChild);
        }
      } // Add newly visible items to the DOM.


      var shouldPrependItems = diffRender;
      var prependBeforeItemElement = shouldPrependItems && _this.container.firstChild;
      var i = firstShownItemIndex;

      while (i <= lastShownItemIndex) {
        if (diffRender && i >= prevState.firstShownItemIndex && i <= prevState.lastShownItemIndex) {
          // The item is already being rendered.
          // Next items will be appended rather than prepended.
          if (shouldPrependItems) {
            shouldPrependItems = false;
          }
        } else {
          var item = _this.renderItem(items[i]);

          if (shouldPrependItems) {
            log('Prepend item index', i); // Append `item` to `this.container` before the retained items.

            _this.container.insertBefore(item, prependBeforeItemElement);
          } else {
            log('Append item index', i); // Append `item` to `this.container`.

            _this.container.appendChild(item);
          }
        }

        i++;
      }
    });

    _defineProperty(this, "onUnmount", function () {
      console.warn('[virtual-scroller] `.onUnmount()` instance method name is deprecated, use `.stop()` instance method name instead.');

      _this.stop();
    });

    _defineProperty(this, "destroy", function () {
      console.warn('[virtual-scroller] `.destroy()` instance method name is deprecated, use `.stop()` instance method name instead.');

      _this.stop();
    });

    _defineProperty(this, "stop", function () {
      _this.virtualScroller.stop();
    });

    this.container = element;
    this.renderItem = renderItem;

    var onMount = options.onMount,
        onItemUnmount = options.onItemUnmount,
        restOptions = _objectWithoutProperties(options, ["onMount", "onItemUnmount"]);

    this.onItemUnmount = onItemUnmount;
    this.tbody = this.container.tagName === 'TBODY';
    this.virtualScroller = new VirtualScroller(function () {
      return _this.container;
    }, _items, _objectSpread(_objectSpread({}, restOptions), {}, {
      tbody: this.tbody,
      onStateChange: this.onStateChange
    })); // `onMount()` option is deprecated due to no longer being used.
    // If someone thinks there's a valid use case for it, create an issue.

    if (onMount) {
      onMount();
    }

    this.virtualScroller.listen();
  }

  _createClass(DOMVirtualScroller, [{
    key: "unmountItem",
    value: function unmountItem(itemElement) {
      this.container.removeChild(itemElement);

      if (this.onItemUnmount) {
        this.onItemUnmount(itemElement);
      }
    }
  }, {
    key: "onItemHeightChange",
    value: function onItemHeightChange(i) {
      this.virtualScroller.onItemHeightChange(i);
    }
    /**
     * @deprecated
     * `.updateItems()` has been renamed to `.setItems()`.
     */

  }, {
    key: "updateItems",
    value: function updateItems(newItems, options) {
      this.setItems(newItems, options);
    }
  }, {
    key: "setItems",
    value: function setItems(newItems, options) {
      this.virtualScroller.setItems(newItems, options);
    }
  }, {
    key: "getItemCoordinates",
    value: function getItemCoordinates(i) {
      return this.virtualScroller.getItemCoordinates(i);
    }
  }]);

  return DOMVirtualScroller;
}();

export { DOMVirtualScroller as default };
//# sourceMappingURL=DOMVirtualScroller.js.map