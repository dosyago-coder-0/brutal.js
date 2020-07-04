import {d as R, u as X, inputClassName} from '../externals.js';

export default tagInput;

function startNewTagIfEmpty(inputEvent) {
  const {target:contentEditable} = inputEvent;

  if ( contentEditable.innerText.trim().length == 0 ) {
    contentEditable.innerHTML = '';

    X`<span class=tag></span>`.to(contentEditable,'innerHTML');

    const newTagRange = document.createRange();

    newTagRange.setStart(contentEditable.children[0], 0);
    newTagRange.collapse(true);

    const caret = getSelection();
    caret.removeAllRanges();
    caret.addRange(newTagRange);
  }
}

function startNewTagIfEnterAndEdgeBrowser(keyEvent) {
  if ( ! /Edge/.test(navigator.userAgent) ) {
    return;
  }

  const {target:contentEditable, key} = keyEvent;

  if ( key == "Enter" ) {
    X`<span class=tag></span>`.to(contentEditable,'beforeend');
    const newTagRange = document.createRange();

    newTagRange.setStart(contentEditable.lastElementChild, 0);
    newTagRange.collapse(true);

    const caret = getSelection();
    caret.removeAllRanges();
    caret.addRange(newTagRange);
  }
}

function focusEditable(clickEvent) {
  const {target,currentTarget} = clickEvent;
  if ( (target.closest('[contenteditable]') || target.closest('.label-text')) && ! target.matches('[contenteditable]') ) {
    currentTarget.querySelector('[contenteditable]').focus(); 
  }
}

function tagInput({
    name,
    inline: inline = false,
    label: label = '',
    spaced: spaced = false,
    classNames: classNames = [],
    placeholder: placeholder = '',
    rightElement: rightElement = undefined,
  } = {}) {

  if ( ! name ) throw {error: `All inputs must specify name`};
  if ( ! classNames.includes(inputClassName) ) classNames.push(inputClassName);

  return X`
    <div class="multiline input ${inline ? 'inline': ''} ${
        spaced?'spaced':''} ${
        classNames.join(' ')}" click=${focusEditable}>
      <label>
        <span class=label-text>
          ${label}
        </span>
        <div
          input=${startNewTagIfEmpty}
          keydown=${startNewTagIfEnterAndEdgeBrowser}
          class=tag-editor
          contenteditable
          name=${name}
        >
          <span class=tag>${placeholder}</span>
        </div>
      </label>
      ${rightElement ? rightElement : ''}
    </div>
  `;
}
