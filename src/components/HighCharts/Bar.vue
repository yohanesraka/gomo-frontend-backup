<template>
  <highcharts :options="options" :callback="callback"></highcharts>
</template>

<script>
import basicOptions from './config';

export default {
  name: 'HcBar',
  props: {
    data: {
      type: Object,
      default: () => ({
        series: [],
        categories: [],
      }),
    },
    color: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 400,
    },
    legend: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
      default: () => ({
        formatter: undefined,
      }),
    },
    tooltips: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: null,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: null,
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
          type: 'bar',
          height: this.height,
        },
        ...basicOptions,
        tooltip: {
          ...this.tooltips,
        },
        title: {
          text: this.title,
          floating: this.floating,
        },
        subtitle: {
          text: this.subtitle,
        },
        legend: {
          enabled: this.legend,
        },
        plotOptions: {
          bar: {
            colorByPoint: this.color,
            showInLegend: true,
          },
          series: {
            dataLabels: [{
              enabled: true,
              format: '{y}',
            }],
          },
        },
        xAxis: {
          categories: this.data.categories ? this.data.categories : undefined,
          labels: this.labels,
        },
        series: this.data.series,
      };
    },
  },
};
</script>
