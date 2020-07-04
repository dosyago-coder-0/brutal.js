import {d as R, u as X,inputClassName,spinnerClassName} from '../externals.js';
import spinner from './spinner.js';

export default button;

function addActiveClass(clickEvent) {
  const {currentTarget} = clickEvent;

  currentTarget.classList.add('active');
}

function button({
    name,
    value: value = 'submit', 
    type: type = 'button',
    text: text = '',
    classNames: classNames = [],
    handlers: handlers = {},
    active: active = false,
    activeClassOnClick: activeClassOnClick = true,
    spinnerOnActive: spinnerOnActive = false
  } = {}) {
  
  if ( ! name ) throw {error: `All inputs must specify name`};
  if ( ! classNames.includes(inputClassName) ) classNames.push(inputClassName);
  if ( ! classNames.includes(spinnerClassName) ) classNames.push(spinnerClassName);

  /* the following is a hack until brutal allows multiple event handlers for same input name 
     since otherwise we cannot BOTH have a user supplied click handler
     and the built in "addActiveClass" handler
  */

  function addBuiltinClickHandler(buttonEl) {
    if ( activeClassOnClick ) {
      buttonEl.addEventListener('click', addActiveClass );
    }
  }

  return X`
    <button 
      bond=${addBuiltinClickHandler}
      handlers=${handlers}
      type=${type}
      name=${name}
      value="${value}"
      class="${active?'active':''} ${classNames.join(' ')}"
    >
      ${text}
      ${spinnerOnActive ? spinner() : R.skip('<!--bug-->')}
    </button>
  `;
}
