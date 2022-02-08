export interface ScrollOptions {
    duration?: number;
    easing?: string | ((t: number) => number);
    offset?: number;
}
export declare function scrollTo(element: HTMLElement, params?: ScrollOptions): void;
