//react
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams } from '@/model/ReactCustom';
export type AnimatedProgressBarParams = ComponentParams & {
  label: string;
  progress: number; //[0 - 100]
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
      background-color: var(--clr-primary);
    }
  }
`;

//component definition
const TaskProgressBar: React.FC<AnimatedProgressBarParams> = ({
  label,
  progress,
  className,
}) => {
  //state logic
  const innerBar = useRef(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (progress === animatedProgress) return;
    setTimeout(() => {
      if (!innerBar.current) return;

      setAnimatedProgress(Math.min(animatedProgress + 1, progress));
    }, 10);
  }, [innerBar, progress, animatedProgress]);

  //slot logic

  //template
  return (
    <StyledProgressBar className={className ? ' ' + className : ''}>
      <label className="progress-label">
        <span className="name">{label}</span>
        <span className="percentage">{animatedProgress}%</span>
      </label>

      <div className="bar-outer">
        <div
          ref={innerBar}
          className="bar-inner"
          style={{ width: `${animatedProgress}%` }}
        ></div>
      </div>
    </StyledProgressBar>
  );
};

export default TaskProgressBar;
