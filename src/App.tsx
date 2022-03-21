import { createGlobalStyle } from "styled-components";
import Router from "./Router";

/* @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap'); */
const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body{
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
  }
  a{
    text-decoration: none;
    color: inherit;
  }

  .factory_info {
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    background-color: #ffffff;
    border: #e2e5df solid 1px;
    border-radius: 5px;
    color: #03172f;
    letter-spacing: -0.25px;
    word-spacing: 6px;
    padding: 20px;
    position: absolute;
    left: -130px;
    transform: translateY(-100%);
    z-index: 2;
    min-height: 120px;
    width: 300px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
  }
  .factory_info::after {
    border-color: #ffffff transparent;
    border-style: solid;
    border-width: 8px 6px 0 6.5px;
    content: "";
    display: block;
    left: 133px;
    position: absolute;
    bottom: -7px;
    width: 0;
    z-index: 1;
  }
  .factory_info::before {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    border-color: #e2e5df transparent;
    border-style: solid;
    border-width: 8px 6px 0 6.5px;
    content: "";
    display: block;
    left: 133px;
    position: absolute;
    bottom: -8px;
    width: 0;
    z-index: 0;
  }
  .factory_info__title {
    display: flex;
    margin-bottom: 10px;
  }
  .factory_info__body {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  .factory_info__title > .title__name {
    margin-right: 10px;
    font-size: 17px;
  }
  .factory_info__title > .title__field {
    font-size: 15px;
    color: #acacac;
  }`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
