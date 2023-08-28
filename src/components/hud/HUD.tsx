//React
import React from 'react';
import styled from 'styled-components';

//Components
import Header from './Header';
import LeftNav from './LeftNav';
import { ComponentParams, SlotChildElement } from '@/types/ReactCustom';

//styles
const StyledHUD = styled.div`
  &.hud {
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-flow: column;
    overflow: hidden;

    .hud-body {
      flex-grow: 1;
      display: flex;
      flex-flow: row;

      .main-panel {
        overflow: auto;
      }

      > * {
        padding-top: 1rem;
      }
    }
  }
`;

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

  //template
  return (
    <StyledHUD className="hud">
      <Header />
      <div className="hud-body">
        <LeftNav className="left-nav" />
        <div id="main-panel">{mainModuleContent}</div>
      </div>
    </StyledHUD>
  );
};

export default Hud;
