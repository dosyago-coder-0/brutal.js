// types
  import {T} from './t.js';
  import {CODE} from './common.js';

  // T

    export default T;

  // Both SSR and Browser

    export const TKey = T.def('Key', {
      key: T.defOr('ValidKey', T`String`, T`Number`)
    });

    export const THandlers = T.def('Handlers', null, {verify: i => {
      const validObject = T.check(T`Object`, i);

      if ( ! validObject ) return false;

      const eventNames = Object.keys(i);
      const handlerFuncs = Object.values(i);
      const validNames = eventNames.every(name => T.check(T`String`, name));
      const validFuncs = handlerFuncs.every(func => T.check(T`Function`, func));
      const valid = validNames && validFuncs;

      return valid;
    }});

    export const TFuncArray = T.defCollection('FuncArray', {
      container: T`Array`,
      member: T`Function`
    });

    export const TEmptyArray = T.def('EmptyArray', null, {verify: i => Array.isArray(i) && i.length == 0});

    export const TMarkupObject = T.def('MarkupObject', {
      type: T`String`,
      code: T`String`,
      nodes: T`Array`,
      externals: T`Array`,
    }, {verify: v => v.type == 'MarkupObject' && v.code == CODE});

    export const TMarkupAttrObject = T.def('MarkupAttrObject', {
      type: T`String`,
      code: T`String`,
      str: T`String`
    }, {verify: v => v.type == 'MarkupAttrObject' && v.code == CODE});

  // Browser side

    export const TBrutalLikeObject = T.def('BrutalLikeObject', {
      code: T`String`,
      externals: T`Array`,
      nodes: T`Array`,
      to: T`Function`,
      update: T`Function`,
      v: T`Array`,
      oldVals: T`Array`
    });

    export const TBrutalObject = T.def('BrutalObject', {
      code: T`String`,
      externals: T`Array`,
      nodes: T`Array`,
      to: T`Function`,
      update: T`Function`,
      v: T`Array`,
      oldVals: T`Array`
    }, {verify: v => verify(v)});

    export const TBrutalArray = T.defCollection('BrutalArray', {
      container: T`Array`,
      member: T`BrutalObject`
    });

  // SSR

    export const TSBrutalObject = T.def('SBrutalObject', {
      str: T`String`,
      handlers: THandlers
    });

    export const TSBrutalArray = T.defCollection('SBrutalArray', {
      container: T`Array`,
      member: T`SBrutalObject`
    });

  // export

  export const BS = {TKey,THandlers,TFuncArray,TBrutalObject,TBrutalLikeObject,TBrutalArray};

  export const SSR = {TKey,THandlers,TFuncArray,TSBrutalObject,TSBrutalArray};

  export const Types = {BS,SSR};


  // verify function 
    function verify(v) {
      return CODE === v.code;
    }

