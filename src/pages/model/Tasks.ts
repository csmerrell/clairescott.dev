export type TaskEntry = {
  name: string;
  date: Date;
  progress: number;
  storyPoints: number;
  trelloData: TrelloItem[];
};

export type TrelloItem = unknown;
