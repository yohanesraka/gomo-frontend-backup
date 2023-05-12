<template>
  <highcharts :options="options" class="ml--2"></highcharts>
</template>

<script>
import basicOptions from "./config";

export default {
  name: "HcPie",
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
      default: 250,
    },
    width: {
      type: Number,
      default: 300,
    },
    dataLabels: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    float: {
      type: Boolean,
      default: false,
    },
    grouping: {
      type: Boolean,
      default: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
    legend: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: Array,
      default: () => basicOptions.colors,
    },
    colorBySeries: {
      type: Boolean,
      default: false,
    },
    yAxis: {
      type: Object,
      default: () => {},
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
          type: "pie",
          height: this.height,
          width: this.width,
        },
        ...basicOptions,
        title: {
          text: this.title,
          verticalAlign: "middle",
          align: "center",
          y: 0,
          style: {
            fontSize: "35px",
            fontWeight: "bold",
          },
        },
        subtitle: {
          text: this.subtitle,
        },
        colors: this.colors,
        legend: {
          enabled: this.legend,
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: this.data.series,
      };
    },
  },
};
</script>
