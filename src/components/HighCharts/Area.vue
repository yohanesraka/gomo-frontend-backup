<template>
  <highcharts :options="options"></highcharts>
</template>

<script>
import basicOptions from './config';

export default {
  name: 'HcArea',
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
    colorBySeries: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 400,
    },
    zones: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          type: 'area',
          height: this.height,
        },
        ...basicOptions,
        plotOptions: {
          column: {
            pointPadding: 0.2,
            color: this.color,
            colorBySeries: this.colorBySeries,
            zones: this.zones,
          },
        },
        xAxis: {
          categories: this.categories,
          crosshair: true,
        },
        series: this.series,
      };
    },
  },
};
</script>
