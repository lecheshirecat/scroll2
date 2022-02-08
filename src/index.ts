/**
 * A lightweight smooth scroll module
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

const _SCROLLTO_DURATION_ = 500
const _SCROLLTO_EASING_ = 'easeInOutCubic'

export interface ScrollOptions {
    duration?: number,
    easing?: string | ((t: number) => number),
    offset?: number
}

function getEasing(fn: string | ((t: number) => number)) {
    if (typeof fn === 'function') {
        return fn
    }

    switch (fn) {
        case 'linear': {
            // no easing, no acceleration
            return function linear(t: number): number {
                return t
            }
        }
        case 'easeInQuad': {
            // accelerating from zero velocity
            return function easeInQuad(t: number): number {
                return t * t
            }
        }
        case 'easeOutQuad': {
            // decelerating to zero velocity
            return function easeOutQuad(t: number): number {
                return t * (2 - t)
            }
        }
        case 'easeInOutQuad': {
            // acceleration until halfway, then deceleration
            return function easeInOutQuad(t: number): number {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            }
        }
        case 'easeInCubic': {
            // accelerating from zero velocity
            return function easeInCubic(t: number): number {
                return t * t * t
            }
        }
        case 'easeOutCubic': {
            // decelerating to zero velocity
            return function easeOutCubic(t: number): number {
                return --t * t * t + 1
            }
        }
        case 'easeInOutCubic': {
            // acceleration until halfway, then deceleration
            return function easeInOutCubic(t: number): number {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            }
        }
        case 'easeInQuart': {
            // accelerating from zero velocity
            return function easeInQuart(t: number): number {
                return t * t * t * t
            }
        }
        case 'easeOutQuart': {
            // decelerating to zero velocity
            return function easeOutQuart(t: number): number {
                return 1 - --t * t * t * t
            }
        }
        case 'easeInOutQuart': {
            // acceleration until halfway, then deceleration
            return function easeInOutQuart(t: number): number {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
            }
        }
        case 'easeInQuint': {
            // accelerating from zero velocity
            return function easeInQuint(t: number): number {
                return t * t * t * t * t
            }
        }
        case 'easeOutQuint': {
            // decelerating to zero velocity
            return function easeOutQuint(t: number): number {
                return 1 + --t * t * t * t * t
            }
        }
        case 'easeInOutQuint': {
            // acceleration until halfway, then deceleration
            return function easeInOutQuint(t: number): number {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
            }
        }
        default: {
            // no easing, no acceleration
            return function linear(t: number): number {
                return t
            }
        }
    }
}

export function scrollTo(element: HTMLElement, params?: ScrollOptions) {
    if (!element || typeof element.getBoundingClientRect !== 'function') return

    var offset = params?.offset ?? 0
    var duration = params?.duration ?? _SCROLLTO_DURATION_
    var easingFn = getEasing(params?.easing ?? _SCROLLTO_EASING_)

    var startingY = window.pageYOffset
    var elementY = window.pageYOffset + (element.getBoundingClientRect().top - offset)

    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
    var diff = targetY - startingY
    var start: number

    if (!diff) return

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        var time = timestamp - start
        var percent = Math.min(time / duration, 1)
        percent = easingFn(percent)

        window.scrollTo(0, startingY + diff * percent)

        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
}
