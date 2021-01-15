import * as d3 from 'd3';
import { translation } from '../data';
import { getSeries } from './series';

export const createChartLegend = ({ width, height, data, keys }) => {
  const svg = d3.create('svg').attr('width', width).attr('height', height);
  const series = getSeries({ data, keys });

  const color = d3
    .scaleOrdinal()
    .domain(series.map((d) => d.key))
    .range(d3.schemeSpectral[series.length])
    .unknown('#ccc');

  const fontSize = 14;
  const size = 30;

  svg
    .append('g')
    .selectAll('g')
    .data(series)
    .join('g')
    .attr('transform', (_, i) => `translate(0, ${i * size + i * 4})`)
    .attr('font-size', fontSize)
    .attr('font-family', 'sans-serif')
    .call((g) =>
      g
        .append('rect')
        .attr('fill', (d) => color(d.key))
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', size)
        .attr('width', size),
    )
    .call((g) =>
      g
        .append('text')
        .attr('alignment-baseline', 'center')
        .attr('x', size + 8)
        .attr('y', (size - fontSize) / 2 + fontSize)
        .text((d) => translation[d.key]),
    );

  // document.querySelector('body').append(svg.node());
  return svg;
};
