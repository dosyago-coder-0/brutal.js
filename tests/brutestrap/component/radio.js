import {d as R, u as X,inputClassName, switchClassName} from '../externals.js';

export default radio;

function radio({
    name,
    options: options = [],
    inline: inline = false,
    value: value = '', 
    label: label = '', 
    classNames: classNames = [],
    multiple: multiple = false,
  } = {}) {

  if ( ! name ) throw {error: `All inputs must specify name`};
  if ( ! classNames.includes(inputClassName) ) classNames.push(inputClassName);
  if ( ! classNames.includes(switchClassName) ) classNames.push(switchClassName);

  let input;

  input = X`
    <section class="radio-group ${classNames?classNames.join(' '):''}">
      ${options.map(opt => {
        let {name:optName, value} = opt;
        if ( (! optName || ! value) && typeof opt == "string" ) {
          optName = value = opt;
        }
        return X`
          <label class=row>${optName}<input name=${name} type=radio value="${value}"></label>
        `;
      })}
    </section>
  `;

  return X`
    <div class="multiline input ${inline ? 'inline': ''} ${
        classNames.join(' ')}">
      <label>
        <span class=label-text>${label}</span>
        ${input}
      </label>
    </div>
  `;
}
