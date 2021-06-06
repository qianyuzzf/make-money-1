<template>
  <Layout>
    <Tabs class-prefix="type"
          v-model:value="type"
          :data-source="typeList"/>
    <Tabs class-prefix="interval"
          v-model:value="interval"
          :data-source="intervalList"/>
    <div>
      type:{{ type }}
      <br>
      interval:{{ interval }}
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {defineComponent, ref} from 'vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

export default defineComponent({
  name: 'Statistics',
  components: {Tabs, Layout},
  setup() {
    const typeList = ref(recordTypeList);
    const intervalList = ref([
      {text: '按天', value: 'day'},
      {text: '按周', value: 'week'},
      {text: '按月', value: 'month'}
    ]);
    const interval = ref('day');
    const type = ref('-');
    return {typeList, intervalList, interval, type};
  }
});
</script>

<style lang="scss" scoped>
::v-deep li.interval-tabs-item,
::v-deep li.type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}


</style>
