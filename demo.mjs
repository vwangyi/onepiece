console.log('pnpm demo');

const data = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 40 },
  { name: 'Bob', age: 40 }
];

const res = Object.values(
  data.reduce((prev, curr) => {
    prev[curr.name] = curr;
    return prev;
  }, {})
);

console.log(res);
