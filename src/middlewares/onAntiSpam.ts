import { general } from "../configuration/general";

const userFilter = new Map();

export const isFiltered = (sender: string) => {
  if (!userFilter.has(sender)) {
    return false;
  }

  const { count, timeoutId } = userFilter.get(sender);
  return count >= 2 && timeoutId !== null;
};

export const addFilter = (sender: string) => {
  if (!userFilter.has(sender)) {
    userFilter.set(sender, { count: 0, timeoutId: null });
  }

  const { count, timeoutId } = userFilter.get(sender);
  if (count < 2) {
    userFilter.set(sender, { count: count + 1, timeoutId });

    if (count === 0) {
      const newTimeoutId = setTimeout(() => {
        userFilter.set(sender, { count: 0, timeoutId: null });
        if (userFilter.get(sender).count === 0) {
          userFilter.delete(sender);
        }
      }, general.TIMEOUT_IN_MILLISECONDS_BY_EVENT);

      userFilter.set(sender, { count: 1, timeoutId: newTimeoutId });
    }
  }
};
