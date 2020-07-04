import {d as R, u as X,spinnerClassName} from '../externals.js';

export default spinner;

function spinner({
    classNames: classNames = [],
  } = {}) {

  if ( ! classNames.includes(spinnerClassName)) classNames.push(spinnerClassName);

  return X`
    <div class="spinner ${classNames.join(' ')}">
      <div class=mover></div>
    </div>
  `;
}
