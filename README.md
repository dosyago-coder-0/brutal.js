# 🌿 [exoteric](https://github.com/c9fe/exoteric) [![npm](https://img.shields.io/npm/v/exoteric.svg?label=&color=0080FF)](https://github.com/c9fe/exoteric/releases/latest) ![npm downloads total](https://img.shields.io/npm/dt/dumbass)

> The tool of choice for the madding crowd

**Tooling shouldn't be hard to understand.**

Make components from cross-browser web standards without thinking too hard. 

**exoteric** is a library to help. 

## Why?

> ### exoteric
>
> /ˌɛksə(ʊ)ˈtɛrɪk/
>
> *adjective* `FORMAL`
>
> intended for or likely to be understood by the general public.

### [Kernighan's Law](https://github.com/dwmkerr/hacker-laws#kernighans-law)

> Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.
>
> (Brian Kernighan)

Kernighan's Law is named for [Brian Kernighan](https://en.wikipedia.org/wiki/Brian_Kernighan) and derived from a quote from Kernighan and Plauger's book [The Elements of Programming Style](https://en.wikipedia.org/wiki/The_Elements_of_Programming_Style):

> Everyone knows that debugging is twice as hard as writing a program in the first place. So if you're as clever as you can be when you write it, how will you ever debug it?

While hyperbolic, Kernighan's Law makes the argument that simple code is to be preferred over complex code, because debugging any issues that arise in complex code may be costly or even infeasible.

## So, what's this?

No JSX, no Shadow DOM, no fancy framworks, no opinions.

- **Just HTML, CSS and JavaScript**—No JSX, no Shadow DOM, no fancy frameworks, no opinions. 
- **Stop learning, stagnate!**—Use the syntax you already know. Stop learning new things. Do more with what's already here.
- **Crazy and fun, but in a serious way**—exoteric is the tool for people who don't want to think too hard to make UI. 

*To learn more*...oh wait, you already know enough. 

### be exoteric

```javascript     
function Spin(n) {
  return e`  
    <div 
      wheel:passive=${spin}
      touchmove:passive=${move}
    >
      <h1>
        <progress 
          max=1000
          value=${n}
        ></progress>
        <hr>
        <input 
          input=${step}
          type=number 
          value=${n}>
    </div>
  `;
}
```

## Still not bored?

You soon will be. Nothing notable here: [Play with the full example on CodePen](https://codepen.io/dosycorp/pen/OJPQQzB?editors=1000)

See [even more boring code](https://github.com/c9fe/exoteric/blob/master/tests/rvanillatodo/src/app.js) in a 250 line [TodoMVC test](https://c9fe.github.io/exoteric/tests/rvanillatodo/)

## Holy secular install mantras

Install exoteric with npm:

```console
npm i --save exoteric
```

[Parcel](https://parceljs.org) or [Webpack](https://webpack.js.org) exoteric and import:

```js
import { e } from 'exoteric'
```

[See a CodeSandbox how-to of above](https://codesandbox.io/s/exoteric-playground-7drzg)

Or import in a module:

```html
<script type=module>
  import { e } from 'https://unpkg.com/exoteric'
</script>
```

[See a CodePen how-to of above](https://codepen.io/dosycorp/pen/OJPQQzB?editors=1000)

--------

# Basic Examples

## Components

### Defining 

```js
const Title = state => e`<h1>${state}</h1>`
```

### Nesting

```js
const Parent = state => e`<main>${Title(state)}</main>`;
```

### Inserting

```js
Parent("Hello").to('body', 'beforeEnd');
```

### Updating

```js
Parent("Greetings");
let i = 1;
setTimeout(() => Parent(`${i++} 'Hi's`), 3000);
```

### ToDo ~MVC~ Example

```js
function App(state) {
  const {list} = state;
  return e`
    <header class=header>
      <h1>todos</h1>
      <input autofocus
        class=new-todo 
        placeholder="What needs to be done?"
        keydown=${newTodoIfEnter} 
      >
    </header>
    <main>
      ${TodoList(list)}
      ${Footer()}
    </main>
  `;
}

function TodoList(list) {
  return e`
    <ul class=todo-list>
      ${list.map(Todo)}
    </ul>
  `;
}
```

### Updating on events

```js
  function newTodoIfEnter(keyEvent) {
    if ( keyEvent.key !== 'Enter' ) return;
    
    State.todos.push(makeTodo(keyEvent.target.value));
    TodoList(State.todos);
    keyEvent.target.value = '';
  }
 ```
 
## Properties

Do not exist. 

## Global State

is nothing special.

## Routing 

```js
function changeHash(e) {
  e.preventDefault();
  history.replaceState(null,null,e.target.href);
  routeHash();
}

function routeHash() {
  switch(location.hash) {
    case "#/active":                listActive(); break;
    case "#/completed":             listCompleted(); break;
    case "#/":          default:    listAll(); break;
  }
}

function Routes() {
  return e`
    <ul class=filters>
      <li>
        <a href=#/ click=${changeHash}
          class=${location.hash == "#/" ? 'selected' : ''}>All</a>
      </li>
      <li>
        <a href=#/active click=${changeHash}
          class=${location.hash == "#/active" ? 'selected' : ''}>Active</a>
      </li>
      <li>
        <a href=#/completed click=${changeHash}
          class=${location.hash == "#/completed" ? 'selected' : ''}>Completed</a>
      </li>
    </ul>
  `
}
```

-----

*Most of the examples above are taken from in a 250 line [TodoMVC test](https://c9fe.github.io/exoteric/tests/rvanillatodo/), the [full code of which you can see here.](https://github.com/c9fe/exoteric/blob/master/tests/rvanillatodo/src/app.js).*

# *Can you hear the people sing*
