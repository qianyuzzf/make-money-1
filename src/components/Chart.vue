<template>
  <div id="main"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'Chart',
  setup() {
    onMounted(() => {
      const main = document.querySelector('#main') as HTMLElement;
      const width = document.documentElement.clientWidth;
      main.style.width = `${width - 20}px`;
      main.style.height = `${(width - 20) * 1.2}px`;
      const myChart = echarts.init(main);
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }]
      };
      myChart.setOption(option);
    });

  }
});
</script>

<style lang="scss" scoped>

</style>