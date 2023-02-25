import { JSDOM } from 'jsdom'

export const query = (dom: JSDOM, selector: string) => dom.window.document.querySelector<HTMLElement>(selector)

export const queryAll = (dom: JSDOM, selector: string) => dom.window.document.querySelectorAll<HTMLElement>(selector)
