//React
import React from 'react';
import styled from 'styled-components';

//Components
import Header from './Header';
import LeftNav from './LeftNav';
import { ComponentParams, SlotChildElement } from '@/types/ReactCustom';

//Component definition
const Hud: React.FC<ComponentParams> = ({ children }) => {
  //state logic

  //slot logic
  const mainModuleContent = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement<SlotChildElement>(child) &&
      child.props.slot === 'main-module'
    );
  });

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

export default Hud;
