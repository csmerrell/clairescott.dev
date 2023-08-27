//React
import React from 'react';
import styled from 'styled-components';

//Components
import Header from './Header';
import LeftNav from './LeftNav';

//Types
import type { ComponentWithChildren } from 'ReactCustom';

//Component definition
const HUD: React.FC<ComponentWithChildren> = ({ children }) => {
  //state logic

  //slot logic
  const mainModuleContent = React.Children.toArray(children).find(
    (child) => (child as JSX.Element)?.props?.slot === 'main-module'
  );

  //styles
  const StyledHUD = styled.div`
    display: flex;
    flex-flow: column;
    overflow: hidden;

    .hud-body {
      display: flex;
      flex-flow: row;

      .main-panel {
        overflow: auto;
      }
    }
  `;

  //template
  return (
    <StyledHUD>
      <Header />
      <div className="hud-body">
        <LeftNav className="left-nav" />
        <div className="main-panel">{mainModuleContent}</div>
      </div>
    </StyledHUD>
  );
};

export default HUD;
