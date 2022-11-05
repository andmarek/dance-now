import logo from './logo.svg';
import Canvas from './Canvas';

import './App.css';
const draw = context => {

};

function App() {
  /*
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }
  */

  return (
    <div className="App">
      <p> JS Revolution </p>
      <Canvas draw={draw} height={576} width={1200}/>
    </div>
  );
}

export default App;
