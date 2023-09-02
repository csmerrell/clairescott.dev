//react
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

//components
import TaskProgressBar from './TaskProgressBar';

//data
import { DashboardContext } from '../context/DashboardContext';

//types
import type { ComponentParams } from '@/model/ReactCustom';
import type { DashboardState } from '../model/Dashboard';
import type { CondensedTask, TaskEntry } from '../model/Tasks';

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
      &:nth-child(3n+1) {
        padding-left: 0;
      }
    }
  }
`;

//methods
const condenseTasks = (tasks: TaskEntry[]) => {
  const result: Record<string, CondensedTask> = {}
  tasks.forEach((task) => {
    if(!result[task.key]) {
      result[task.key] = {
        ...task,
        progressEntries: [
          {
            date: task.date,
            progress: task.progress
          }
        ]
      }
    } else {
      result[task.key].progress = Math.max(result[task.key].progress, task.progress)
      result[task.key].progressEntries.push({
        date: task.date,
        progress: task.progress
      });
    }
  });

  return Object.values(result).map(task => {
    task.progressEntries = task.progressEntries.sort((task1, task2) => {
      return task1.date < task2.date ? -1 : 1;
    });

    return task
  });
};

const getRecentDates = (tasks: TaskEntry[]): [number,number] => {
  const sortedDates = tasks.map(task => task.date.getTime()).sort((date1, date2) => date2 - date1);
  return Array.from(new Set(sortedDates)).slice(0,2) as [number,number];
}

//component definition
const Tasks: React.FC<ComponentParams> = ({ className }) => {
  //state logic
  const dashboardState = useContext(DashboardContext) as DashboardState;
  const [taskEls, setTaskEls] = useState([] as JSX.Element[]);

  useEffect(() => {
    if (!dashboardState.taskEntries) return;
    const tasks = condenseTasks(dashboardState.taskEntries);
    const recentDates = getRecentDates(dashboardState.taskEntries)
    const newTaskEls = tasks.map(task => (
      <TaskProgressBar
        key={`${task.key}-${task.date}-${task.progress}`}
        className="task"
        task={task}
        recentDates={recentDates}
      />
    ));
  
    setTaskEls(newTaskEls);
  }, [dashboardState]);

  //template
  return (
    <StyledTasks className={`task-list ${className ? ' ' + className : ''}`}>
      {taskEls}
    </StyledTasks>
  );
};

export default Tasks;
