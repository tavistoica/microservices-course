import * as React from 'react'
import { SvgXml } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title, filter */

const LogoutOutline = () => {
  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Log Out</title><path d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
`
  return <SvgXml xml={xml} width="100%" height="100%" />
}

export { LogoutOutline }
