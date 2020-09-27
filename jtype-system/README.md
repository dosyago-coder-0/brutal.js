# :balance_scale: [jtype-system](https://github.com/crislin2046/jtype-system) ![npm downloads](https://img.shields.io/npm/dt/jtype-system) ![version](https://img.shields.io/npm/v/jtype-system?label=%22%22)

Simple type-checking system for JavaScript at runtime.

## getting and incorporating

We use ES modules.

You can use in your client side code like:

```JavaScript
  import {T} from 'https://unpkg.com/jtype-system/t.js';
```

While the tests are currently only written for client side, you can use in Node.js like so:

```shell
$ npm i --save jtype-system
```

```JavaScript
import {T} from 'jtype-system';
```

But you'll need to be using [ESM](https://www.npmjs.com/package/esm) or ES Modules.

## Why not TypeScript

I think TS is good as a type-aware linter for checking issues, but in my experience adding static types that are then stripped away (in a time-consuming compile process):

1) Increases developer time, more time to code the smae module
2) Lengthens feedback and testing loop, more time to compile
3) Does not meaningfully reduce the types of bugs I tend to accidentally introduce in my code

I'm not saying typescript is never a good thing. I think every developer is different and so everyone should pick the tools that work for them. In my experience, the types of bugs I end up with are not ones that are solved by static typing. The type of custom runtime type checking I introduce with `jtype-system` I find useful and noticed I was doing again and again in various functions as a form of testing and input guarding boiler plate. So I wrote this library to make that experience more pleasurable, because that's important, but also to separate the 'cross-cutting concern' of type-checking logic from specific application and module logic.

I like to use things like `eslint` and `typescript` to tighten up my code, and give me feedback and another perspective on structure and so on, but I don't think typescript is necessary to build whole projects in, in my experience (with full-stack JS projects from less to 100 to above 30K lines of code).

## Another reason I like this

Apart from writing it myself to suit my own work style, which is a great reason to like something, I like this because, if I want to change the syntax, or add some new feature that I want, it's really easy to change the library, which is only a couple hundred lines of code. If I wanted the same results from a third-party library, I'd have to wait. 

## Summary of motivation

So, on the whole, tools like this are, for me, about increasing my speed and effectiveness, as well as enjoyment. Enjoyment and fun is the main thing, and speed and effectiveness are really important, so that's why I write stuff like this to help me.

It's surprising to me that this library has more than 2500 downloads form NPM, and regularly around 100 downloads a week, so clearly people are using it in their private projects. 

## Example

```javascript
import {T} from './t.js';
  Object.assign(self, {T});

  T.def('Cris', {
    a: { b: { c: T`String` }}
  });

  const result1 = T.validate(T`Cris`, {a:1});
  console.log({result1});
  console.assert(!result1.valid);

  const result2 = T.validate(T`Cris`, {a:{b:{c:'asdsad'}}});
  console.log({result2});
  console.assert(result2.valid);

  T.defCollection(`DOMList`, {
    container: T`>NodeList`,
    member: T`>Node`
  });

  const result3 = T.validate(T`DOMList`, document.querySelectorAll('*'));
  const result4 = T.validate(T`DOMList`, document.body.childNodes);

  console.log({result3});
  console.assert(result3.valid);
  console.log({result4});
  console.assert(result4.valid);

  T.defTuple(`TypeMapping`, {
    pattern: [T`String`, T`>Object`]
  });

  T.defCollection(`TypeMap`, {
    container: T`Map`,
    member: T`TypeMapping`
  });

  const result5 = T.validate(T`TypeMap`, T[Symbol.for('jtype-system.typeCache')]);

  console.log({result5});
  console.assert(result5.valid);

  const result6 = [
    T.check(T`Iterable`, []),
    T.check(T`Iterable`, "ASDSAD"),
    T.check(T`Iterable`, new Set()),
    T.check(T`Iterable`, document.querySelectorAll('*')),
    T.check(T`Iterable`, {}),
    T.check(T`Iterable`, 12312),
  ];

  console.log({result6});
  console.assert(result6.join(',') == [true, true, true, true, false, false].join(','));

  T.defOr(`Key`, T`String`, T`Integer`);
  T.defOption(T`Key`);

  const keys = [
    "ASDSA",
    1312312,
    "asd",
    123122232
  ];
  const not_keys = [
    "ASDSA",
    1312312,
    "asd",
    1231.22232
  ];
  const gappy_keys = [
    "ASDSA",
    1312312,
    "asd",
    null,
    908098,
    null,
    "1232",
    'safsda'
  ];

  T.defCollection(`KeyList`, {container: T`Iterable`, member: T`Key`});
  T.defCollection(`OptionalKeyList`, {container: T`Iterable`, member: T`?Key`});

  const result7 = T.validate(T`KeyList`, keys);
  console.log({result7});
  console.assert(result7.valid);
  const result8 = T.validate(T`KeyList`, not_keys);
  console.log({result8});
  console.assert(!result8.valid);
  const result9 = T.validate(T`OptionalKeyList`, gappy_keys);
  console.log({result9});
  console.assert(result9.valid);


  T.def(`StrictContact`, {
    name: T`String`,
    mobile: T`Number`,
    email: T`String`
  }, {sealed:true});

  const result10 = T.validate(T`StrictContact`, {name:'Cris', mobile:999, email:'777@gmail.com'});
  const result11 = T.validate(T`StrictContact`, {name:'Cris', mobile:999, email:'777@gmail.com', new:true});

  console.log({result10});
  console.assert(result10.valid);
  console.log({result11});
  console.assert(!result11.valid);

  const result12 = T.partialMatch(T`StrictContact`, {name:'Mobile'});
  console.log({result12});
  console.assert(result12.valid);

  const result13 = T.partialMatch(T`StrictContact`, {name:'Mobile', blockhead:133133});
  console.log({result13});
  console.assert(!result13.valid);

  T.def('Err', {
    error: T`String`,
    status: T.defOr('MaybeInteger', T`Integer`, T`None`),
  });

  const result14 = T.validate(T`Err`, {error:'No such page'});
  console.log({result14});
  console.assert(result14.valid);

  T.def('Session', {
    id: T`String`
  });

  T.def('WrappedSession', {
    session: T`Session`
  });

  const result15 = T.validate(T`WrappedSession`, { session: {id : 'OK' }});
  console.log({result15});
  console.assert(result15.valid);
```


