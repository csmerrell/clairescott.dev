import "./styles/App.scss";

import Hud from "./components/hud/HUD";

function App() {
  return (
    <>
      <Hud>
        <div slot="main-module">Hello World</div>
      </Hud>
    </>
  );
}

export default App;
