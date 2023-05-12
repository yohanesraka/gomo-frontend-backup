<template>
  <highcharts :options="options"></highcharts>
</template>

<script>
import basicOptions from './config';

export default {
  name: 'HcColumn',
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
    dataLabels: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: Object,
      default: undefined,
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
          type: 'column',
          height: this.height,
        },
        ...basicOptions,
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
        colors: this.colors,
        plotOptions: {
          column: {
            pointPadding: 0.2,
            grouping: this.grouping,
            colorByPoint: this.color,
            colorBySeries: this.colorBySeries,
            zones: this.zones,
          },
          series: {
            dataLabels: {
              enabled: this.dataLabels,
              inside: true,
              verticalAlign: 'top',
              format: `{point.y${this.float ? ':.2f' : ''}}`,
              style: {
                fontSize: 12,
              },
            },
            groupPadding: 0.05,
          },
        },
        xAxis: {
          categories: this.data.categories,
          alternateGridColor: '#fafafa',
          crosshair: false,
          labels: {
            groupedOptions: [{
              rotation: 0,
              align: 'center',
            }],
            style: {
              width: '100px',
            },
            rotation: 0,
          },
        },
        tooltip: {
          ...this.tooltip,
        },
        yAxis: {
          title: {
            enabled: false,
          },
          ...this.yAxis,
        },
        series: this.data.series,
      };
    },
  },
};
</script>
