import * as React from 'react'
import { SvgXml } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title, filter */

const PersonOutline = () => {
  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Person</title><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="black" stroke-miterlimit="10" stroke-width="32"/></svg>
`
  return <SvgXml xml={xml} width="100%" height="100%" />
}

export { PersonOutline }
