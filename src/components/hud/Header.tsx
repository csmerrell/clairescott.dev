//react
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

//components
import Toggle from '../buttons/Toggle';

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

    .align-right {
      justify-self: flex-end;
      display: flex;
      flex-flow: row;
      align-items: center;

      > div {
        margin-right: 0.5rem;
      }

      .mock-toggle {
        margin-right: 2rem;
        display: flex;
        flex-flow: row;
        align-items: center;

        .toggle {
          position: relative;
          top: 1px;
        }
      }

      .contact {
        a {
          margin-right: 0.5rem;
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
    @media screen and (max-width: 800px) {
      .mock-toggle {
        display: none !important;
      }
    }

    @media screen and (max-width: 565px) {
      .email {
        display: none !important;
      }
    }

    @media screen and (max-width: 516px) {
      .github {
        display: none !important;
      }
      .linkedin {
        margin-right: 0 !important;
      }
    }

    @media screen and (max-width: 469px) {
      .linkedin {
        display: none !important;
      }
    }
  }
`;

//component definition
const Header: React.FC = () => {
  //state init
  const [dataMocked, setDataMocked] = useState(true);

  const toggleDataSource = useCallback(() => {
    setDataMocked(!dataMocked);
  }, [dataMocked]);

  //template
  return (
    <StyledHeader className="hud-header">
      <div className="brand">
        <img src="me/csmLogoPink.png" alt="Claire's Logo" />
        Claire Scott Merrell
      </div>
      <div className="spacer" />
      <div className="align-right">
        <div className="mock-toggle">
          Data:&nbsp;
          <Toggle
            toggled={!dataMocked}
            label={!dataMocked ? 'Live' : 'Mock'}
            width="4.75rem"
            onClick={toggleDataSource}
            disabled
          />
        </div>
        <div className="contact">
          <a
            href="mailto:claire@csmerrell.com"
            target="_blank"
            rel="noreferrer"
            className="email"
          >
            <span className="mail fa-regular fa-envelope" />
          </a>
          <a
            href="https://linkedin.com/in/csmerrell/"
            target="_blank"
            rel="noreferrer"
            className="linkedin"
          >
            <img src="logo/LI-In-Bug.png" />
          </a>
          <a
            href="https://github.com/csmerrell/"
            target="_blank"
            rel="noreferrer"
            className="github"
          >
            <img src="logo/github-mark-white.svg" />
          </a>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
