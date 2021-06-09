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
      }
    };
    updateValue();
    onMounted(() => {
      const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
      wrapper.scrollLeft = wrapper.scrollWidth;
      const myChart = echarts.init(document.querySelector('.main') as HTMLDivElement);
      const option = {
        grid: {
          left: 20,
          right: 20,
          bottom: 40
        },
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}',
          position: 'top',
          backgroundColor: '#666',
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
            color: '#666'
          },
          data: Array.from(seriesData.value),
          type: 'line'
        }]
      };
      myChart.setOption(option);
      watch(() => props.result, () => {
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

  .main {
    width: 430vw;
    height: 100vw;
  }
}
</style>