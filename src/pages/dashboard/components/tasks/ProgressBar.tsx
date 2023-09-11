//react
import React, { useCallback, useState, useEffect, useRef } from 'react';
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
  onExpanded: () => void;
};

//styles
const StyledProgressBar = styled.div`
  &.awaits-transition {
    height: 0;
    opacity: 0;
    transition:
      height 0.3s ease-in,
      opacity 0.2s ease-in;
  }
  &.awaits-transition:not(.expanded) {
    padding: 0;
  }

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
  }
`;

//component definition
const ProgressBar: React.FC<AnimatedProgressBarParams> = ({
  task,
  className,
  onExpanded,
}) => {
  /**
   * State Init
   * */
  const mounted = useRef<boolean | null>(null);
  const taskContext = useTaskContext();
  const el = useRef(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  /**
   * Static init
   * */
  const hasDefaultTasks = task.progressEntries.some(
    (e) => !(e.isLatest || e.isSecond)
  );
  const hasSecondTasks = task.progressEntries.some((e) => e.isSecond);

  /**
   * Callbacks
   * */
  //Informs the context that this bar's currently animating segment has finished animating.
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

  //Increments the task's total animated progress (for the % counter)
  const incrementProgress = useCallback((): void => {
    setAnimatedProgress(animatedProgress + 1);
  }, [animatedProgress]);

  //When hidden components finish expanding their height, fade them in.
  const localOnExpanded = useCallback(() => {
    if (!el.current) return;

    const element = el.current as HTMLElement;
    element.removeEventListener('transitionend', localOnExpanded);
    element.style.setProperty('opacity', '1');
    onExpanded();
  }, [onExpanded]);

  /**
   * Observables
   * */
  //Expand hidden tasks before they appear.
  useEffect(() => {
    if (!el.current) return;
    if (
      (hasSecondTasks && taskContext.secondCanAnimate) ||
      taskContext.latestCanAnimate
    ) {
      const element = el.current as HTMLElement;
      element.style.setProperty('height', `${element.scrollHeight}px`);
      element.addEventListener('transitionend', localOnExpanded);
    }
  }, [
    hasDefaultTasks,
    hasSecondTasks,
    taskContext.secondCanAnimate,
    taskContext.latestCanAnimate,
    localOnExpanded,
  ]);

  //one time execution block -- only executes on first mount
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    //Add new task keys to the context lists for later comparison
    task.progressEntries.forEach((entry) => {
      if (entry.isLatest) {
        taskContext.latestTasks.push(task.key);
      } else if (entry.isSecond) {
        taskContext.secondTasks.push(task.key);
      } else if (!(entry.isLatest || entry.isSecond)) {
        taskContext.defaultTasks.push(task.key);
      }
    });
  });

  /**
   * Iterable Child Templates
   * */
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

  /**
   * Main Template
   * */
  return (
    <StyledProgressBar
      className={`
        ${!hasDefaultTasks ? 'awaits-transition' : ''}
        ${className ? `${className} ` : ''}
      `}
      ref={el}
    >
      <label className="progress-label">
        <span className="name">{task.desc}</span>
        <span className="percentage">{animatedProgress}%</span>
      </label>

      <div className="bar-outer">{progressSegments}</div>
    </StyledProgressBar>
  );
};

export default ProgressBar;
