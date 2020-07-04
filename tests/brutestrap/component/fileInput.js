import {d as R, u as X,inputClassName,fileInputClassName} from '../externals.js';

export default fileInput;

function fileInput({
    name,
    text: text = '',
    multiple: multiple = false,
    accept: accept = "*/*",
    classNames: classNames = [],
    inline: inline = false,
    label: label = '', 
    rightElement: rightElement = undefined,
  } = {}) {

  if ( ! name ) throw {error: `All inputs must specify name`};

  if ( ! classNames.includes(inputClassName) ) classNames.push(inputClassName);
  if ( ! classNames.includes(fileInputClassName) ) classNames.push(fileInputClassName);

  return X`
    <div class="file-input input ${inline ?'inline':''} ${classNames.join(' ')}">
      <label>
        <span class=label-text>${label}</span>
        <input
          type=file
          title="${text}"
          multiple=${multiple}
          accept=${accept}
        >
      </label>
      ${rightElement ? rightElement: ''}
    </div>
  `;
}
