import { CondensedTask, TaskEntry, TaskRecencyMap } from '../../../model/Tasks';

export const condenseTasks = (
  tasks: TaskEntry[],
  recencyMap: TaskRecencyMap
) => {
  const result: Record<string, CondensedTask> = {};
  tasks.forEach((task) => {
    if (!result[task.key]) {
      result[task.key] = {
        ...task,
        progressEntries: [
          {
            key: task.key,
            date: task.date,
            isLatest: task.date.getTime() === recencyMap.latest,
            isSecond: task.date.getTime() === recencyMap.second,
            progress: task.progress,
            trelloData: task.trelloData,
          },
        ],
      };
    } else {
      result[task.key].progress = Math.max(
        result[task.key].progress,
        task.progress
      );

      const duplicateDefaultIdx = hasDuplicateDefault(task, recencyMap, result);
      if (duplicateDefaultIdx >= 0) {
        result[task.key] = getMergedTask(task, result, duplicateDefaultIdx);
      } else {
        result[task.key].progressEntries.push({
          key: task.key,
          date: task.date,
          isLatest: task.date.getTime() === recencyMap.latest,
          isSecond: task.date.getTime() === recencyMap.second,
          progress: task.progress,
          trelloData: task.trelloData,
        });
      }
      result[task.key].trelloData = result[task.key].trelloData.concat(
        task.trelloData
      );
    }
  });

  return Object.values(result).map((task) => {
    task.progressEntries = task.progressEntries.sort((task1, task2) => {
      return task1.isLatest ? 1 : !task2.isLatest && task1.isSecond ? 1 : -1;
    });

    return task;
  });
};

const hasDuplicateDefault = (
  task: TaskEntry,
  recencyMap: TaskRecencyMap,
  taskMap: Record<string, CondensedTask>
): number => {
  const isDefault = !(
    task.date.getTime() === recencyMap.latest ||
    task.date.getTime() === recencyMap.second
  );
  if (isDefault) {
    return taskMap[task.key].progressEntries.findIndex((entry) => {
      return !(entry.isLatest || entry.isSecond);
    });
  }
  return -1;
};

const getMergedTask = (
  task: TaskEntry,
  taskMap: Record<string, CondensedTask>,
  duplicateDefaultIdx: number
): CondensedTask => {
  //Only add the highest progress default to the entries. Combine all duplicates' trelloData
  const found = taskMap[task.key].progressEntries[duplicateDefaultIdx];
  const result = { ...taskMap[task.key] };
  result.progressEntries[duplicateDefaultIdx] = {
    ...found,
    date: task.date > found.date ? task.date : found.date,
    progress: Math.max(task.progress, found.progress),
    trelloData: found.trelloData.concat(task.trelloData),
  };
  return result;
};
