import {d as R, u as X,inputClassName} from '../externals.js';

export default select;

function select({
    name,
    options: options = [],
    inline: inline = false,
    value: value = '', 
    label: label = '', 
    classNames: classNames = [],
    multiple: multiple = false,
    rightElement: rightElement = undefined,
  } = {}) {

  if ( ! name ) throw {error: `All inputs must specify name`};
  if ( ! classNames.includes(inputClassName) ) classNames.push(inputClassName);

  let input;

  input = X`
    <select
      name=${name}
      value="${value}" 
      ${multiple?'multiple':''}
    >
    ${options.map(({value,name}) => X`
      <option value="${value}">${name}</option>
    `)}
    </select>
  `;

  return X`
    <div class="input ${inline ? 'inline': ''} ${
        multiple? 'multiline': ''} ${
        classNames.join(' ')}">
      <label>
        <span class=label-text>${label}</span>
        ${input}
      </label>
      ${rightElement? rightElement: ''}
    </div>
  `;
}
