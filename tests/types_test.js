import {e} from '../r.js';
import T from '../types.js';
import {Types} from '../types.js';

Object.assign(self, {T,Types});

const result0 = T.validate(T`Number`, 0);
console.log({result0});
console.assert(result0.valid);

const result01 = T.validate(T`KeyValue`, 0);
console.log({result01});
console.assert(result01.valid);

const result02 = T.validate(T`Key`, {key:0});
console.log({result02});
console.assert(result02.valid);


