export type TaskEntry = {
  date: Date;
  desc: string;
  key: string;
  progress: number;
  storyPoints: number;
  trelloData: TrelloItem[];
};

export type CondensedTask = TaskEntry & {
  progressEntries: TaskProgressEntry[];
};

export type TaskProgressEntry = {
  key: string;
  date: Date;
  isLatest: boolean;
  isSecond: boolean;
  progress: number;
  trelloData: TrelloItem[];
};

/**
 * second-latest date will be undefined if:
 *  - There are no tasks beyond the latest date.
 *  - The second-latest date isn't the day before the latest.
 */
export type TaskRecencyMap = {
  latest: number;
  second?: number;
};

export type TrelloItem = unknown;
