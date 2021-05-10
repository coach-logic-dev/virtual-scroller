/**
 * Same as `lodash`'s `throttle()` for functions with no arguments.
 * @param  {function} func
 * @param  {number} interval
 * @return {function}
 */
export function throttle(func, interval) {
  var timeout;
  var executedAt = 0;

  var scheduled = function scheduled() {
    timeout = undefined;
    executedAt = Date.now();
    func();
  };

  return function () {
    var now = Date.now();
    var remaining = interval - (now - executedAt);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      executedAt = now;
      func();
    } else if (!timeout) {
      timeout = setTimeout(scheduled, remaining);
    }
  };
}
/**
 * Same as `lodash`'s `debounce()` for functions with no arguments.
 * @param  {function} func
 * @param  {number} interval
 * @return {function}
 */

export function debounce(func, interval) {
  var timeout;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(_this, args);
    }, interval);
  };
}
/**
 * Rounds coordinates upto 4th decimal place (after dot) and appends "px".
 * Small numbers could be printed as `"1.2345e-50"` unless rounded:
 * that would be invalid "px" value in CSS.
 * @param {number}
 * @return {string}
 */

export function px(number) {
  // Fractional pixels are used on "retina" screens.
  return number.toFixed(2) + 'px';
}
//# sourceMappingURL=utility.js.map