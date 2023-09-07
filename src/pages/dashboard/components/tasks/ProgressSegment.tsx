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
    if (progressEntry.isLatest && taskContext.latestCanAnimate) {
      setProgressDiff(initialProgress.current);
    } else if (progressEntry.isSecond && taskContext.secondCanAnimate) {
      setProgressDiff(initialProgress.current);
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
    if (animatedSegmentProgress + progressDiff == progressEntry.progress) {
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
      className={`progress-segment${className ? ' ' + className : ''}`}
      style={{ width: `${animatedSegmentProgress}%` }}
    />
  );
};

export default ProgressSegment;
