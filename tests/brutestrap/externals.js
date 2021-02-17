// For development
const DEV = true;

import {d as R, u as X} from './../../r.js';
//import {d as R, u as X} from 'https://unpkg.com/brutalist-web/r.js';
import {T} from 'https://unpkg.com/jtype-system/t.js';
import {scope} from 'https://unpkg.com/maskingtape.css/c3s.js';

const d = R;
const u = X;

const base = DEV ? `${location.protocol}//${location.host}${location.pathname}/` : 'https://unpkg.com/brutestrap/';

const uri = name => {
  const random = DEV ? '?v='+Math.random() : '';
  const url = DEV ? `${base}${name}` : `${base}${name}${random}`;
  //The following line breaks Edge because of the Exception thrown in c3s "Non CORS sheet with ${url}..."
  //because of the way we set a "placeholder key" there first, which triggers a load
  //X`<link crossorigin="anonymous" rel=stylesheet href=${url}>`.to(document.head,'beforeend');
  //So instead we do it manually
  const link = document.createElement('link');
  link.setAttribute('crossorigin', 'anonymous');
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
  return url;
};

const {prefix:resetClassName} = scope(uri('reset.css'));
const {prefix:styleClassName} = scope(uri('style.css'));
const {prefix:layoutClassName} = scope(uri('layout.css'));
const {prefix:inputClassName} = scope(uri('input.css'));
const {prefix:switchClassName} = scope(uri('switch.css'));
const {prefix:spinnerClassName} = scope(uri('spinner.css'));
const {prefix:fileInputClassName} = scope(uri('fileinput.css'));
const {prefix:tableClassName} = scope(uri('table.css'));

export default {
  R, X, T, inputClassName, switchClassName, spinnerClassName, resetClassName, styleClassName, layoutClassName, tableClassName, fileInputClassName,
  d, u,
};

export {
  R, X, T, inputClassName, switchClassName, spinnerClassName, resetClassName, styleClassName, layoutClassName, tableClassName, fileInputClassName,
  d, u,
};





