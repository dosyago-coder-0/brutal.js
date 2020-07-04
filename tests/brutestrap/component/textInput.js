import {d as R, u as X,inputClassName} from '../externals.js';

let nextId = 1;

export default textInput;

function textInput({
    name,
    id: id = '',
    style: style = '',
    placeholder: placeholder = '', 
    required: required = false,
    handlers: handlers = {},
    inline: inline = false,
    minlength: minlength = 0,
    maxlength: maxlength = 2046,
    value: value = '', 
    label: label = '', 
    multiline: multiline = false,
    size: size = 16,
    classNames: classNames = [],
    spaced: spaced = false,
    type: type = 'text',
    rightEl: rightEl = undefined,
  } = {}) {

  if ( ! name ) throw {error: `All inputs must specify name`};
  if ( ! classNames.includes(inputClassName) ) classNames.push(inputClassName);
  if ( ! id ) id = `bsid-${nextId++}`

  let input;

  if( type === 'textarea' ) {
    input = X`
      <textarea
        id=${id}
        ${required?'required':''}
        handlers=${handlers}
        style="${style}"
        value="${value}"
        name=${name}
        placeholder="${placeholder}"
      >${value}</textarea>
    `;
  } else {
    input = X`
      <input
        id=${id}
        ${required?'required':''}
        handlers=${handlers}
        name=${name}
        type=${type}
        size=${size} 
        minlength=${minlength}
        maxlength=${maxlength}
        style="${style}"
        placeholder="${placeholder}"
        value="${value}"
      >
    `;
  }

  return X`
    <div class="input ${type=='textarea' || multiline?'multiline':''} ${
        inline?'inline':''} ${spaced?'spaced':''} ${
        classNames.join(' ')}">
      <label>
        <span class="label-text">${label}</span>
        ${input}
      </label>
      ${rightEl ? rightEl : ''}
    </div>
  `;
}
