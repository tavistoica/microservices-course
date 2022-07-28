import * as React from 'react'
import { SvgXml } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title, filter */

const HomeOutline = () => {
  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Home</title><path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
`
  return <SvgXml xml={xml} width="100%" height="100%" />
}

export { HomeOutline }
