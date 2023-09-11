//react
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//types
import type { ComponentParams } from '@/model/ReactCustom';
import useTaskContext from './context/useTaskContext';

//styles
const StyledLegend = styled.div`
  &.legend {
    align-self: flex-start;

    flex-shrink: 1;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    column-gap: 2em;

    .item {
      transition: opacity 0.5s ease-in;
      opacity: 1;
      display: flex;
      flex-flow: row;
      align-items: center;
      &.hidden {
        opacity: 0;
      }

      .color-box {
        display: inline-block;
        position: relative;
        top: 1px;
        width: 0.7em;
        height: 0.7em;
        margin-right: 0.4em;
        border-radius: 0.2em;
        background-color: var(--clr-default-task);
      }

      &.second .color-box {
        background-color: var(--clr-second-task);
      }

      &.latest .color-box {
        background-color: var(--clr-latest-task);
      }
    }
  }
`;

//methods
const formatDate = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}/${String(
    date.getFullYear()
  ).slice(-2)}`;
};

//component definition
const Legend: React.FC<ComponentParams> = ({ className }) => {
  //state logic
  const taskContext = useTaskContext();
  const [defaultDisplay, setDefaultDisplay] = useState('');
  const [secondDisplay, setSecondDisplay] = useState('');
  const [latestDisplay, setLatestDisplay] = useState('');

  useEffect(() => {
    if (!taskContext.recencyMap?.default) return;
    setDefaultDisplay(
      `${formatDate(new Date(taskContext.recencyMap.oldest))} - ${formatDate(
        new Date(taskContext.recencyMap!.default as number)
      )}`
    );
  }, [taskContext.recencyMap]);

  useEffect(() => {
    if (!(taskContext.secondCanAnimate && taskContext.recencyMap?.second)) {
      return;
    }
    setSecondDisplay(
      formatDate(new Date(taskContext.recencyMap!.second as number))
    );
  }, [taskContext.secondCanAnimate, taskContext.recencyMap]);

  useEffect(() => {
    if (!taskContext.latestCanAnimate) return;
    setLatestDisplay(
      formatDate(new Date(taskContext.recencyMap!.latest as number))
    );
  }, [taskContext.latestCanAnimate, taskContext.recencyMap]);

  //template
  return (
    <StyledLegend className={`legend ${className ? ' ' + className : ''}`}>
      <div className={`item latest ${latestDisplay === '' ? 'hidden' : ''}`}>
        <span className="color-box" />
        <span>{latestDisplay}</span>
      </div>
      <div className={`item second ${secondDisplay === '' ? 'hidden' : ''}`}>
        <span className="color-box" />
        <span>{secondDisplay}</span>
      </div>
      <div className={`item default ${defaultDisplay === '' ? 'hidden' : ''}`}>
        <span className="color-box" />
        <span>{defaultDisplay}</span>
      </div>
    </StyledLegend>
  );
};

export default Legend;
