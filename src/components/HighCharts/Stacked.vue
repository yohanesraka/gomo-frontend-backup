<template>
  <highcharts :options="options" :callback="callback"></highcharts>
</template>

<script>
import basicOptions from './config';

export default {
  name: 'HcStacked',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    series: {
      type: Array,
      default: () => [],
    },
    color: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number,
      default: 400,
    },
    legend: {
      type: Boolean,
      default: true,
    },
    callback: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    options() {
      return {
        chart: {
          type: 'column',
          height: this.height,
        },
        ...basicOptions,
        tooltip: {
          useHTML: true,
          formatter() {
            const { data } = this.series;
            const { index } = this.point;
            const tooltip = `<span style="font-weight:bold;font-size:14px">${data[index].category}</span>`;
            const table = `<table style="font-size: 14px"><tbody><tr style="color:${data[index].color}"><td>${this.series.name}</td><td style="padding: 0 0.5rem">:</td><td><strong>${data[index].options.y} pcs</strong></td></tr><tr class="text-info"><td>Total</td><td style="padding: 0 0.5rem">:</td><td><strong>${data[index].stackTotal} Pcs</strong></td></tr></tbody></table>`;
            return tooltip.concat(table);
          },
        },
        legend: {
          enabled: this.legend,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'bottom',
          itemMarginTop: 10,
          itemMarginBottom: 10,
        },
        colors: this.colors.length > 0 ? this.colors : undefined,
        plotOptions: {
          column: {
            stacking: 'normal',
            colorByPoint: this.color,
            dataLabels: {
              style: {
                fontSize: 16,
              },
              enabled: true,
            },
          },
        },
        xAxis: {
          categories: this.categories,
        },
        yAxis: {
          reversedStacks: false,
          title: false,
        },
        series: this.series,
      };
    },
  },
};
</script>
