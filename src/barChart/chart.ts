import * as d3 from 'd3';
import { ChartProps, Item } from './types';

const margin = { top: 10, right: 10, bottom: 30, left: 40 };

export const createChart = ({ width, height, data, keys }: ChartProps) => {
  const svg = d3.create('svg').attr('width', width).attr('height', height);
  const series = d3.stack<Item>().keys(keys)(data);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1)
    .round(true);

  const yDomainMax = d3.max(series, (d1) => d3.max(d1, (d2) => d2[1]));
  const y = d3
    .scaleLinear()
    .domain([0, yDomainMax])
    .rangeRound([height - margin.bottom, margin.top]);

  svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call((g) => g.selectAll('.domain').remove())
    .call((g) => g.selectAll('text').attr('font-size', 14));

  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, 's'))
    .call((g) => g.selectAll('.domain').remove())
    .call((g) => g.selectAll('text').attr('font-size', 14));

  return svg;
};
