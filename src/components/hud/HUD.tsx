import style from "./styles/hud.scss?inline";

import React, { ReactNode } from "react";

import Header from "./Header";
import LeftNav from "./LeftNav";

const HUD: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mainModuleContent = React.Children.toArray(children).find(
    (child) => (child as JSX.Element)?.props?.slot === "main-module",
  );

  return (
    <div className={style}>
      <Header />
      <div className="hud-body">
        <LeftNav />
        <div className="main-panel">{mainModuleContent}</div>
      </div>
    </div>
  );
};

export default HUD;
