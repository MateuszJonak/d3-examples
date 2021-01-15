import * as d3 from 'd3';
import { translation } from '../data';
import { getSeries } from './series';

export const createChart = ({ width, height, data, keys }) => {
  const svg = d3.create('svg').attr('width', width).attr('height', height);
  const series = getSeries({ data, keys });

  const margin = { top: 10, right: 10, bottom: 30, left: 40 };
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1)
    .round(true);

  const xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((g2) => g2.selectAll('.domain').remove())
      .call((g2) => g2.selectAll('text').attr('font-size', 14));

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(series, (d1) => d3.max(d1, (d2) => d2[1]))])
    .rangeRound([height - margin.bottom, margin.top]);

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call((g2) => g2.selectAll('.domain').remove())
      .call((g2) => g2.selectAll('text').attr('font-size', 14));

  const color = d3
    .scaleOrdinal()
    .domain(series.map((d) => d.key))
    .range(d3.schemeSpectral[series.length])
    .unknown('#ccc');

  const transitionStackedBars = (selection) => {
    selection
      .transition()
      .duration(400)
      .delay((d, i) => i * 10)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]));
  };

  const seriesPoints = (g) =>
    g
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d.data.name))
      .attr('y', () => height - margin.bottom)
      .attr('height', 0)
      .attr('width', x.bandwidth())
      .call(transitionStackedBars)
      .append('title')
      .text((d) => `${d.data.name} - ${translation[d.key]}`);

  const seriesGroups = (g) =>
    g
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .call(seriesPoints);

  svg.append('g').call(seriesGroups);
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);

  // document.querySelector('body').append(svg.node());
  return svg;
};
