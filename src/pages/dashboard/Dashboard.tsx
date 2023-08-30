//react
import React from 'react';
import styled from 'styled-components';

//components
import AnimatedProgressBar from '@/components/dataVisualization/AnimatedProgressBar';

//types
import type { ComponentParams } from '@/types/ReactCustom';
import TrelloPortal from '@/pages/dashboard/components/TrelloPortal';
import Card from '@/components/layout/Card';

//styles
const StyledDashboard = styled.div`
  padding: 0.5rem 1rem;
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

  //slot logic

  //template
  return (
    <StyledDashboard className={className ? ' ' + className : ''}>
      <Card>
        <div slot="card-header">Task Completion</div>
        <AnimatedProgressBar
          label="Test"
          progress={100}
          className="progress-item"
        />
      </Card>
      <Card>
        <div slot="card-header">Development Pipeline</div>
        <TrelloPortal />
      </Card>
    </StyledDashboard>
  );
};

export default Dashboard;
