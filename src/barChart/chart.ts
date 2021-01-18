import * as d3 from 'd3';
import { BaseType } from 'd3';
import { translation } from '../data';
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

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(series, (d1) => d3.max(d1, (d2) => d2[1]))])
    .rangeRound([height - margin.bottom, margin.top]);

  const color = d3
    .scaleOrdinal<string>()
    .domain(series.map((d) => d.key))
    .range(d3.schemeSpectral[series.length])
    .unknown('#ccc');

  const appendTitle = (
    rect: d3.Selection<
      d3.BaseType | SVGRectElement,
      d3.SeriesPoint<Item>,
      d3.BaseType | SVGGElement,
      d3.Series<Item, string>
    >,
  ) =>
    rect.append('title').text(function (d) {
      const rect = this.parentNode;
      const g = rect.parentNode;
      const key = d3.select<BaseType, Item>(g).datum().key;

      return `${d.data.name} - ${translation[key]}`;
    });

  const transitionStackedBars = (
    rect: d3.Selection<
      d3.BaseType | SVGRectElement,
      d3.SeriesPoint<Item>,
      d3.BaseType | SVGGElement,
      d3.Series<Item, string>
    >,
  ) => {
    rect
      .transition()
      .duration(400)
      .delay((d, i) => i * 10)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]));
  };

  const appendBars = (
    g: d3.Selection<
      d3.BaseType | SVGGElement,
      d3.Series<Item, string>,
      SVGGElement,
      undefined
    >,
  ) =>
    g
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d.data.name))
      .attr('y', () => height - margin.bottom)
      .attr('height', 0)
      .attr('width', x.bandwidth())
      .call(transitionStackedBars)
      .call(appendTitle);

  const appendSeries = (
    g: d3.Selection<SVGGElement, undefined, null, undefined>,
  ) => {
    g.selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .call(appendBars);
  };

  svg.append('g').call(appendSeries);

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
