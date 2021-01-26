import { createChart, createChartLegend } from './barChart';
import { data, keys } from './data';

const chart = createChart({ width: 400, height: 500, data, keys });
const chartLegend = createChartLegend({
  width: 400,
  height: 240,
  data,
  keys,
});

document.querySelector('body').append(chart.node());
document.querySelector('body').append(chartLegend.node());
