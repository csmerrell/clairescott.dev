//react
import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams } from '@/model/ReactCustom';
import {
  DashboardContext,
  DashboardState,
} from '../../context/DashboardContext';
import { condenseTasks } from '../tasks/util/taskCondenser';

//styles
const StyledEpicSnapshot = styled.div`
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
      margin-bottom: 1.5rem;
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

      &.stack {
        label {
          flex-basis: 100%;
        }
        code {
          flex-basis: 100%;
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
const EpicSnapshot: React.FC<ComponentParams> = ({ className }) => {
  //state logic
  const dashboardState = useContext(DashboardContext) as DashboardState;
  const [currentStoryPoints, setCurrentStoryPoints] = useState(0);
  const [currentDevHours, setCurrentDevHours] = useState(0);

  const getTaskData = useCallback(() => {
    const tasks = condenseTasks(dashboardState.taskEntries);
    const [devHours, storyPoints] = tasks.reduce(
      ([sumDevHours, sumStoryPoints], task): [number, number] => {
        return [
          sumDevHours + task.devHours,
          sumStoryPoints + (task.storyPoints * task.progress) / 100,
        ];
      },
      [0, 0]
    );
    setCurrentDevHours(devHours);
    setCurrentStoryPoints(Math.floor(storyPoints));
  }, [dashboardState.taskEntries]);

  useEffect(() => {
    if (!dashboardState.taskEntries) return;
    getTaskData();
  }, [dashboardState, getTaskData]);

  //template
  return (
    <StyledEpicSnapshot className={`dev-time ${className ? className : ''}`}>
      <div className="card-header">
        Deploy MVP
        <br />
        <small>(Current Epic)</small>
      </div>
      <div className="focal-item">
        <div className="hours">{currentDevHours}</div>
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
        <div>{currentStoryPoints} / 44</div>
      </div>
      <div className="line stack">
        <label>Stack:</label>
        <code>Typescript, React, CSS/Styled Components</code>
        <code>Vite, ESLint, Git, AWS Amplify</code>
      </div>
      <div className="line">
        <label>New Skill(s):</label>
        <ul>
          <li>
            Context provider/consumer API as a complete alternative to Redux.
          </li>
          <li>Upcoming: Trello & Github OAuth.</li>
        </ul>
      </div>
    </StyledEpicSnapshot>
  );
};

export default EpicSnapshot;
