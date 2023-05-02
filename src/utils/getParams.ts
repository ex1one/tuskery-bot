export const getParams = <T extends object>(params: string[]): T => {
  return params.reduce((acc, param) => {
    const value = param.split('=');

    acc[value[0]] = Number(value[1]);

    return acc;
  }, {} as T);
};
