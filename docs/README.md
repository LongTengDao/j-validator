
```js
const { is, and, not, bigint, number, every, tuple } = require('@ltd/j-validator');

const basic = is({
    id: and(bigint, not(0n)),
    name: /^\w+ \w+$/,
    age: number,
    friends: every(bigint),
});

console.log(basic({
    id: 1n,
    name: 'XiaoMing Tang',
    age: 8,
    friends: [ 2n, 3n ],
}));
// true

const magic = tuple`
    ${'read'}
        ${'text'}
        ${'binary'}
    ${'write'}
        ${string}
        ${Buffer.isBuffer}
`;

console.log(magic([ 'read', 'text' ]));// true

console.log(magic([ 'write', '...' ]));// true

console.log(magic([ 'write', false ]));// false

```
