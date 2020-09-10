import {
	getScrollY,
	getScreenHeight,
	getScreenWidth
} from './DOM'

export default class ScrollableContainer {
	constructor(element) {
		this.element = element
	}

	getScrollY() {
		return this.element.scrollTop
	}

	scrollTo(scrollX, scrollY) {
		this.element.scrollTo(scrollX, scrollY)
	}

	getWidth() {
		return this.element.offsetWidth
	}

	getHeight() {
		// if (!this.element && !precise) {
		// 	return getScreenHeight()
		// }
		return this.element.offsetHeight
	}

	getContentHeight() {
		return this.element.scrollHeight
	}

	getTopOffset(element) {
		const scrollableContainerTop = this.element.getBoundingClientRect().top
		const scrollableContainerBorderTopWidth = this.element.clientTop
		const top = element.getBoundingClientRect().top
		return (top - scrollableContainerTop) + this.getScrollY() - scrollableContainerBorderTopWidth
	}

	// isVisible() {
	// 	const { top, bottom } = this.element.getBoundingClientRect()
	// 	return bottom > 0 && top < getScreenHeight()
	// }

	addScrollListener(listener) {
		this.element.addEventListener('scroll', listener)
		return () => this.element.removeEventListener('scroll', listener)
	}
}

export class ScrollableWindowContainer extends ScrollableContainer {
	constructor() {
		super(window)
	}

	getScrollY() {
		return getScrollY()
	}

	getWidth() {
		return getScreenWidth()
	}

	getHeight() {
		return getScreenHeight()
	}

	getContentHeight() {
		return document.documentElement.scrollHeight
	}

	getTopOffset(element) {
		const borderTopWidth = document.clientTop || document.body.clientTop || 0
		return element.getBoundingClientRect().top + this.getScrollY() - borderTopWidth
	}

	// isVisible() {
	// 	return true
	// }
}