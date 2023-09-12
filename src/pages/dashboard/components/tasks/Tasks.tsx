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
import ProgressBar from './ProgressBar';

//data
import { TaskProvider } from './context/TaskContext';
import {
  DashboardContext,
  DashboardState,
} from '@/pages/dashboard/context/DashboardContext';

//types
import type { ComponentParams } from '@/model/ReactCustom';
import useTaskContext from './context/useTaskContext';
import Legend from './Legend';

//styles
const StyledTasks = styled.div`
  --clr-default-task: var(--clr-pale-blue);
  --clr-default-task-border: var(--clr-pale-blue-dark-5);
  --clr-second-task: var(--clr-light-blue);
  --clr-second-task-border: var(--clr-light-blue-dark-5);
  --clr-latest-task: var(--clr-blue);
  --clr-latest-task-border: var(--clr-blue-dark-5);

  .header-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .task-list {
    .task {
      width: 100%;
    }
  }

  .see-more-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    .see-more {
      color: var(--clr-blue);
      text-decoration: underline;
      cursor: pointer;

      &.disabled {
        cursor: not-allowed;
      }

      &:not(.disabled):hover {
        color: var(--clr-blue-light-5);
      }
    }
  }
`;

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

  useEffect(() => {
    if (!dashboardState.taskEntries || taskContext.tasks.length > 0) return;
    taskContext.initTasks(dashboardState.taskEntries);
  }, [dashboardState, taskContext]);

  useEffect(() => {
    if (!el.current) return;
    setFixedHeight((el.current as HTMLElement).scrollHeight);
    const newTaskEls = taskContext.tasks
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
        <ProgressBar
          key={`${task.key}`}
          className="task"
          task={task}
          onExpanded={onExpanded}
        />
      ));

    setTaskEls(newTaskEls);
  }, [
    onExpanded,
    taskContext.latestCanAnimate,
    taskContext.secondCanAnimate,
    taskContext.tasks,
  ]);

  //template
  return (
    <StyledTasks className={`${className ? ' ' + className : ''}`}>
      <div className="header-wrapper">
        <div className="card-header">Task Progress:</div>
        <Legend />
      </div>
      <div
        ref={el}
        className="task-list"
        style={{ height: fixedHeight ? `${fixedHeight}px` : 'auto' }}
      >
        {allVisible ? taskEls : taskEls.slice(0, 6)}
      </div>
      {taskEls.length > 6 ? (
        <div className="see-more-wrapper">
          <div
            className={`see-more ${
              !taskContext.animationsDone ? 'disabled' : ''
            }`}
            onClick={() => {
              if (!taskContext.animationsDone) return;
              setAllVisible(!allVisible);
            }}
          >
            {allVisible ? 'See Less' : 'See More'}
          </div>
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
