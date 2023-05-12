<template>
  <highcharts :options="options"></highcharts>
</template>

<script>
import basicOptions from "./config";

export default {
  name: "HcLine",
  props: {
    data: {
      type: Object,
      default: () => ({
        categories: [],
        series: [],
      }),
    },
    color: {
      type: Boolean,
      default: false,
    },
    colorBySeries: {
      type: Boolean,
      default: false,
    },
    tickInterval: {
      type: Number,
      default: undefined,
    },
    dataLabels: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    marker: {
      type: Boolean,
      default: true,
    },
    height: {
      type: Number,
      default: 250,
    },
    legend: {
      type: Boolean,
      default: false,
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
          type: "line",
          height: this.height,
        },
        ...basicOptions,
        title: {
          text: this.title,
        },
        legend: {
          enabled: this.legend,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: this.dataLabels,
              format: "{y:,.0f}",
              style: {
                fontSize: 12,
              },
            },
          },
          spline: {
            marker: this.marker,
          },
        },
        xAxis: {
          tickInterval: this.tickInterval,
          categories: this.data.categories,
          crosshair: true,
        },
        series: this.data.series,
      };
    },
  },
};
</script>
