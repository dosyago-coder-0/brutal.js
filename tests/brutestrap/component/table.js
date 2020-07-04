import {d as R, u as X,tableClassName} from '../externals.js';

import textInput from './textInput.js';

export default table;

function table({
    name,
    classNames,
    rowHeader,
    columnHeader,
    cell,
    placeholder: placeholder = '', 
    handlers: handlers = {},
    inline: inline = false,
    value: value = '', 
    label: label = '', 
    spaced: spaced = false,
    type: type = 'text',
    inputSize: inputSize = 5,
    rightElement: rightElement = undefined,
  } = {}) {

  if ( ! name ) throw {error: `All inputs must specify name`};

  if ( ! classNames.includes(tableClassName) ) classNames.push(tableClassName);

  if ( ! (rowHeader && columnHeader && cell) ) throw {
    error: `All table inputs must specify columnHeader, rowHeader and cell properties of type Function`
  };
 
  const tableCode = 'table-'+Math.random();
  const firstCellId = 'first-cell-'+tableCode;
  const cancel = event => (event.preventDefault(), event.stopPropagation(), false);
  
  return X`
    <div class="input multiline ${inline?'inline':''} ${
        spaced?'spaced':''} ${classNames.join(' ')}" contextmenu=${() => 1}>
      <label for=${firstCellId+0}>
        <span class="label-text">${label}</span>
      </label>
      <table>
        ${TableHeader({columnHeader,tableCode})}
        <tbody>
          ${Rows({rowHeader,columnHeader, tableCode, cellTd, firstCellId})}
        </tbody>
      </table>
      ${rightElement ? rightElement : ''}
    </div>
  `;
    
  function cellTd ({i,j, id:id = ''}) {
    /**
    const style = type == 'number' ? `
      width: ${inputSize}em;
    `:''
    **/
    const style = '';

    const value = i*j;

    return X`
      <td>
        ${
          textInput({id,name:'name-'+id,type,handlers,placeholder,size:inputSize,style,value})
        }
      </td>
    `;
  }
}

function TableHeader({columnHeader,tableCode}) {
  const values = getValues(columnHeader);
      
  return  X`
    <thead>
      <tr>
        <th><!-- top left corner placeholder cell--></th>
        ${values.map((ch,i) => X`<th>${ch}</th>`)}
      </tr>
    </thead>
  `;
}

function Rows({rowHeader,columnHeader, tableCode,cellTd, firstCellId}) {
  const values = getValues(rowHeader);
  const cvalues = getValues(columnHeader);
  return values.map((rh,i) => row({rh,i,cvalues,tableCode,cellTd,firstCellId}));
}

function row({rh,i, cvalues, cellTd, firstCellId, tableCode}) {
  return X`
    <tr>
      <td class=row-header><label for=${firstCellId+i}>${rh}</label></td>
      ${cvalues.map((_,j) => cellTd({i,j,  id: j == 0 ? firstCellId+i : ''}))}
    </tr>
  `;
}

function getValues(indexFunc) {
  const values = [];
  let valIndex = 0, value;
  while(value=indexFunc(valIndex)) {
    values.push(value);
    valIndex++;
  }
  return values;
}
