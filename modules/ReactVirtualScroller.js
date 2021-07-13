function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import PropTypes from "prop-types";
import VirtualScroller, { getItemsDiff } from "./VirtualScroller";
import { px } from "./utility";
import shallowEqual from "./shallowEqual"; // `PropTypes.elementType` is available in some version of `prop-types`.
// https://github.com/facebook/prop-types/issues/200

var elementType = PropTypes.elementType || PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]);

var ReactVirtualScroller = /*#__PURE__*/function (_React$Component) {
  _inherits(ReactVirtualScroller, _React$Component);

  var _super = _createSuper(ReactVirtualScroller);

  // `this.state` is already reserved for `virtual-scroller`.
  // static getDerivedStateFromProps(props, state) {
  // 	return {
  // 		prevProps: {
  // 			items: props.items
  // 		}
  // 	}
  // }
  // Handler function caches.
  // Just so that the props passed to `itemComponent`
  // are not changed on every `.render()` and so
  // `itemComponent` won't re-render if it's a `PureComponent`.
  // Item refs for `.renderItem(i)`.
  // List items are rendered with `key`s
  // so that React doesn't reuse `itemComponent`s
  // in cases when `items` are changed.
  function ReactVirtualScroller(props) {
    var _this;

    _classCallCheck(this, ReactVirtualScroller);

    _this = _super.call(this, props); // `this.previousItemsProperty` is only used for comparing
    // `previousItems` with `newItems` inside `render()`.

    _defineProperty(_assertThisInitialized(_this), "container", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "onItemStateChange", new Array(_this.props.items.length));

    _defineProperty(_assertThisInitialized(_this), "onItemHeightChange", new Array(_this.props.items.length));

    _defineProperty(_assertThisInitialized(_this), "itemRefs", new Array(_this.props.items.length));

    _defineProperty(_assertThisInitialized(_this), "uniquePrefixes", []);

    _defineProperty(_assertThisInitialized(_this), "updateLayout", function () {
      return _this.virtualScroller.updateLayout();
    });

    _defineProperty(_assertThisInitialized(_this), "layout", function () {
      return _this.updateLayout();
    });

    _defineProperty(_assertThisInitialized(_this), "onItemInitialRender", function () {
      var onItemInitialRender = _this.props.onItemInitialRender;

      if (onItemInitialRender) {
        onItemInitialRender.apply(void 0, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onItemFirstRender", function () {
      var onItemFirstRender = _this.props.onItemFirstRender;

      if (onItemFirstRender) {
        onItemFirstRender.apply(void 0, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "shouldUpdateLayoutOnWindowResize", function () {
      var shouldUpdateLayoutOnWindowResize = _this.props.shouldUpdateLayoutOnWindowResize;

      if (shouldUpdateLayoutOnWindowResize) {
        return shouldUpdateLayoutOnWindowResize.apply(void 0, arguments);
      }
    });

    _this.previousItemsProperty = props.items; // Generate unique `key` prefix for list item components.

    _this.generateUniquePrefix(); // Create `VirtualScroller` instance.


    _this.createVirtualScroller();

    return _this;
  }

  _createClass(ReactVirtualScroller, [{
    key: "createVirtualScroller",
    value: function createVirtualScroller() {
      var _this2 = this;

      var _this$props = this.props,
          AsComponent = _this$props.as,
          items = _this$props.items,
          initialState = _this$props.initialState,
          initialCustomState = _this$props.initialCustomState,
          onStateChange = _this$props.onStateChange,
          estimatedItemHeight = _this$props.estimatedItemHeight,
          preserveScrollPositionOfTheBottomOfTheListOnMount = _this$props.preserveScrollPositionOfTheBottomOfTheListOnMount,
          preserveScrollPositionAtBottomOnMount = _this$props.preserveScrollPositionAtBottomOnMount,
          measureItemsBatchSize = _this$props.measureItemsBatchSize,
          scrollableContainer = _this$props.scrollableContainer,
          getScrollableContainer = _this$props.getScrollableContainer,
          bypass = _this$props.bypass; // Create `virtual-scroller` instance.

      this.virtualScroller = new VirtualScroller(function () {
        return _this2.container.current;
      }, items, {
        estimatedItemHeight: estimatedItemHeight,
        bypass: bypass,
        // bypassBatchSize,
        onItemInitialRender: this.onItemInitialRender,
        // `onItemFirstRender(i)` is deprecated, use `onItemInitialRender(item)` instead.
        onItemFirstRender: this.onItemFirstRender,
        preserveScrollPositionOfTheBottomOfTheListOnMount: preserveScrollPositionOfTheBottomOfTheListOnMount,
        // `preserveScrollPositionAtBottomOnMount` property name is deprecated,
        // use `preserveScrollPositionOfTheBottomOfTheListOnMount` property instead.
        preserveScrollPositionAtBottomOnMount: preserveScrollPositionAtBottomOnMount,
        shouldUpdateLayoutOnWindowResize: this.shouldUpdateLayoutOnWindowResize,
        measureItemsBatchSize: measureItemsBatchSize,
        scrollableContainer: scrollableContainer,
        // `getScrollableContainer` property is deprecated.
        // Use `scrollableContainer` instead.
        getScrollableContainer: getScrollableContainer,
        tbody: AsComponent === "tbody",
        state: initialState,
        customState: initialCustomState,
        onStateChange: onStateChange,
        getState: function getState() {
          return _this2.state;
        },
        setState: function setState(newState, _ref) {
          var willUpdateState = _ref.willUpdateState,
              didUpdateState = _ref.didUpdateState;
          _this2.willUpdateState = willUpdateState;
          _this2.didUpdateState = didUpdateState;

          if (_this2.state) {
            // Update existing state.
            _this2.setState(newState);
          } else {
            // Set initial state.
            willUpdateState(newState);
            _this2.state = newState;
            didUpdateState();
          }
        }
      });
    } // This is a proxy for `VirtualScroller`'s `.updateLayout` instance method.

  }, {
    key: "shouldUseRefs",
    value: function shouldUseRefs() {
      // There's no way to detect if `ref` can be passed to `component`:
      // https://github.com/facebook/react/issues/16309
      // So only uses `ref`s for `React.Component`s.
      var itemComponent = this.props.itemComponent;
      return isComponentClass(itemComponent);
    }
    /**
     * A proxy to `VirtualScroller.getItemCoordinates(i)`.
     * @param  {number} i
     * @return {object}
     */

  }, {
    key: "getItemCoordinates",
    value: function getItemCoordinates(i) {
      return this.virtualScroller.getItemCoordinates(i);
    }
    /**
     * `updateItem(i)` has been renamed to `renderItem(i)`.
     * @param {number} i
     */

  }, {
    key: "updateItem",
    value: function updateItem(i) {
      return this.renderItem(i);
    }
    /**
     * Re-renders an item.
     * @param {number} i
     */

  }, {
    key: "renderItem",
    value: function renderItem(i) {
      var _this3 = this;

      if (!this.shouldUseRefs()) {
        return console.error("[virtual-scroller] `.renderItem(i)` has been called but the `component` doesn't allow `ref`s. Only `component`s that're `React.Component`s support this feature.");
      } // The item may be non-rendered when `.renderItem(i)` is called on it.
      // For example, when there's a "parent comment" having several "replies"
      // each of which has an autogenerated quote of the "parent comment"
      // and then the "parent comment" is updated (for example, a YouTube video
      // link gets parsed into an embedded video player) and all of its "replies"
      // should be updated too to show the parsed video title instead of the URL,
      // so `.renderItem(i)` is simply called on all of the "parent post"'s replies
      // regardless of some of those replies being rendered or not.


      if (this.itemRefs[i] && this.itemRefs[i].current) {
        var items = this.props.items; // Stores `item` here because the `i` index
        // might have changed when the callback is called,
        // or the item even may have been removed.

        var item = items[i];
        this.itemRefs[i].current.forceUpdate(function () {
          if (_this3._isMounted) {
            // Recalculates the `i` index here because it
            // might have changed when the callback is called,
            // or the item even may have been removed.
            var _i = items.indexOf(item);

            if (_i >= 0) {
              _this3.virtualScroller.onItemHeightChange(_i);
            }
          }
        });
      }
    } // Functional components can't have a `ref` assigned to them.
    // Item `ref`s are only used for calling `.renderItem(i)` instance method.
    // If a developer is not using the `.renderItem(i)` instance method
    // then `ref`s aren't required and will be omitted.

  }, {
    key: "getItemRef",
    value: function getItemRef(i) {
      if (!this.itemRefs[i]) {
        this.itemRefs[i] = /*#__PURE__*/React.createRef();
      }

      return this.itemRefs[i];
    }
  }, {
    key: "getOnItemStateChange",
    value: function getOnItemStateChange(i) {
      var _this4 = this;

      if (!this.onItemStateChange[i]) {
        this.onItemStateChange[i] = function (itemState) {
          return _this4.virtualScroller.onItemStateChange(i, itemState);
        };
      }

      return this.onItemStateChange[i];
    }
  }, {
    key: "getOnItemHeightChange",
    value: function getOnItemHeightChange(i) {
      var _this5 = this;

      if (!this.onItemHeightChange[i]) {
        this.onItemHeightChange[i] = function () {
          return _this5.virtualScroller.onItemHeightChange(i);
        };
      }

      return this.onItemHeightChange[i];
    }
  }, {
    key: "generateUniquePrefix",
    value: function generateUniquePrefix() {
      var prefix = String(Math.random()).slice(2);

      if (this.uniquePrefixes.indexOf(prefix) >= 0) {
        return this.generateUniquePrefix();
      }

      this.uniquePrefixes.push(prefix);
      this.uniquePrefix = prefix;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var onMount = this.props.onMount; // `onMount()` option is deprecated due to no longer being used.
      // If someone thinks there's a valid use case for it, create an issue.

      if (onMount) {
        onMount();
      }

      this._isMounted = true; // Start listening to scroll events.

      this.virtualScroller.listen();
    } // `getSnapshotBeforeUpdate()` is called right before `componentDidUpdate()`.

  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps, prevState) {
      if (this.state !== prevState) {
        this.willUpdateState(this.state, prevState);
      } // Returns `null` to avoid React warning:
      // "A snapshot value (or null) must be returned. You have returned undefined".


      return null;
    } // `componentDidUpdate()` is called immediately after React component has re-rendered.
    // That would correspond to `useLayoutEffect()` in React Hooks.

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // If `state` did change.
      if (this.state !== prevState) {
        this.didUpdateState(prevState);
      } // If `items` property did change then update `virtual-scroller` items.
      // This could have been done in `.render()` but `.setItems()` calls
      // `.setState()` internally which would result in React throwing an error.


      var _this$props2 = this.props,
          items = _this$props2.items,
          preserveScrollPosition = _this$props2.preserveScrollPosition,
          preserveScrollPositionOnPrependItems = _this$props2.preserveScrollPositionOnPrependItems; // || JSON.stringify(items.length) === JSON.stringify(prevProps.items.length)

      if (items.length !== prevProps.items.length || !shallowEqual(prevProps.items, items) || Array.isArray(items[items.length - 1]) && (items[items.length - 1].length !== prevProps.items[prevProps.items.length - 1].length || !shallowEqual(prevProps.items, items))) {
        this.virtualScroller.setItems(items, {
          // `preserveScrollPosition` property name is deprecated,
          // use `preserveScrollPositionOnPrependItems` instead.
          preserveScrollPositionOnPrependItems: preserveScrollPositionOnPrependItems || preserveScrollPosition
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false; // Stop listening to scroll events.

      this.virtualScroller.stop();
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props3 = this.props,
          AsComponent = _this$props3.as,
          Component = _this$props3.itemComponent,
          itemComponentProps = _this$props3.itemComponentProps,
          _items = _this$props3.items,
          estimatedItemHeight = _this$props3.estimatedItemHeight,
          bypass = _this$props3.bypass,
          preserveScrollPositionOnPrependItems = _this$props3.preserveScrollPositionOnPrependItems,
          preserveScrollPosition = _this$props3.preserveScrollPosition,
          preserveScrollPositionOfTheBottomOfTheListOnMount = _this$props3.preserveScrollPositionOfTheBottomOfTheListOnMount,
          preserveScrollPositionAtBottomOnMount = _this$props3.preserveScrollPositionAtBottomOnMount,
          shouldUpdateLayoutOnWindowResize = _this$props3.shouldUpdateLayoutOnWindowResize,
          measureItemsBatchSize = _this$props3.measureItemsBatchSize,
          scrollableContainer = _this$props3.scrollableContainer,
          getScrollableContainer = _this$props3.getScrollableContainer,
          initialState = _this$props3.initialState,
          initialCustomState = _this$props3.initialCustomState,
          onStateChange = _this$props3.onStateChange,
          onItemInitialRender = _this$props3.onItemInitialRender,
          onItemFirstRender = _this$props3.onItemFirstRender,
          onMount = _this$props3.onMount,
          className = _this$props3.className,
          rest = _objectWithoutProperties(_this$props3, ["as", "itemComponent", "itemComponentProps", "items", "estimatedItemHeight", "bypass", "preserveScrollPositionOnPrependItems", "preserveScrollPosition", "preserveScrollPositionOfTheBottomOfTheListOnMount", "preserveScrollPositionAtBottomOnMount", "shouldUpdateLayoutOnWindowResize", "measureItemsBatchSize", "scrollableContainer", "getScrollableContainer", "initialState", "initialCustomState", "onStateChange", "onItemInitialRender", "onItemFirstRender", "onMount", "className"]);

      var _this$virtualScroller = this.virtualScroller.getState(),
          items = _this$virtualScroller.items,
          itemStates = _this$virtualScroller.itemStates,
          firstShownItemIndex = _this$virtualScroller.firstShownItemIndex,
          lastShownItemIndex = _this$virtualScroller.lastShownItemIndex,
          beforeItemsHeight = _this$virtualScroller.beforeItemsHeight,
          afterItemsHeight = _this$virtualScroller.afterItemsHeight; // If `items` are about to be changed then
      // store the scroll Y position for the first one
      // of the current items.
      // Previously it was being done in `componentDidUpdate()`
      // but it was later found out that it wouldn't work
      // for "Show previous" button because it would
      // get hidden before `componentDidUpdate()` is called.
      //
      // Consider this code example:
      //
      // const { fromIndex, items } = this.state
      // const items = allItems.slice(fromIndex)
      // return (
      // 	{fromIndex > 0 &&
      // 		<button onClick={this.onShowPrevious}>
      // 			Show previous
      // 		</button>
      // 	}
      // 	<VirtualScroller
      // 		items={items}
      // 		itemComponent={ItemComponent}/>
      // )
      //
      // Consider a user clicks "Show previous" to show the items from the start.
      // By the time `componentDidUpdate()` is called on `<VirtualScroller/>`
      // the "Show previous" button has already been hidden
      // which results in the scroll Y position jumping forward
      // by the height of the "Show previous" button.
      // This is because `<VirtualScroller/>` restores scroll Y position
      // when items are prepended via `.setItems()` and it does that
      // when the "Show previous" button has already been hidden
      // so that's the reason for the scroll Y jump.
      //
      // To prevent that, scroll Y position is stored at `render()` time
      // rather than later in `componentDidUpdate()`.
      //


      var newItems = this.props.items;
      var previousItems = items; // this.virtualScroller.getState().items
      // There's one case when `newItems !== previousItems` is `true`
      // from the start: when `initialState.items` are passed.
      // To handle that single case `this.previousItemsProperty`
      // is tracked and `this.itemsPropertyHasChanged` flag is set.

      if (!this.itemsPropertyWasChanged) {
        this.itemsPropertyWasChanged = this.props.items !== this.previousItemsProperty;
      }

      this.previousItemsProperty = this.props.items;

      if (this.itemsPropertyWasChanged && newItems !== previousItems) {
        var _getItemsDiff = getItemsDiff(previousItems, newItems),
            prependedItemsCount = _getItemsDiff.prependedItemsCount,
            appendedItemsCount = _getItemsDiff.appendedItemsCount;

        if (prependedItemsCount === 0 && appendedItemsCount > 0) {// If it's just items that have been appended
          // then no need to re-generate the prefix
          // and to fix scroll position and to clear caches.
        } else {
          // `preserveScrollPosition` property name is deprecated,
          // use `preserveScrollPositionOnPrependItems` instead.
          if (preserveScrollPositionOnPrependItems || preserveScrollPosition) {
            this.virtualScroller.captureScroll(previousItems, newItems);
          } // Reset the unique `key` prefix for item component keys.


          this.generateUniquePrefix(); // Reset handler function caches.

          this.onItemStateChange = new Array(newItems.length);
          this.onItemHeightChange = new Array(newItems.length); // Reset item refs.

          this.itemRefs = new Array(newItems.length);
        }
      }

      var tbody = this.virtualScroller.tbody;
      return /*#__PURE__*/React.createElement(AsComponent, _extends({}, rest, {
        ref: this.container,
        className: tbody ? className ? className + " " + "VirtualScroller" : "VirtualScroller" : className,
        style: {
          paddingTop: tbody ? undefined : px(beforeItemsHeight),
          paddingBottom: tbody ? undefined : px(afterItemsHeight)
        }
      }), items.map(function (item, i) {
        if (i >= firstShownItemIndex && i <= lastShownItemIndex) {
          return /*#__PURE__*/React.createElement(Component, _extends({}, itemComponentProps, {
            ref: _this6.shouldUseRefs() ? _this6.getItemRef(i) : undefined,
            key: "".concat(_this6.uniquePrefix, ":").concat(i),
            state: itemStates && itemStates[i],
            onStateChange: _this6.getOnItemStateChange(i),
            onHeightChange: _this6.getOnItemHeightChange(i)
          }), item);
        }

        return null;
      }));
    }
  }]);

  return ReactVirtualScroller;
}(React.Component);
/**
 * Checks if the argument is a `React.Component` class.
 * https://overreacted.io/how-does-react-tell-a-class-from-a-function/
 * @param  {any}  Component
 * @return {object} [result] Returns `undefined` if it's not a `React.Component`. Returns an empty object if it's a `React.Component` (`.isReactComponent` is an empty object).
 */


_defineProperty(ReactVirtualScroller, "propTypes", {
  as: elementType,
  items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object).isRequired, PropTypes.arrayOf(PropTypes.array).isRequired]),
  itemComponent: elementType.isRequired,
  itemComponentProps: PropTypes.object,
  estimatedItemHeight: PropTypes.number,
  bypass: PropTypes.bool,
  // bypassBatchSize: PropTypes.number,
  preserveScrollPositionOnPrependItems: PropTypes.bool,
  // `preserveScrollPosition` property name is deprecated,
  // use `preserveScrollPositionOnPrependItems` instead.
  preserveScrollPosition: PropTypes.bool,
  preserveScrollPositionOfTheBottomOfTheListOnMount: PropTypes.bool,
  // `preserveScrollPositionAtBottomOnMount` property name is deprecated,
  // use `preserveScrollPositionOfTheBottomOfTheListOnMount` property instead.
  preserveScrollPositionAtBottomOnMount: PropTypes.bool,
  shouldUpdateLayoutOnWindowResize: PropTypes.func,
  measureItemsBatchSize: PropTypes.number,
  scrollableContainer: PropTypes.any,
  // `getScrollableContainer` property is deprecated.
  // Use `scrollableContainer` instead.
  getScrollableContainer: PropTypes.func,
  className: PropTypes.string,
  onMount: PropTypes.func,
  onItemInitialRender: PropTypes.func,
  // `onItemFirstRender(i)` is deprecated, use `onItemInitialRender(item)` instead.
  onItemFirstRender: PropTypes.func,
  onStateChange: PropTypes.func,
  initialCustomState: PropTypes.object,
  initialState: PropTypes.shape({
    items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object).isRequired, PropTypes.arrayOf(PropTypes.array).isRequired]),
    itemStates: PropTypes.arrayOf(PropTypes.any),
    firstShownItemIndex: PropTypes.number.isRequired,
    lastShownItemIndex: PropTypes.number.isRequired,
    beforeItemsHeight: PropTypes.number.isRequired,
    afterItemsHeight: PropTypes.number.isRequired,
    itemHeights: PropTypes.arrayOf(PropTypes.number).isRequired,
    itemSpacing: PropTypes.number
  })
});

_defineProperty(ReactVirtualScroller, "defaultProps", {
  as: "div"
});

export { ReactVirtualScroller as default };

function isComponentClass(Component) {
  // return Component.prototype instanceof React.Component
  // `React.memo()` returns `.prototype === undefined` for some reason.
  return Component.prototype && Component.prototype.isReactComponent;
}
//# sourceMappingURL=ReactVirtualScroller.js.map