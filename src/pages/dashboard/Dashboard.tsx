//react
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//components
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
  .progress-item {
    font-size: 1.25rem;
  }
  .card {
    margin: 1rem 0.5rem;
    margin-top: 0;
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
        <Card>
          <div slot="card-header">Task Completion</div>
          <Tasks />
        </Card>
        <Card>
          <div slot="card-header">Development Pipeline</div>
          <TrelloPortal />
        </Card>
      </StyledDashboard>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
