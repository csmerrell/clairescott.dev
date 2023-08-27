//react
import React from 'react';
import styled from 'styled-components';

//components

//types

//component definition
const Header: React.FC = () => {
  //state logic

  //slot logic

  //styles
  const StyledHeader = styled.div`
    .hud-header {
      .brand {
        display: flex;
        flex-flow: row;
        align-items: center;

        font-size: 2rem;

        img {
          height: 1em;
        }
      }
    }
  `;

  //template
  return (
    <StyledHeader className="hud-header">
      <div className="brand">
        <img src="logo/csmLogoPink.png" alt="Claire's Logo" />
        Claire Scott Merrell
      </div>
    </StyledHeader>
  );
};

export default Header;
