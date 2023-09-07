//React
import React from 'react';
import styled from 'styled-components';

//Components
import Header from './Header';
import LeftNav from './LeftNav';
import CoordinateContainer from '@/components/layout/CoordinateContainer';

//types
import type { ComponentParams, SlotChildElement } from '@/model/ReactCustom';

//styles
const StyledHUD = styled.div`
  &.hud {
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-flow: column;

    .hud-body {
      flex-grow: 1;
      display: flex;
      flex-flow: row;
      overflow: hidden;

      #main-panel,
      .left-nav {
        height: 100%;
        overflow-y: auto;
        > * {
          height: 100%;
        }
      }
    }
  }
`;

//Component definition
const Hud: React.FC<ComponentParams> = ({ children, className }) => {
  //state logic

  //slot logic
  const leftNavContent = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement<SlotChildElement>(child) &&
      child.props.slot === 'left-nav'
    );
  });

  const mainModuleContent = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement<SlotChildElement>(child) &&
      child.props.slot === 'main-module'
    );
  });

  //template
  return (
    <StyledHUD className={`hud${className ? ' ' + className : ''}`}>
      <Header />
      <div className="hud-body">
        <CoordinateContainer className="body-wrapper">
          {leftNavContent.length > 0 ? (
            <LeftNav className="left-nav">{leftNavContent}</LeftNav>
          ) : null}
          <div id="main-panel">{mainModuleContent}</div>
        </CoordinateContainer>
      </div>
    </StyledHUD>
  );
};

export default Hud;
