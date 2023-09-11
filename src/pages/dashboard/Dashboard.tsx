//react
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//components
import EpicSnapshot from './components/epicSnapshot/EpicSnapshot';
import Tasks from './components/tasks/Tasks';
import TrelloPortal from './components/TrelloPortal';
import Card from '@/components/layout/Card';

//data
import { parseData } from '@/data/parser';
import dashboardSchemata from './data/index';
import { DashboardContext, DashboardState } from './context/DashboardContext';

//types
import type { ComponentParams } from '@/model/ReactCustom';

//styles
const StyledDashboard = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;

  .card-wrapper {
    flex-grow: 1;
    box-sizing: border-box;
    padding: 1rem 0.5rem;
    padding-top: 0;

    display: flex;
    .card {
      flex-grow: 1;
    }

    &.dev-time {
      flex-basis: 38%;
      min-width: 22rem;
      max-width: 34rem;
    }
    &.tasks {
      flex-basis: 62%;
      min-width: 20rem;
    }
    &.trello {
      flex-basis: 100%;
      min-width: 40rem;
    }
  }

  @media screen and (max-width: 1060px) {
    .card-wrapper.dev-time {
      max-width: unset;
    }
  }

  @media screen and (max-width: 720px) {
    .card-wrapper {
      &.dev-time,
      &.tasks,
      &.trello {
        min-width: unset;
        flex-basis: 100%;
      }
    }
  }
`;

//component definition
const Dashboard: React.FC<ComponentParams> = ({ className }) => {
  //state logic
  const [dashboardState, setDashboardState] = useState({} as DashboardState);

  useEffect(() => {
    const parsed = parseData({
      isMock: true,
      schemata: dashboardSchemata,
    });
    setDashboardState(parsed as DashboardState);
  }, []);

  //template
  return (
    <DashboardContext.Provider value={dashboardState}>
      <StyledDashboard className={className ? ' ' + className : ''}>
        <div className="card-wrapper dev-time">
          <Card>
            <EpicSnapshot />
          </Card>
        </div>
        <div className="card-wrapper tasks">
          <Card>
            <Tasks />
          </Card>
        </div>
        <div className="card-wrapper trello">
          <Card>
            <div slot="card-header">Development Pipeline</div>
            <TrelloPortal />
          </Card>
        </div>
      </StyledDashboard>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
