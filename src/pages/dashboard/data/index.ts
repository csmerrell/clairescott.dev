import { parseData } from '@/data/parser';
import { SchemaMap } from '@/model/data/Schema';
import taskEntries from '@/pages/mocks/taskEntries';
import taskEntrySchemata from './schemata/taskEntry';

export const DashboardData: SchemaMap = {
  taskEntries: {
    type: Array,
    required: true,
    mock: taskEntries,
    parser: (data) => {
      return Object.values(
        data.taskEntries as Record<string, unknown>[]
      ).reduce((result: Record<string, unknown>[], taskEntry) => {
        const parsedEntry = parseData({
          rawData: taskEntry,
          schemata: taskEntrySchemata,
        });
        return result.concat([parsedEntry]);
      }, []);
    },
    description: `
      An array of \`TaskEntry\` items that record progress made on individual tasks any given day.

      May include an array Trello card references to embed inside a popout for the task.
    `,
  },
};

export default DashboardData;
