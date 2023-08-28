//react
import React, { useState, useRef, TransitionEvent } from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams } from '@/types/ReactCustom';

//styles
const StyledLeftNav = styled.div`
  &.left-nav {
    position: relative;
    border-right: 1px solid var(--clr-border);
    box-shadow: 0 0 5px 0.5px var(--clr-border);
    .nav-panel {
      width: 0;
      overflow: hidden;
      transition: width 0.5s ease-out;

      .dismisser {
        font-size: 1.5rem;
        color: var(--clr-secondary);
        position: absolute;
        right: 1rem;
        top: 0.5rem;
        cursor: pointer;
        transition: color 0.2s ease-out;

        &:hover {
          color: var(--clr-font);
        }
      }
    }

    &.expanded {
      .nav-panel {
        width: 16rem;
      }
    }

    .expander {
      position: absolute;
      padding: 0.5rem 0.5rem;
      font-size: 1.5rem;
      color: var(--clr-secondary);
      cursor: pointer;
      transition: color 0.2s ease-out;

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
      <div>
        <div ref={navPanel} className={`nav-panel`}>
          <span className="dismisser fa fa-times" onClick={toggle} />
        </div>
        {!expanded && !toggling && (
          <span className="expander fa fa-chevron-right" onClick={toggle} />
        )}
      </div>
    </StyledLeftNav>
  );
};

export default LeftNav;
