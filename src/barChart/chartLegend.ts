import * as d3 from 'd3';
import { translation } from '../data';
import { ChartProps, Item } from './types';

const fontSize = 14;
const colorBoxSize = 30;
const colorBoxRightPadding = 8;
const colorBoxBottomPadding = 8;

export const createChartLegend = ({
  width,
  height,
  data,
  keys,
}: ChartProps) => {
  const svg = d3.create('svg').attr('width', width).attr('height', height);
  const series = d3.stack<Item>().keys(keys)(data);

  const color = d3
    .scaleOrdinal<string>()
    .domain(series.map((d) => d.key))
    .range(d3.schemeSpectral[series.length])
    .unknown('#ccc');

  const appendLegendColor = (
    g: d3.Selection<
      SVGGElement | d3.BaseType,
      d3.Series<Item, string>,
      SVGGElement,
      undefined
    >,
  ) =>
    g
      .append('rect')
      .attr('fill', (d) => color(d.key))
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', colorBoxSize)
      .attr('width', colorBoxSize);

  const appendLegendText = (
    g: d3.Selection<
      SVGGElement | d3.BaseType,
      d3.Series<Item, string>,
      SVGGElement,
      undefined
    >,
  ) =>
    g
      .append('text')
      .attr('alignment-baseline', 'center')
      .attr('x', colorBoxSize + colorBoxRightPadding)
      .attr('y', (colorBoxSize - fontSize) / 2 + fontSize)
      .text((d) => translation[d.key]);

  svg
    .append('g')
    .selectAll('g')
    .data(series)
    .join('g')
    .attr(
      'transform',
      (_, i) => `translate(0, ${i * colorBoxSize + i * colorBoxBottomPadding})`,
    )
    .attr('font-size', fontSize)
    .attr('font-family', 'sans-serif')
    .call(appendLegendColor)
    .call(appendLegendText);

  return svg;
};
