//react
import React from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams } from '@/model/ReactCustom';

//styles
const StyledDevTime = styled.div`
  &.dev-time {
    .card-header {
      display: flex;
      flex-flow: row;
      align-items: flex-start;
      margin-left: -0.1em;
      small {
        font-size: 0.5em;
        margin-left: 0.5em;
        margin-top: -0.25em;
        color: var(--clr-secondary);
      }
    }

    .focal-item {
      margin-top: -1.25rem;
      margin-bottom: 3rem;
      padding: 0 2rem;
      font-size: 7em;
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      align-items: flex-end;
      color: var(--clr-bold-pink);
      .hours {
        line-height: 0.9em;
      }
      .text {
        color: var(--clr-pink);
        margin-left: 0.75rem;
        font-size: 0.3em;
        line-height: 1em;
      }
    }

    .line {
      margin-top: 0.5rem;
      display: flex;
      flex-flow: row;
      align-items: flex-end;
      flex-wrap: wrap;
      font-size: 1.25em;

      &.boilerplate {
        label {
          flex-basis: 100%;
        }
        code {
          margin-left: 1rem;
          color: var(--clr-pink);
        }
      }

      label {
        margin-right: 0.75em;
        font-size: 0.85em;
        color: var(--clr-light-gray);
      }

      ul {
        margin: 0;
        font-size: 0.8em;
        margin-left: 0.5em;
        color: var(--clr-light-gray);
        padding-left: 1.5em;
      }
    }
  }
`;

//component definition
const DevTime: React.FC<ComponentParams> = ({ className }) => {
  //state logic

  //slot logic

  //template
  return (
    <StyledDevTime className={`dev-time ${className ? className : ''}`}>
      <div className="card-header">
        Deploy MVP
        <br />
        <small>(Current Epic)</small>
      </div>
      <div className="focal-item">
        <div className="hours">46</div>
        <div className="text">
          dev
          <br />
          hours
        </div>
      </div>
      <div className="line">
        <label>Start date:</label>
        <div>{new Date(2023, 7, 24).toDateString()}</div>
      </div>
      <div className="line">
        <label>Story Point Progress:</label>
        <div>29 / 44*</div>
      </div>
      <div className="line boilerplate">
        <label>Boilerplate:</label>
        <div>
          <code>npm create vite@latest --template react</code>
        </div>
      </div>
      <div className="line">
        <label>New Skills:</label>
        <ul>
          <li className="long-text">
            Try out React's provider/consumer Context API as a complete
            alternative to Redux.
          </li>
        </ul>
      </div>
    </StyledDevTime>
  );
};

export default DevTime;
