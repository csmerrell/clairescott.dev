//react
import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

//components
import TaskProgressBar from './TaskProgressBar';

//data
import { TaskProvider } from './context/TaskContext';
import {
  DashboardContext,
  DashboardState,
} from '@/pages/dashboard/context/DashboardContext';
import { condenseTasks } from './util/taskCondenser';

//types
import type { ComponentParams } from '@/model/ReactCustom';
import type { TaskEntry, TaskRecencyMap } from '@/pages/dashboard/model/Tasks';

//styles
const StyledTasks = styled.div`
  &.task-list {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    .task {
      --padding-left: 1rem;
      --basis-percent: calc((100% - var(--padding-left) * 2) / 3);

      flex-basis: var(--basis-percent);
      padding-left: var(--padding-left);
      &:nth-child(3n + 1) {
        padding-left: 0;
      }
    }
  }
`;

//methods
const getRecencyMap = (tasks: TaskEntry[]): TaskRecencyMap => {
  const sortedDates = tasks
    .map((task) => task.date.getTime())
    .sort((task1, task2) => task2 - task1);
  const uniqueDates = new Set(sortedDates);
  return {
    latest: Array.from(uniqueDates)[0],
    second: uniqueDates.size > 1 ? Array.from(uniqueDates)[1] : undefined,
  };
};

//component definition
const Tasks: React.FC<ComponentParams> = ({ className }) => {
  //state logic
  const dashboardState = useContext(DashboardContext) as DashboardState;
  const [taskEls, setTaskEls] = useState([] as JSX.Element[]);

  const updateTasks = useCallback(() => {
    const recencyMap = getRecencyMap(dashboardState.taskEntries);
    const tasks = condenseTasks(dashboardState.taskEntries, recencyMap);
    const newTaskEls = tasks.map((task) => (
      <TaskProgressBar key={`${task.key}`} className="task" task={task} />
    ));

    setTaskEls(newTaskEls);
  }, [dashboardState]);

  useEffect(() => {
    if (!dashboardState.taskEntries) return;
    updateTasks();
  }, [dashboardState, updateTasks]);

  //template
  return (
    <TaskProvider>
      <StyledTasks className={`task-list ${className ? ' ' + className : ''}`}>
        {taskEls}
      </StyledTasks>
    </TaskProvider>
  );
};

export default Tasks;
