"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsTbody = supportsTbody;
exports.reportTbodyIssue = reportTbodyIssue;
exports.addTbodyStyles = addTbodyStyles;
exports.setTbodyPadding = setTbodyPadding;

var _utility = require("./utility");

var NOT_SUPPORTED_MESSAGE = '[virtual-scroller] It looks like you\'re using Internet Explorer which doesn\'t support CSS variables required for a <tbody/> container. VirtualScroller has been switched into "bypass" mode (render all items). See: https://gitlab.com/catamphetamine/virtual-scroller/-/issues/1';

function supportsTbody() {
  // Detect Internet Explorer.
  // https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
  // `documentMode` is an IE-only property.
  // Supports IE 9-11. Maybe even IE 8.
  // http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
  if (typeof window !== 'undefined' && window.document.documentMode) {
    // CSS variables aren't supported in Internet Explorer.
    return false;
  }

  return true;
}

function reportTbodyIssue() {
  if (typeof window !== 'undefined') {
    // In a web browser.
    setTimeout(function () {
      // Throw an error in a timeout so that it doesn't interrupt the application's flow.
      // At the same time, the error could be spotted in the console or in error monitoring software.
      throw new Error(NOT_SUPPORTED_MESSAGE);
    }, 0);
  } else {
    // On a server.
    console.error(NOT_SUPPORTED_MESSAGE);
  }
}

function addTbodyStyles(tbody) {
  // `classList.add` is supported in Internet Explorer 10+.
  tbody.classList.add('VirtualScroller');
  var style = document.getElementById('VirtualScrollerStyle');

  if (!style) {
    style = document.createElement('style');
    style.id = 'VirtualScrollerStyle'; // CSS variables aren't supported in Internet Explorer.

    style.innerText = "\n\t\t\ttbody.VirtualScroller:before {\n\t\t\t\tcontent: '';\n\t\t\t\tdisplay: table-row;\n\t\t\t\theight: var(--VirtualScroller-paddingTop);\n\t\t\t}\n\t\t\ttbody.VirtualScroller:after {\n\t\t\t\tcontent: '';\n\t\t\t\tdisplay: table-row;\n\t\t\t\theight: var(--VirtualScroller-paddingBottom);\n\t\t\t}\n\t\t".replace(/[\n\t]/g, '');
    document.head.appendChild(style);
  }
}

function setTbodyPadding(tbody, beforeItemsHeight, afterItemsHeight) {
  // CSS variables aren't supported in Internet Explorer.
  tbody.style.setProperty('--VirtualScroller-paddingTop', (0, _utility.px)(beforeItemsHeight));
  tbody.style.setProperty('--VirtualScroller-paddingBottom', (0, _utility.px)(afterItemsHeight));
}
//# sourceMappingURL=tbody.js.map