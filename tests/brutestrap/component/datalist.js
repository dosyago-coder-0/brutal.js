import {d as R, u as X} from '../externals.js';

export default datalist;

function datalist({
    name,
    list,
    placeholder: placeholder = '', 
    handlers: handlers = {},
    inline: inline = false,
    classNames: classNames = [],
    value: value = '', 
    label: label = '', 
    spaced: spaced = false,
    type: type = 'text',
    rightElement: rightElement = undefined,
  } = {}) {

  if ( ! name ) throw {error: `All inputs must specify name`};

  if ( ! list ) throw {error: `All datalist inputs must specify a list property of type Function`};

  const listId = 'datalist'+Math.random();
  const values = [];
  let listIndex = 0, listValue;

  while(listValue=list(listIndex)) {
    values.push(listValue);
    listIndex++;
  }

  const input = X`
    <input
      handlers=${handlers}
      name=${name} 
      type=${type}
      placeholder="${placeholder}" 
      list=${listId} 
      value="${value}"
    >
  `;

  const datalist = X`
    <datalist id=${listId}>
      <!-- select polyfills for Safari iOS which has NO datalist -->
      <select
        mame=${name}
        value="${value}"
      >
      ${values.map(v => X`
        <option value="${v}">${v}</option>
      `)}
      </select>
    </datalist>
  `;

  return X`
    <div class="input ${type=='textarea'?'multiline':''} ${
      inline?'inline':''} ${spaced?'spaced':''} ${
      classNames.join(' ')}">
      <label>
        <span class="label-text">${label}</span>
        ${input}
        ${datalist}
      </label>
      ${rightElement ? rightElement : ''}
    </div>
  `;
}
