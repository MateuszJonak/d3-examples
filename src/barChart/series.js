import * as d3 from 'd3';

export const getSeries = ({ data, keys }) =>
  d3
    .stack()
    .keys(keys)(data)
    .map((d) => {
      d.forEach((v) => {
        // eslint-disable-next-line
        v.key = d.key;
      });
      return d;
    });
