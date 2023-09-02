export type TaskEntry = {
  key: string;
  desc: string;
  date: Date;
  progress: number;
  storyPoints: number;
  trelloData: TrelloItem[];
};

export type CondensedTask = TaskEntry & {
  progressEntries: {
    date: Date;
    progress: number;
  }[];
};

export type TrelloItem = unknown;
