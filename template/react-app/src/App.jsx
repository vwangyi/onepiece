import { useState } from 'react';
import React from 'react';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { handleError } from 'vue';

function App() {
  const [msg, setMsg] = useState(1);

  function handleClick() {
    setMsg(msg + 1);
    setMsg(msg + 1);
    setMsg(msg + 1);
    // 虽然写了3次 但页面上只会渲染加一次的结果 因为 msg每次都是1  相当于赋值了3次 每次都是2 页面只渲染一次

    setMsg(msg + 1, () => setMsg(msg + 1, () => setMsg(msg + 1)));
  }
  return (
    <>
      <div>{msg}</div>
      <button onClick={() => handleClick()}>按钮</button>
    </>
  );
}

export default App;
