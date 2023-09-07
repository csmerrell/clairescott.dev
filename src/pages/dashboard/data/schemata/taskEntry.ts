import { SchemaMap } from '@/model/data/Schema';

export const taskEntrySchemata: SchemaMap = {
  name: {
    type: String,
    default: 'Unnamed Task',
    parser: (data) => {
      return data.name as string;
    },
    description: `A user-visible task name displayed as a label.`,
  },
  date: {
    type: Date,
    default: null,
    parser: (data) => {
      return data.date as Date;
    },
    description: `The date the below progress % was reached.`,
  },
  progress: {
    type: Number,
    required: true,
    parser: (data) => {
      return data.progress as number;
    },
    description:
      'A number [0 - 100] representing the percentage of the task that has been completed.',
  },
  storyPoints: {
    type: Number,
    default: 1,
    parser: (data) => {
      return data.storyPoints as number;
    },
    description: 'The number of stoyPoints that were estimated for this task.',
  },
  trelloData: {
    type: Array,
    default: [],
    parser: (data) => {
      return data.trelloData as unknown[]; //type to be defined.
    },
    description:
      'An array of `TrelloItem` entries, to be embedded in a hover popout on a give task.',
  },
};

export default taskEntrySchemata;
