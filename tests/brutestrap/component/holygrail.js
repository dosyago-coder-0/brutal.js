import {d as R, u as X,layoutClassName} from '../externals.js';

export default holygrail;

function holygrail({
    classNames: classNames = [],
    handlers: handlers = {},
    header: header = undefined,
    footer: footer = undefined,
    article: article = undefined,
    nav: nav = undefined,
    aside: aside = undefined,
    debug: debug = false,
  } = {}) {
  
  if ( ! classNames.includes(layoutClassName) ) classNames.push(layoutClassName);

  return X`
    ${debug?X`<i>HolyGrail debug mode</i>`:''}
    <article class="holygrail ${debug?'debug':''} ${classNames.join(' ')}">
      <header>${header}</header>
      <nav>${nav}</nav>
      <article>${article}</article>
      <aside>${aside}</aside>
      <footer>${footer}</footer>
    </article>
  `;
}
