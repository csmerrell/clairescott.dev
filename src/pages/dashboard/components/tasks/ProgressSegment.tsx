//react
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

//context
import useTaskContext from './context/useTaskContext';

//types
import type { ComponentParams } from '@/model/ReactCustom';
import type { TaskProgressEntry } from '../../model/Tasks';
type ProgressSegmentParams = ComponentParams & {
  progressEntry: TaskProgressEntry;
  currentProgress: number;
  tick: number;
  incrementProgress: () => void;
  onAnimationDone: (key: string, isLatest: boolean, isSecond: boolean) => void;
};

//styles
const StyledProgressSegment = styled.div`
  &.progress-segment {
    display: inline-block;
    height: 100%;
    background-color: #cce6ff;
    border-left: 1px solid #b3d9ff;
    box-sizing: border-box;

    &.second {
      background-color: #4da6ff;
      border-left: 1px solid #3399ff;
    }

    &.latest {
      background-color: #0066cc;
      border-left: 1px solid #0059b3;
    }
  }
`;

//component definition
const ProgressSegment: React.FC<ProgressSegmentParams> = ({
  className,
  progressEntry,
  currentProgress,
  tick,
  incrementProgress,
  onAnimationDone,
}) => {
  //state logic
  const taskContext = useTaskContext();
  const initialProgress = useRef(currentProgress);
  const [progressDiff, setProgressDiff] = useState(0);
  const [animatedSegmentProgress, setAnimatedSegmentProgress] = useState(0);

  useEffect(() => {
    if (progressEntry.isLatest && taskContext.latestCanAnimate) {
      initialProgress.current = currentProgress;
    } else if (progressEntry.isSecond && taskContext.secondCanAnimate) {
      initialProgress.current = currentProgress;
    }
  }, [
    currentProgress,
    taskContext.latestCanAnimate,
    taskContext.secondCanAnimate,
    progressEntry,
  ]);

  useEffect(() => {
    if (taskContext.latestCanAnimate) {
      if (progressEntry.isLatest) {
        setProgressDiff(initialProgress.current);
      }
    } else if (taskContext.secondCanAnimate) {
      if (progressEntry.isSecond) {
        setProgressDiff(initialProgress.current);
      }
    }
  }, [
    progressEntry,
    taskContext.latestCanAnimate,
    taskContext.secondCanAnimate,
  ]);

  //observables
  useEffect(() => {
    if (progressEntry.isLatest && !taskContext.latestCanAnimate) return;
    if (progressEntry.isSecond && !taskContext.secondCanAnimate) return;
    if (animatedSegmentProgress + progressDiff >= progressEntry.progress) {
      onAnimationDone(
        progressEntry.key,
        progressEntry.isLatest,
        progressEntry.isSecond
      );
      return;
    }
    setTimeout(() => {
      setAnimatedSegmentProgress(animatedSegmentProgress + 1);
      incrementProgress(); //increment the parent's total progress.
    }, tick);
  }, [
    taskContext.latestCanAnimate,
    taskContext.secondCanAnimate,
    animatedSegmentProgress,
    progressDiff,
    progressEntry,
    tick,
    incrementProgress,
    onAnimationDone,
  ]);

  //template
  return (
    <StyledProgressSegment
      className={`progress-segment ${
        progressEntry.isLatest
          ? 'latest'
          : progressEntry.isSecond
          ? 'second'
          : ''
      }${className ? ' ' + className : ''}`}
      style={{ width: `${animatedSegmentProgress}%` }}
    />
  );
};

export default ProgressSegment;
