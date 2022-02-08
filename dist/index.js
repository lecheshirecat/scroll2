"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollTo = void 0;
const _SCROLLTO_DURATION_ = 500;
const _SCROLLTO_EASING_ = 'easeInOutCubic';
function getEasing(fn) {
    if (typeof fn === 'function') {
        return fn;
    }
    switch (fn) {
        case 'linear': {
            return function linear(t) {
                return t;
            };
        }
        case 'easeInQuad': {
            return function easeInQuad(t) {
                return t * t;
            };
        }
        case 'easeOutQuad': {
            return function easeOutQuad(t) {
                return t * (2 - t);
            };
        }
        case 'easeInOutQuad': {
            return function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };
        }
        case 'easeInCubic': {
            return function easeInCubic(t) {
                return t * t * t;
            };
        }
        case 'easeOutCubic': {
            return function easeOutCubic(t) {
                return --t * t * t + 1;
            };
        }
        case 'easeInOutCubic': {
            return function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            };
        }
        case 'easeInQuart': {
            return function easeInQuart(t) {
                return t * t * t * t;
            };
        }
        case 'easeOutQuart': {
            return function easeOutQuart(t) {
                return 1 - --t * t * t * t;
            };
        }
        case 'easeInOutQuart': {
            return function easeInOutQuart(t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
            };
        }
        case 'easeInQuint': {
            return function easeInQuint(t) {
                return t * t * t * t * t;
            };
        }
        case 'easeOutQuint': {
            return function easeOutQuint(t) {
                return 1 + --t * t * t * t * t;
            };
        }
        case 'easeInOutQuint': {
            return function easeInOutQuint(t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
            };
        }
        default: {
            return function linear(t) {
                return t;
            };
        }
    }
}
function scrollTo(element, params) {
    var _a, _b, _c;
    if (!element || typeof element.getBoundingClientRect !== 'function')
        return;
    var offset = (_a = params === null || params === void 0 ? void 0 : params.offset) !== null && _a !== void 0 ? _a : 0;
    var duration = (_b = params === null || params === void 0 ? void 0 : params.duration) !== null && _b !== void 0 ? _b : _SCROLLTO_DURATION_;
    var easingFn = getEasing((_c = params === null || params === void 0 ? void 0 : params.easing) !== null && _c !== void 0 ? _c : _SCROLLTO_EASING_);
    var startingY = window.pageYOffset;
    var elementY = window.pageYOffset + (element.getBoundingClientRect().top - offset);
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
    var diff = targetY - startingY;
    var start;
    if (!diff)
        return;
    window.requestAnimationFrame(function step(timestamp) {
        if (!start)
            start = timestamp;
        var time = timestamp - start;
        var percent = Math.min(time / duration, 1);
        percent = easingFn(percent);
        window.scrollTo(0, startingY + diff * percent);
        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    });
}
exports.scrollTo = scrollTo;
