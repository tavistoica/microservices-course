import * as React from 'react'
import { SvgXml } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title, filter */

const MenuOutline = () => {
  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Menu</title><path fill="none" stroke="black" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 160h352M80 256h352M80 352h352"/></svg>

`
  return <SvgXml xml={xml} width="100%" height="100%" />
}

export { MenuOutline }
