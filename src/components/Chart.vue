<template>
  <div class="wrapper">
    <div class="main"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue';
import * as echarts from 'echarts';
import {RecordItem} from '@/custom';
import dayjs from 'dayjs';
import model from '@/models/model';

type Result = {
  title: string,
  items: RecordItem[],
  total: number
}

export default defineComponent({
  name: 'Chart',
  props: {
    result: {
      type: Array
    }
  },
  setup(props) {
    const xAxisData = ref<string[]>([]);
    const seriesData = ref<number[]>([]);

    const updateValue = () => {
      if (props.result) {
        const sortResult = model.clone(props.result as Result[]);
        sortResult.sort((a, b) => a.title < b.title ? -1 : 1);
        xAxisData.value = sortResult.slice(-30).map(i => dayjs(i.title).format('MM-DD'));
        seriesData.value = sortResult.slice(-30).map(i => i.total);
        let surplusLength = 7 - xAxisData.value.length;
        for (let i = 0; i < surplusLength; i++) {
          xAxisData.value.unshift('');
          seriesData.value.unshift(0);
        }
        return xAxisData.value.length;
      }
    };
    const dataSize = (wrapper: HTMLDivElement, main: HTMLDivElement, width: number) => {
      const length = updateValue();
      if (length) {
        main.style.width = `${width / 7 * length}px`;
        main.style.height = `${width * 0.8}px`;
      }
      wrapper.scrollLeft = wrapper.scrollWidth;
    };

    onMounted(() => {
      const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
      const main = document.querySelector('.main') as HTMLDivElement;
      main.removeAttribute('_echarts_instance_');
      const app = document.querySelector('#app');
      if (app) {
        const width = app.clientWidth;
        dataSize(wrapper, main, width);
        const myChart = echarts.init(main);
        const option = {
          grid: {
            left: 20,
            right: 20,
            bottom: 40
          },
          tooltip: {
            show: true,
            confine: true,
            formatter: '{b}<br/>￥{c}',
            position: 'top',
            backgroundColor: '#ff7070',
            textStyle: {
              color: '#eee'
            }
          },
          xAxis: {
            axisTick: {
              alignWithLabel: true
            },
            type: 'category',
            data: Array.from(xAxisData.value)
          },
          yAxis: {
            show: false,
            type: 'value'
          },
          series: [{
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              color: '#ff7070'
            },
            data: Array.from(seriesData.value),
            type: 'line'
          }]
        };
        myChart.setOption(option);
        watch(() => props.result, () => {
          dataSize(wrapper, main, width);
          myChart.resize();
          updateValue();
          const option = {
            xAxis: {
              data: Array.from(xAxisData.value)
            },
            series: [{
              data: Array.from(seriesData.value)
            }]
          };
          myChart.setOption(option);
        });
      }
    });
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>