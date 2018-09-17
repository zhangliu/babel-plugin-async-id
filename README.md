# babel-plugin-babel-plugin-async-id

add async id

## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-babel-plugin-async-id
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-async-id"]
}
```

### Via CLI

```sh
$ babel --plugins babel-plugin-async-id script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["babel-plugin-async-id"]
});
```
