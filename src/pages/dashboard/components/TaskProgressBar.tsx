//react
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams } from '@/model/ReactCustom';
import { CondensedTask } from '../model/Tasks';
export type AnimatedProgressBarParams = ComponentParams & {
  task: CondensedTask;
  recentDates: [Date, Date];
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
    border: 1px solid var(--clr-border);
    border-radius: 0.25em;
    width: 100%;
    height: 1.5em;
    overflow: hidden;
    .bar-inner {
      height: 100%;

      .defualt {
        background-color: var(--clr-blue-light-5);
      }
      .second {
        background-color: var(--clr-blue);
      }
      .closest {
        background-color: var(--clr-blue-dark-5);
      }
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
  const innerBars = useRef(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedProgress_Default, setAnimatedProgress_Default] = useState(0);
  const [animatedProgress_Second, setAnimatedProgress_Second] = useState(0);
  const [animatedProgress_Closest, setAnimatedProgress_Closest] = useState(0);
  const [currTask, setCurrTask] = useState(
    {} as { date: Date; progress: number }
  );

  const [closestDate, secondDate] = recentDates;
  let progressIdx = 0;

  useEffect(() => {
    if (animatedProgress === task.progress || !innerBars.current) return;
    if (animatedProgress === task.progressEntries[progressIdx].progress) {
      progressIdx++;
      if (progressIdx > task.progressEntries.length - 1) return;
    }
    if (!currTask || currTask.date != task.progressEntries[progressIdx].date) {
      setCurrTask(task.progressEntries[progressIdx]);
    }

    const incrementDefault = () => {
      setAnimatedProgress((prev) => {
        const nextProgress = Math.min(prev + 1, currTask.progress);
        return nextProgress;
      });
      setAnimatedProgress_Default((prev) => {
        const nextProgress = Math.min(prev + 1, currTask.progress);
        return nextProgress;
      });
    };

    const incrementSecond = () => {
      setAnimatedProgress((prev) => {
        const nextProgress = Math.min(prev + 1, currTask.progress);
        return nextProgress;
      });
      setAnimatedProgress_Second((prev) => {
        const nextProgress = Math.min(
          prev + 1,
          currTask.progress - animatedProgress_Default
        );
        return nextProgress;
      });
    };

    const incrementClosest = () => {
      setAnimatedProgress((prev) => {
        const nextProgress = Math.min(prev + 1, currTask.progress);
        return nextProgress;
      });
      setAnimatedProgress_Closest((prev) => {
        const nextProgress = Math.min(
          prev + 1,
          currTask.progress - animatedProgress_Default - animatedProgress_Second
        );
        return nextProgress;
      });
    };

    const timeout = setTimeout(() => {
      if (currTask.date >= closestDate) {
        incrementClosest();
      } else if (secondDate && currTask.date >= secondDate) {
        incrementSecond();
      } else {
        incrementDefault();
      }
    }, 5);

    return () => clearTimeout(timeout);
  }, [
    animatedProgress,
    progressIdx,
    currTask,
    task,
    secondDate,
    closestDate,
    animatedProgress_Default,
    animatedProgress_Second,
    animatedProgress_Closest,
  ]);
  //slot logic

  //template
  return (
    <StyledProgressBar className={className ? ' ' + className : ''}>
      <label className="progress-label">
        <span className="name">{task.desc}</span>
        <span className="percentage">{animatedProgress}%</span>
      </label>

      <div className="bar-outer">
        <div ref={innerBars}>
          <div
            className="bar-inner default"
            style={{ width: `${animatedProgress_Default}%` }}
          />
          <div
            className="bar-inner second"
            style={{ width: `${animatedProgress_Second}%` }}
          />
          <div
            className="bar-inner default"
            style={{ width: `${animatedProgress_Closest}%` }}
          />
        </div>
      </div>
    </StyledProgressBar>
  );
};

export default TaskProgressBar;
