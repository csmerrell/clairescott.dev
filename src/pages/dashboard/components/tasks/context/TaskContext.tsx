import React, { createContext, useState, ReactNode } from 'react';

interface ITaskState {
  defaultTasks: string[];
  animatedDefaultTasks: string[];
  secondTasks: string[];
  animatedSecondTasks: string[];
  secondCanAnimate: boolean;
  latestTasks: string[];
  animatedLatestTasks: string[];
  latestCanAnimate: boolean;
  updateCompletion: () => void;
}

interface ITaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<ITaskState | undefined>(undefined);

export const TaskProvider: React.FC<ITaskProviderProps> = ({ children }) => {
  const defaultTasks: string[] = [];
  const animatedDefaultTasks: string[] = [];
  const secondTasks: string[] = [];
  const animatedSecondTasks: string[] = [];
  const latestTasks: string[] = [];
  const animatedLatestTasks: string[] = [];
  const [secondCanAnimate, setSecondCanAnimate] = useState<boolean>(false);
  const [latestCanAnimate, setLatestCanAnimate] = useState<boolean>(false);

  const updateCompletion = () => {
    if (defaultTasks.length === animatedDefaultTasks.length) {
      setTimeout(() => {
        setSecondCanAnimate(true);
      }, 500);
    }

    if (secondCanAnimate && secondTasks.length === animatedSecondTasks.length) {
      setTimeout(() => {
        setLatestCanAnimate(true);
      }, 1600);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        defaultTasks,
        animatedDefaultTasks,
        secondTasks,
        animatedSecondTasks,
        secondCanAnimate,
        latestTasks,
        animatedLatestTasks,
        latestCanAnimate,
        updateCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
