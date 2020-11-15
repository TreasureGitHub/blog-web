import {createGlobalStyle} from 'styled-components'

export const Iconfont = createGlobalStyle`

@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1580091180678'); /* IE9 */
  src: url('./iconfont.eot?t=1580091180678#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('./iconfont.woff?t=1580091180678') format('woff'),
  url('./iconfont.ttf?t=1580091180678') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1580091180678#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`
