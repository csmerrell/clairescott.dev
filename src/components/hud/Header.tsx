//react
import React from 'react';
import styled from 'styled-components';

//components

//types

//styles
const StyledHeader = styled.div`
  &.hud-header {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;

    background-color: var(--clr-bg-light-5);
    z-index: var(--header);
    padding: 0.25rem 1rem;
    border-bottom: 1px solid var(--clr-border);
    box-shadow: 0 0 5px 0.5px var(--clr-border);
    .brand {
      display: flex;
      flex-flow: row;
      align-items: center;

      font-size: 2.5rem;

      img {
        height: 1em;
        margin-right: 0.5rem;
      }
    }

    .spacer {
      flex-grow: 1;
    }

    .contact {
      justify-self: flex-end;
      a {
        margin-right: 1rem;
        img {
          position: relative;
          top: 3px;
          height: 2em;
        }

        .fa-regular {
          font-size: 2rem;
          margin-right: 0.5rem;
          color: var(--clr-light-gray);

          &:hover {
            color: var(--clr-white);
          }
        }
      }
    }
  }
`;

//component definition
const Header: React.FC = () => {
  //state logic

  //slot logic

  //template
  return (
    <StyledHeader className="hud-header">
      <div className="brand">
        <img src="me/csmLogoPink.png" alt="Claire's Logo" />
        Claire Scott Merrell
      </div>
      <div className="spacer" />
      <div className="contact">
        <a href="mailto:claire@csmerrell.com" target="_blank" rel="noreferrer">
          <span className="mail fa-regular fa-envelope" />
        </a>
        <a
          href="https://linkedin.com/in/csmerrell/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="logo/LI-In-Bug.png" />
        </a>
        <a
          href="https://github.com/csmerrell/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="logo/github-mark-white.svg" />
        </a>
      </div>
    </StyledHeader>
  );
};

export default Header;
