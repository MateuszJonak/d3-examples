import { createChart } from './barChart';
import { data, keys } from './data';

const chart = createChart({ width: 400, height: 500, data, keys });

document.querySelector('body').append(chart.node());
