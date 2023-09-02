//react
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams } from '@/model/ReactCustom';
import { CondensedTask } from '../model/Tasks';
export type AnimatedProgressBarParams = ComponentParams & {
  task: CondensedTask;
  recentDates: [number, number];
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
    --bar-bg-color: var(--clr-light-blue);

    position: relative;
    border: 1px solid var(--clr-border);
    border-radius: 0.25em;
    width: 100%;
    height: 1.5em;
    overflow: hidden;
    background: var(--bar-bg-color);
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
  recentDates,
  className,
}) => {
  //state logic
  const innerBar = useRef(null);
  const outerBar = useRef(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animatedProgress === task.progress || !innerBar.current) return;

    const timeout = setTimeout(() => {
      setAnimatedProgress((prevAnimatedProgress) => {
        const nextProgress = Math.min(prevAnimatedProgress + 1, task.progress);
        if (nextProgress === task.progress) {
          clearTimeout(timeout); // Clear the timeout when progress reaches its target
        }
        return nextProgress;
      });
    }, 5);

    return () => clearTimeout(timeout); // Cleanup the timeout on unmount or dependency change
  }, [task.progress, animatedProgress]);

  //static logic
  const [closestDate, secondDate] = recentDates;
  const closestProgress = task.progressEntries.find(
    (task) => task.date.getTime() === closestDate
  )?.progress;
  const secondProgress = task.progressEntries.find(
    (task) => task.date.getTime() === secondDate
  )?.progress;

  let defaultProgress = 0;
  task.progressEntries.forEach((entry) => {
    if (
      entry.date.getTime() !== closestDate &&
      entry.date.getTime() !== secondDate &&
      entry.progress > defaultProgress
    ) {
      defaultProgress = entry.progress;
    }
  });

  useEffect(() => {
    if (!outerBar.current) return;
    const gradientCutoffs = [];
    if (closestProgress) {
      gradientCutoffs.unshift(`var(--clr-blue-dark-5) ${closestProgress}%`);
      gradientCutoffs.unshift(
        `var(--clr-blue-dark-5) ${secondProgress ?? defaultProgress ?? 0}%`
      );
    }
    if (secondProgress) {
      gradientCutoffs.unshift(`var(--clr-blue) ${secondProgress}%`);
      gradientCutoffs.unshift(`var(--clr-blue) ${defaultProgress ?? 0}%`);
    }
    if (defaultProgress) {
      gradientCutoffs.unshift(`var(--clr-light-blue) ${defaultProgress}%`);
      gradientCutoffs.unshift(`var(--clr-light-blue) ${0}%`);
    }

    (outerBar.current as HTMLElement).style.setProperty(
      '--bar-bg-color',
      `linear-gradient(to right, ${gradientCutoffs.join(', ')})`
    );
  }, [outerBar, closestProgress, secondProgress, defaultProgress]);
  innerBar.current;

  //template
  return (
    <StyledProgressBar className={className ? ' ' + className : ''}>
      <label className="progress-label">
        <span className="name">{task.desc}</span>
        <span className="percentage">{animatedProgress}%</span>
      </label>

      <div ref={outerBar} className="bar-outer">
        <div
          ref={innerBar}
          className="bar-inner"
          style={{ width: `${100 - animatedProgress}%` }}
        ></div>
      </div>
    </StyledProgressBar>
  );
};

export default TaskProgressBar;
