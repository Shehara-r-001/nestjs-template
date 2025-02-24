/**
 * use to exclude properties from an object
 * @param obj parent object contains the key/s to be removed
 * @param keys array of keys to be removed
 * @returns
 */
const excludeProperty = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj };

  keys.forEach((key) => delete result[key]);

  return result;
};

export { excludeProperty };
