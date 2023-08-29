//react
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams } from '@/types/ReactCustom';
export type AnimatedProgressBarParams = ComponentParams & {
  label: string;
  progress: number; //[0 - 100]
};

//styles
const StyledProgressBar = styled.div`
  .bar-outer {
    border: 1px solid var(--clr-border);
    border-radius: 0.25rem;
    width: 20rem;
    height: 1.5rem;
    .bar-inner {
      --progress-bar: 0;
      width: var(--progress-bar);
      height: 100%;
      transition: width 0.5s ease-out;
      background-color: var(--clr-primary);
    }
  }
`;

//component definition
const AnimatedProgressBar: React.FC<AnimatedProgressBarParams> = ({
  label,
  progress,
  className,
}) => {
  //state logic
  const innerBar = useRef(null);
  useEffect(() => {
    if (!innerBar.current) return;
    (innerBar.current as HTMLDivElement).style.setProperty(
      '--progress-bar',
      `${progress}%`
    );
  }, [innerBar, progress]);

  //slot logic

  //template
  return (
    <StyledProgressBar className={className ? ' ' + className : ''}>
      <label>{label}</label>
      <div className="bar-outer">
        <div ref={innerBar} className="bar-inner"></div>
      </div>
    </StyledProgressBar>
  );
};

export default AnimatedProgressBar;
