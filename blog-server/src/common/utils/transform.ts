export const transformToNumber = (ids: string): number[] => {
  return ids.split(',').map((v: string) => parseInt(v));
};
