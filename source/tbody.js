import { px } from './utility'

export function addTbodyStyles(tbody) {
	// Detect Internet Explorer.
	// https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
	if (window.document.documentMode) {
		// CSS variables aren't supported in Internet Explorer.
		console.warn('[virtual-scroller] It seems like you\'re using Internet Explorer which doesn\'t support CSS variables required for a <tbody/> container. See: https://gitlab.com/catamphetamine/virtual-scroller/-/issues/1')
	}
	// `classList.add` is supported in Internet Explorer 10+.
	tbody.classList.add('VirtualScroller')
	let style = document.getElementById('VirtualScrollerStyle')
	if (!style) {
		style = document.createElement('style')
		style.id = 'VirtualScrollerStyle'
		// CSS variables aren't supported in Internet Explorer.
		style.innerText = `
			tbody.VirtualScroller:before {
				content: '';
				display: table-row;
				height: var(--VirtualScroller-paddingTop);
			}
			tbody.VirtualScroller:after {
				content: '';
				display: table-row;
				height: var(--VirtualScroller-paddingBottom);
			}
		`.replace(/[\n\t]/g, '')
		document.head.appendChild(style)
	}
}

export function setTbodyPadding(tbody, beforeItemsHeight, afterItemsHeight) {
	// CSS variables aren't supported in Internet Explorer.
	tbody.style.setProperty('--VirtualScroller-paddingTop', px(beforeItemsHeight));
	tbody.style.setProperty('--VirtualScroller-paddingBottom', px(afterItemsHeight));
}