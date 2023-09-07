//react
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

//components
import ProgressSegment from './ProgressSegment';

//data
import useTaskContext from './context/useTaskContext';

//types
import type { ComponentParams } from '@/model/ReactCustom';
import type { CondensedTask } from '@/pages/dashboard/model/Tasks';
type AnimatedProgressBarParams = ComponentParams & {
  task: CondensedTask;
};

//styles
const StyledProgressBar = styled.div`
  .progress-label {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;

    .name {
      flex-grow: 1;
    }

    .percentage {
      justify-self: flex-end;
    }
  }

  .bar-outer {
    position: relative;
    border: 1px solid var(--clr-border);
    border-radius: 0.25em;
    width: 100%;
    height: 1.5em;
    overflow: hidden;
    .bar-inner {
      position: absolute;
      right: 0;
      height: 100%;
      background-color: var(--clr-bg);
    }
  }
`;

//component definition
const TaskProgressBar: React.FC<AnimatedProgressBarParams> = ({
  task,
  className,
}) => {
  //state logic
  const taskContext = useTaskContext();
  const [animatedProgress, setAnimatedProgress] = useState(0);

  //callbacks
  const markAnimationDone = useCallback(
    (key: string, isLatest: boolean, isSecond: boolean): void => {
      if (isLatest) {
        taskContext.animatedLatestTasks.push(key);
      } else if (isSecond) {
        taskContext.animatedSecondTasks.push(key);
      } else {
        taskContext.animatedDefaultTasks.push(key);
      }
      taskContext.updateCompletion();
    },
    [taskContext]
  );

  const incrementProgress = useCallback((): void => {
    setAnimatedProgress(animatedProgress + 1);
  }, [animatedProgress]);

  task.progressEntries.forEach((entry) => {
    if (entry.isLatest && !taskContext.latestTasks.includes(task.key)) {
      taskContext.latestTasks.push(task.key);
    } else if (entry.isSecond && !taskContext.secondTasks.includes(task.key)) {
      taskContext.secondTasks.push(task.key);
    } else if (
      !(entry.isLatest || entry.isSecond) &&
      !taskContext.defaultTasks.includes(task.key)
    ) {
      taskContext.defaultTasks.push(task.key);
    }
  });

  //list-templates
  const progressSegments = task.progressEntries.map((entry) => (
    <ProgressSegment
      key={`${task.key}-${entry.date}`}
      progressEntry={entry}
      currentProgress={animatedProgress}
      className={`inner-bar`}
      tick={entry.isLatest ? 30 : entry.isSecond ? 15 : 5}
      onAnimationDone={markAnimationDone}
      incrementProgress={incrementProgress}
    />
  ));

  //template
  return (
    <StyledProgressBar className={className ? ' ' + className : ''}>
      <label className="progress-label">
        <span className="name">{task.desc}</span>
        <span className="percentage">{animatedProgress}%</span>
      </label>

      <div className="bar-outer">{progressSegments}</div>
    </StyledProgressBar>
  );
};

export default TaskProgressBar;
