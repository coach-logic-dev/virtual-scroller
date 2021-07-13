"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _log = _interopRequireDefault(require("./log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemHeights = /*#__PURE__*/function () {
  function ItemHeights(getContainerElement, getState) {
    _classCallCheck(this, ItemHeights);

    this.getContainerElement = getContainerElement;
    this.getState = getState;
    this.initialize();
  }

  _createClass(ItemHeights, [{
    key: "initialize",
    value: function initialize() {
      this.reset();

      if (this.getState()) {
        this.onStateUpdate();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.measuredItemsHeight = 0;
      this.firstMeasuredItemIndex = undefined;
      this.lastMeasuredItemIndex = undefined;
    }
    /**
     * Initializes `this.measuredItemsHeight`, `this.firstMeasuredItemIndex` and
     * `this.lastMeasuredItemIndex` instance variables from the `state`.
     * These instance variables are used when calculating "average" item height:
     * the "average" item height is simply `this.measuredItemsHeight` divided by
     * `this.lastMeasuredItemIndex` minus `this.firstMeasuredItemIndex` plus 1.
     * Also, `this.firstMeasuredItemIndex` and `this.lastMeasuredItemIndex`
     * are used to detect "non-continuous" scroll: the cases when scroll position
     * jumps from one position to a distant another position. How could that happen?
     * Maybe it can't, but just in case.
     */

  }, {
    key: "onStateUpdate",
    value: function onStateUpdate() {
      var i = 0;

      while (i < this.getState().itemHeights.length) {
        if (this.getState().itemHeights[i] === undefined) {
          if (this.firstMeasuredItemIndex !== undefined) {
            this.lastMeasuredItemIndex = i - 1;
            break;
          }
        } else {
          if (this.firstMeasuredItemIndex === undefined) {
            this.firstMeasuredItemIndex = i;
          }

          this.measuredItemsHeight += this.getState().itemHeights[i];
        }

        i++;
      }
    } // Seems to be no longer used.
    // getItemHeight(i, firstShownItemIndex) {
    // 	if (this.get(i)) {
    // 		return this.get(i)
    // 	}
    // 	const itemHeight = this._getItemHeight(i, firstShownItemIndex)
    // 	if (itemHeight) {
    // 		this.set(i, itemHeight)
    // 		return itemHeight
    // 	}
    // 	return this.getAverage()
    // }

  }, {
    key: "_getItemHeight",
    value: function _getItemHeight(i, firstShownItemIndex) {
      var container = this.getContainerElement();

      if (container) {
        var nodeIndex = i - firstShownItemIndex;

        if (nodeIndex >= 0 && nodeIndex < container.childNodes.length) {
          // `offsetHeight` is not precise enough (doesn't return fractional pixels).
          // let height = container.childNodes[nodeIndex].offsetHeight
          return container.childNodes[nodeIndex].getBoundingClientRect().height;
        }
      }
    }
  }, {
    key: "getItemSpacing",
    value: function getItemSpacing() {
      var container = this.getContainerElement();

      if (container) {
        if (container.childNodes.length > 1) {
          var firstItem = container.childNodes[0];
          var secondItem = container.childNodes[1];
          var firstItemRect = firstItem.getBoundingClientRect();
          var secondItemRect = secondItem.getBoundingClientRect();
          var spacing = secondItemRect.top - (firstItemRect.top + firstItemRect.height); // Debugging.

          if (window.VirtualScrollerDebug) {
            (0, _log["default"])('Measure item spacing', spacing);
          }

          return spacing;
        }
      }
    }
    /**
     * Updates item heights and item spacing.
     * @param  {number} fromIndex
     * @param  {number} toIndex
     * @param  {number} firstShownItemIndex
     */

  }, {
    key: "update",
    value: function update(fromIndex, toIndex, firstShownItemIndex) {
      if (this.getState().itemSpacing === undefined) {
        this.getState().itemSpacing = this.getItemSpacing();
      } // Reset `this.measuredItemsHeight` if it's not a continuous scroll.


      if (this.firstMeasuredItemIndex !== undefined) {
        if (fromIndex > this.lastMeasuredItemIndex + 1 || toIndex < this.firstMeasuredItemIndex - 1) {
          // // The previously measured average item height might still be
          // // more precise if it contains more measured items ("samples").
          // const previousAverageItemHeight = this.averageItemHeight
          // const previousAverageItemHeightSamplesCount = this.lastMeasuredItemIndex - this.firstMeasuredItemIndex + 1
          // Reset.
          this.reset(); // this.previousAverageItemHeight = previousAverageItemHeight
          // this.previousAverageItemHeightSamplesCount = previousAverageItemHeightSamplesCount
        }
      }

      var previousFirstMeasuredItemIndex = this.firstMeasuredItemIndex;
      var previousLastMeasuredItemIndex = this.lastMeasuredItemIndex;
      var firstMeasuredItemIndexHasBeenUpdated = false;
      var i = fromIndex;

      while (i <= toIndex) {
        // Recalculate item heights because item height might change
        // after showing it compared to what it was when hiding it.
        // For example, a YouTube video might have been expanded
        // and then the item is hidden and it's state is reset
        // and when it's shown again the YouTube video is not expanded.
        // if (this.get(i) === undefined) {
        var height = this._getItemHeight(i, firstShownItemIndex);

        if (height !== undefined) {
          this.set(i, height); // Update new items height (before).

          if (previousFirstMeasuredItemIndex === undefined || i < previousFirstMeasuredItemIndex) {
            this.measuredItemsHeight += height; // Update first measured item index.

            if (!firstMeasuredItemIndexHasBeenUpdated) {
              this.firstMeasuredItemIndex = i;
              firstMeasuredItemIndexHasBeenUpdated = true;
            }
          } // Update new items height (after).


          if (previousLastMeasuredItemIndex === undefined || i > previousLastMeasuredItemIndex) {
            // If `previousLastMeasuredItemIndex` is `undefined`
            // then `previousFirstMeasuredItemIndex` is also `undefined`
            // which means that `this.measuredItemsHeight` has already been updated.
            if (previousLastMeasuredItemIndex !== undefined) {
              this.measuredItemsHeight += height;
            } // Update last measured item index.


            this.lastMeasuredItemIndex = i;
          }
        } // }


        i++;
      } // // Update average item height.
      // this.updateAverageItemHeight()

    }
    /**
     * Re-measures item height.
     * @param  {number} i — Item index.
     * @param  {number} firstShownItemIndex
     */

  }, {
    key: "updateItemHeight",
    value: function updateItemHeight(i, firstShownItemIndex) {
      var previousHeight = this.get(i);

      var height = this._getItemHeight(i, firstShownItemIndex); // The items might not have rendered at all,
      // for example, when using React, because
      // React performs DOM updates asynchronously
      // and if the user scrolls fast enough
      // React might not have rendered the item
      // since it has become visible till it became no longer visible.


      if (previousHeight === undefined || height === undefined) {
        return;
      }

      this.set(i, height);
      this.measuredItemsHeight += height - previousHeight;
    } // /**
    //  * "Average" item height is stored as an instance variable.
    //  * For example, for caching, so that it isn't calculated every time it's requested.
    //  * But that would be negligible performance gain, not really worth the extra code.
    //  * Another thing it's stored for as an instance variable is
    //  * keeping "previous" "average" item height, because it can be more precise
    //  * than the newly calculated "average" item height, provided it had
    //  * more "samples" (measured items). The newly calculated average item height
    //  * could get less samples in a scenario when the scroll somehow jumps
    //  * from one position to some other distant position: in that case previous
    //  * "total measured items height" is discarded and the new one is initialized.
    //  * Could such situation happen in real life? I guess, it's unlikely.
    //  * So I'm commenting out this code, but still keeping it just in case.
    //  */
    // updateAverageItemHeight() {
    // 	this.averageItemHeightSamplesCount = this.lastMeasuredItemIndex - this.firstMeasuredItemIndex + 1
    // 	this.averageItemHeight = this.measuredItemsHeight / this.averageItemHeightSamplesCount
    // }
    //
    // /**
    //  * Public API: is called by `VirtualScroller`.
    //  * @return {number}
    //  */
    // getAverage() {
    // 	// Previously measured average item height might still be
    // 	// more precise if it contains more measured items ("samples").
    // 	if (this.previousAverageItemHeight) {
    // 		if (this.previousAverageItemHeightSamplesCount > this.averageItemHeightSamplesCount) {
    // 			return this.previousAverageItemHeight
    // 		}
    // 	}
    // 	return this.averageItemHeight || 0
    // }

    /**
     * Public API: is called by `VirtualScroller`.
     * @return {number}
     */

  }, {
    key: "getAverage",
    value: function getAverage() {
      // When `this.measuredItemsHeight` is `0`
      // then `this.lastMeasuredItemIndex` and `this.firstMeasuredItemIndex` are `undefined`.
      if (this.measuredItemsHeight) {
        return this.measuredItemsHeight / (this.lastMeasuredItemIndex - this.firstMeasuredItemIndex + 1);
      }

      return 0;
    }
  }, {
    key: "get",
    value: function get(i) {
      return this.getState().itemHeights[i];
    }
  }, {
    key: "set",
    value: function set(i, height) {
      this.getState().itemHeights[i] = height;
    }
  }, {
    key: "onPrepend",
    value: function onPrepend(count) {
      if (this.firstMeasuredItemIndex !== undefined) {
        this.firstMeasuredItemIndex += count;
        this.lastMeasuredItemIndex += count;
      }
    }
  }]);

  return ItemHeights;
}();

exports["default"] = ItemHeights;
//# sourceMappingURL=ItemHeights.js.map