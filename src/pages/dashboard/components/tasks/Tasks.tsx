//react
import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
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
import useTaskContext from './context/useTaskContext';

//styles
const StyledTasks = styled.div`
  .task-list {
    .task {
      width: 100%;
    }
  }
  .see-more {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    color: var(--clr-blue);
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: var(--clr-blue-light-5);
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
  const taskContext = useTaskContext();
  const [taskEls, setTaskEls] = useState([] as JSX.Element[]);
  const [fixedHeight, setFixedHeight] = useState<number | null>(null);
  const [allVisible, setAllVisible] = useState<boolean>(false);

  const el = useRef(null);

  const onExpanded = useCallback(() => {
    setFixedHeight(null);
  }, []);

  const updateTasks = useCallback(() => {
    if (!el.current) return;
    const recencyMap = getRecencyMap(dashboardState.taskEntries);
    const tasks = condenseTasks(dashboardState.taskEntries, recencyMap);
    setFixedHeight((el.current as HTMLElement).scrollHeight);
    const newTaskEls = tasks
      .filter((task) => {
        const hasDefaultTasks = task.progressEntries.some(
          (e) => !(e.isLatest || e.isSecond)
        );
        const hasSecondTasks = task.progressEntries.some((e) => e.isSecond);
        return !taskContext.secondCanAnimate
          ? hasDefaultTasks
          : !taskContext.latestCanAnimate
          ? hasDefaultTasks || hasSecondTasks
          : true;
      })
      .map((task) => (
        <TaskProgressBar
          key={`${task.key}`}
          className="task"
          task={task}
          onExpanded={onExpanded}
        />
      ));

    setTaskEls(newTaskEls);
  }, [
    dashboardState,
    taskContext.secondCanAnimate,
    taskContext.latestCanAnimate,
    onExpanded,
  ]);

  useEffect(() => {
    if (!dashboardState.taskEntries) return;
    updateTasks();
  }, [dashboardState, updateTasks]);

  //template
  return (
    <StyledTasks className={`${className ? ' ' + className : ''}`}>
      <div
        ref={el}
        className="task-list"
        style={{ height: fixedHeight ? `${fixedHeight}px` : 'auto' }}
      >
        {allVisible ? taskEls : taskEls.slice(0, 6)}
      </div>
      {taskEls.length > 6 ? (
        <div
          className="see-more"
          onClick={() => {
            setAllVisible(!allVisible);
          }}
        >
          {allVisible ? 'See Less' : 'See More'}
        </div>
      ) : null}
    </StyledTasks>
  );
};

export const TaskWrapper: React.FC<ComponentParams> = ({ className }) => {
  return (
    <TaskProvider>
      <Tasks className={`${className ? ' ' + className : ''}`} />
    </TaskProvider>
  );
};

export default TaskWrapper;
