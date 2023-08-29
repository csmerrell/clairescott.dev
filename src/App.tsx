import Hud from './components/hud/Hud';

import AnimatedProgressBar from './components/charts/AnimatedProgressBar';

function App() {
  return (
    <Hud>
      <div slot="main-module">
        <AnimatedProgressBar label="Test" progress={50} />
      </div>
    </Hud>
  );
}

export default App;
