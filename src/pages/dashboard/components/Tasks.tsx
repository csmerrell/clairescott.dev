//react
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

//components
import TaskProgressBar from '@/components/dataVisualization/TaskProgressBar';

//types
import type { ComponentParams } from '@/model/ReactCustom';
import { DashboardContext } from '../context/DashboardContext';
import { DashboardState } from '@/pages/model/Dashboard';
import { TaskEntry } from '@/pages/model/Tasks';

//styles
const StyledTasks = styled.div``;

//methods
const condenseTasks = (tasks: TaskEntry[]) => {
  return tasks;
  // return tasks.reduce((result: TaskEntry[], task) => {
  //   const found = result.find((t) => t.name == task.name);
  //   console.log(found);
  //   return result;
  // }, []);
};

//component definition
const Tasks: React.FC<ComponentParams> = ({ className }) => {
  //state logic
  const dashboardState = useContext(DashboardContext) as DashboardState;
  const [taskEls, setTaskEls] = useState([] as JSX.Element[]);

  useEffect(() => {
    // if (!dashboardState.taskEntries) return;
    // setTaskEls([]);
    // const taskEntries = condenseTasks(dashboardState.taskEntries);
    // for (const taskEntry of taskEntries) {
    //   debugger;
    //   setTaskEls((els) => [
    //     ...els,
    //     <TaskProgressBar
    //       key={`${taskEntry.name}-${taskEntry.date}`}
    //       label={taskEntry.name}
    //       progress={taskEntry.progress}
    //     />,
    //   ]);
    // }
  }, [dashboardState, taskEls]);

  //template
  return (
    <StyledTasks className={className ? ' ' + className : ''}>
      {taskEls}
    </StyledTasks>
  );
};

export default Tasks;
