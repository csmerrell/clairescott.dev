import { createContext } from 'react';
import { TaskEntry } from '../model/Tasks';

export type DashboardState = {
  taskEntries: TaskEntry[];
};

export const DashboardContext = createContext({} as DashboardState);
