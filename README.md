# :bug: [dumbass](https://github.com/dosyago/dumbass) [![npm](https://img.shields.io/npm/v/dumbass.svg?label=&color=0080FF)](https://github.com/dosyago/dumbass/releases/latest) ![npm downloads total](https://img.shields.io/npm/dt/dumbass)

> Chosen by toddlers, insects, and stupid coders.

**Be boring, be dumb. Be too stupid for complex tools.**

Make components from cross-browser web standards without thinking too hard. 

## Why?

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
- **Crazy and fun, but in a serious way**—Dumbass is the tool for people who don't want to think too hard to make UI. 

*To learn more*...oh wait, you already know enough. 

### Gorgeous dumbass

```javascript     
function Spin(n) {
  return d`  
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

You soon will be. Nothing amazing here: [Play with the full example on CodePen](https://codepen.io/dosycorp/pen/OJPQQzB?editors=1000)

See [even more boring code](https://github.com/dosyago/dumbass/blob/master/tests/rvanillatodo/src/app.js) in a 250 line [TodoMVC test](https://dosyago.github.io/dumbass/tests/rvanillatodo/)

## Install mantras

Install dumbass with npm:

```console
npm i --save dumbass
```

[Parcel](https://parceljs.org) or [Webpack](https://webpack.js.org) dumbass and import:

```js
import { d } from "dumbass"
```

[See a CodeSandbox how-to of above](https://codesandbox.io/s/dumbass-playground-7drzg)

Or import in a module:

```html
<script type="module">
  import { d } from "https://unpkg.com/dumbass"
</script>
```

[See a CodePen how-to of above](https://codepen.io/dosycorp/pen/OJPQQzB?editors=1000)

--------

# Basic Examples

## Components

Components are pure views. Functions that take something and return **dumbass objects**. If the view needs state, it can take it as a parameter.

### Defining 

```js
const Component = state => d`<h1>${state}</h1>`
```

A **dumbass object** is your HTML template. It's just a standard JavaScript [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) you tag with the `d` function.

### Nesting

Nest components by slotting the result of calling the component into the template of the parent component.

```js
const Parent = state => d`<main>${Title(state)}</main>`;
```

### Mounting

The first time you call a top-level component, you should mount it to the document. 

```js
Parent("Hello").to('body', 'beforeEnd');
```

### Updating

In order to update some view, just call that function again. It's as simple as that.

```js
Parent("Greetings");
setTimeout(() => Parent("Hi"), 3000);
```

### Real-world example 

In the example below the `App` component nests `TodoList` and `Footer` components.

It also calls the `newTodoIfEnter` updator function on the `keydown` event of that input tag.

```js
function App(state) {
  const {list} = state;
  return d`
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus
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
  return d`
    <ul class=todo-list>
      ${list.map(Todo)}
    </ul>
  `;
}
```

You'll notice we don't pass `state` (the whole client state object) to every component. Components can define the parameters they take, and it's up to their embedding components to pass them the correct state. 

*You might also notice we're passing an Array into the template (in `TodoList`). That's OK so long as the Array only contains dumbass objects.*

### Updating on events

In order to update state and view in response to user input, you define *updator functions* and pass them into a template slot as the value of an attribute named for the event you respond to. The above real world example showed the `newTodoIfEnter` updator was hooked to occur on the `keydown` event.

```js
  function newTodoIfEnter(keyEvent) {
    if ( keyEvent.key !== 'Enter' ) return;
    
    State.todos.push(makeTodo(keyEvent.target.value));
    TodoList(State.todos);
    keyEvent.target.value = '';
  }
 ```
 
 Updator functions noramlly do two things:
 
 1. Update some state.
 2. Call the components that change in response to that update.
 
 They're a loose convention that makes explicit the mapping between state changes and view functions / components.  
 
 *You might also notice we manually empty the value. There's no strict binding between input values and state as enforced in more opinionated frameworks. You're free to write that sort of thing if you like, e.g: ``const NumberInput = n => d`<input type=number value=${n}>` ``;*
 
## Properties

There are no such things as properties in this "framework". A Component is simply a JavaScript function that returns dumbass object, which is just a template literal tagged with the `d` function.

The way that state is passed through to sub-components is simply through function calls, and the way that attributes and content are applied to elements is simply by slots in the dumbass template, just like in the above examples.

## Global State

Again, there is *nothing special* about "state" in this "framework". State is simply regular JavaScript variables. You use state the same way you use variables in your program. State needs to be in scope where you reference it.

State flows through the component tree via normal JavaScript function calls. A sub component receives state passed down from its parent component by a function call.

## Routing 

Routing is not natively provided so you need to wire it yourself. Here's an exmaple of one way to do it:

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
```

And you'll also need a place to list the routes:

```js
function Routes() {
  return d`
    <ul class="filters">
      <li>
        <a href="#/" click=${changeHash}
          class="${location.hash == "#/" ? 'selected' : ''}">All</a>
      </li>
      <li>
        <a href="#/active" click=${changeHash}
          class="${location.hash == "#/active" ? 'selected' : ''}">Active</a>
      </li>
      <li>
        <a href="#/completed" click=${changeHash}
          class="${location.hash == "#/completed" ? 'selected' : ''}">Completed</a>
      </li>
    </ul>
  `
}
```

-----

*Most of the examples above are taken from in a 250 line [TodoMVC test](https://dosyago.github.io/dumbass/tests/rvanillatodo/), the [full code of which you can see here.](https://github.com/dosyago/dumbass/blob/master/tests/rvanillatodo/src/app.js).*

# *Go forth, stagnate and be dumb!*
