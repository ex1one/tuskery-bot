import _ from 'lodash';

export function tryExtractParams(str: string) {
  // https://regex101.com/r/lfVpBD/1

  const params = [str].find((line) => /^((?:^| )+-\w+ [^-\n]+(?!-))+$/.exec(line));

  if (params) {
    const pars = _(` ${params} `.split(' -'))
      .map((onePar) => {
        const parts = onePar.trim().split(' ');
        return {
          par: parts[0]?.toLowerCase().trim() || '',
          val: parts.slice(1).join(' '),
        };
      })
      .filter((e) => !!e.par)
      .keyBy((e) => e.par)
      .mapValues((e) => e.val)
      .value();
    return pars;
  }
  return undefined;
}
