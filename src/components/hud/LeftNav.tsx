//react
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

//components
import CoordinateContainer from '@/components/layout/CoordinateContainer';

//types
import type { ComponentParams } from '@/model/ReactCustom';

//styles
const StyledLeftNav = styled.div`
  &.left-nav {
    position: relative;
    border-right: 1px solid var(--clr-border);
    box-shadow: 0 0 5px 0.5px var(--clr-border);
    background-color: var(--clr-bg-light-5);

    .nav-panel {
      width: 0;
      overflow: hidden;
      transition: width 0.5s ease-out;
    }

    &.expanded {
      .nav-panel {
        width: 16rem;
        .expander {
          padding: 0.5rem;
          padding-left: 0;
          left: unset;
          right: 0;
          border: none;
          top: -1.5rem;
          .fa {
            transform: scaleX(-1);
          }
        }
      }
    }

    .expander {
      position: absolute;
      left: 100%;
      padding: 0.5rem;
      font-size: 1.5rem;
      color: var(--clr-secondary);
      cursor: pointer;
      transition: color 0.2s ease-out;

      border: 1px solid var(--clr-border);
      border-left-color: var(--clr-bg);
      background-color: var(--clr-bg-light-5);
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;

      .fa {
        transition:
          transform 0.5s ease-out,
          position 0.2s ease-out;
      }

      &:hover {
        color: var(--clr-font);
      }
    }
  }
`;

//component definition
const LeftNav: React.FC<ComponentParams> = ({ className }) => {
  //state logic
  const [expanded, setExpanded] = useState(false);
  const [toggling, setToggling] = useState(false);
  const navPanel = useRef<HTMLDivElement | null>(null);

  const unlockToggling = (event: Event) => {
    if (event.target != navPanel.current) return;
    setToggling(false);
    navPanel.current?.removeEventListener('transitionend', unlockToggling);
  };

  const toggle = () => {
    if (!toggling) {
      setToggling(true);
      setExpanded(!expanded);
      navPanel.current?.addEventListener('transitionend', unlockToggling);
    }
  };

  //slot logic

  //template
  return (
    <StyledLeftNav
      className={`
        left-nav ${className} 
        ${expanded ? 'expanded' : ''} 
        ${toggling ? 'toggling' : ''}
      `}
    >
      <CoordinateContainer>
        <div ref={navPanel} className={`nav-panel`}>
          <span className="expander" onClick={toggle}>
            <span className="fa fa-chevron-right" />
          </span>
        </div>
      </CoordinateContainer>
    </StyledLeftNav>
  );
};

export default LeftNav;
