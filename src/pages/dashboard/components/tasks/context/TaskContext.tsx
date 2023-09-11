//react
import React, { createContext, useState, ReactNode, useEffect } from 'react';

//data
import { condenseTasks, getRecencyMap } from '../util/taskListParsing';

//types
import type {
  CondensedTask,
  TaskEntry,
  TaskRecencyMap,
} from '@/pages/dashboard/model/Tasks';

interface ITaskState {
  tasks: CondensedTask[];
  recencyMap: TaskRecencyMap | null;
  defaultTasks: string[];
  animatedDefaultTasks: string[];
  secondTasks: string[];
  animatedSecondTasks: string[];
  secondCanAnimate: boolean;
  latestTasks: string[];
  animatedLatestTasks: string[];
  latestCanAnimate: boolean;
  animationsDone: boolean;
  initTasks: (taskEntries: TaskEntry[]) => void;
  updateCompletion: () => void;
}

interface ITaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<ITaskState | undefined>(undefined);

export const TaskProvider: React.FC<ITaskProviderProps> = ({ children }) => {
  const [rawTasks, setRawTasks] = useState<TaskEntry[]>([]);
  const [tasks, setTasks] = useState<CondensedTask[]>([]);
  const [recencyMap, setRecencyMap] = useState<TaskRecencyMap | null>(null);
  const [secondCanAnimate, setSecondCanAnimate] = useState<boolean>(false);
  const [latestCanAnimate, setLatestCanAnimate] = useState<boolean>(false);
  const [animationsDone, setAnimationsDone] = useState<boolean>(false);
  const [debounceTick, setDebounceTick] = useState<number>(0);
  const defaultTasks: string[] = [];
  const animatedDefaultTasks: string[] = [];
  const secondTasks: string[] = [];
  const animatedSecondTasks: string[] = [];
  const latestTasks: string[] = [];
  const animatedLatestTasks: string[] = [];

  const updateCompletion = () => {
    if (
      !secondCanAnimate &&
      defaultTasks.length === animatedDefaultTasks.length
    ) {
      setDebounceTick(0);
      setTimeout(() => {
        setSecondCanAnimate(true);
        setDebounceTick(new Date().getTime());
      }, 500);
    }

    if (
      !latestCanAnimate &&
      secondCanAnimate &&
      secondTasks.length === animatedSecondTasks.length
    ) {
      if (debounceTick + 50 >= new Date().getTime()) {
        setTimeout(updateCompletion, 50);
        return;
      }
      setDebounceTick(0);
      setTimeout(() => {
        setLatestCanAnimate(true);
        setDebounceTick(new Date().getTime());
      }, 500);
    }

    if (latestCanAnimate && latestTasks.length === animatedLatestTasks.length) {
      if (debounceTick + 50 >= new Date().getTime()) {
        setTimeout(updateCompletion, 50);
        return;
      }
      setAnimationsDone(true);
    }
  };

  const initTasks = (taskEntries: TaskEntry[]) => {
    setRawTasks(taskEntries);
    setRecencyMap(getRecencyMap(taskEntries));
  };

  useEffect(() => {
    if (rawTasks.length === 0 || recencyMap === null) return;
    setTasks(condenseTasks(rawTasks, recencyMap as TaskRecencyMap));
  }, [recencyMap, rawTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        recencyMap,
        defaultTasks,
        animatedDefaultTasks,
        secondTasks,
        animatedSecondTasks,
        secondCanAnimate,
        latestTasks,
        animatedLatestTasks,
        latestCanAnimate,
        animationsDone,
        initTasks,
        updateCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
