



```js

const canvas = ref(null);

function initCanvas() { 
    canvas.value = document.getElementById("canvas1"); // 假设页面上已经有了 canvas1
    canvas.value = document.createElement('canvas')
}


const ctx = canvas.getContext('2d') // 拿到canvas画布的2d画笔对象 
const webgl = canvas.getContext('webgl'); // 获取 canvas webgl对象 
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```