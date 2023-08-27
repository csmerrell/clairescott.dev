//react
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

//components

//types
type LeftNavProps = {
  className: string;
};

//component definition
const LeftNav: React.FC<LeftNavProps> = ({ className }) => {
  //state logic
  const [expanded, setExpanded] = useState(true);
  const [toggling, setToggling] = useState(false);
  const navPanel = useRef<HTMLDivElement | null>(null);

  //lock toggling anytime the navPanel is mid-animation
  useEffect(() => {
    const unlockToggling = () => {
      setToggling(false);
      navPanel.current?.removeEventListener('transitionend', unlockToggling);
    };

    setToggling(true);
    navPanel.current?.addEventListener('transitionend', unlockToggling);
  }, [expanded]);

  const toggle = () => {
    if (!toggling) setExpanded(!expanded);
  };

  //slot logic

  //styles
  const StyledLeftNav = styled.div`
    .left-nav {
      .nav-panel {
        width: 0;
        transition: width 0.3s ease-out;
      }

      &.expanded {
        .nav-panel {
          width: 12rem;
        }
      }
    }
  `;

  //template
  return (
    <StyledLeftNav
      className={`left-nav ${className} ${expanded ? 'expanded' : ''}`}
    >
      <div>
        {expanded && (
          <div ref={navPanel} className={`nav-panel`}>
            <span className="nav-dismiss fa fa-times" onClick={() => toggle} />
          </div>
        )}
        {!expanded && (
          <span
            className="left-nav-expander fa fa-chevron-right"
            onClick={toggle}
          />
        )}
      </div>
    </StyledLeftNav>
  );
};

export default LeftNav;
