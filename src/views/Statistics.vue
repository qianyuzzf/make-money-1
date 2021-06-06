<template>
  <Layout>
    <Tabs class-prefix="type"
          v-model:value="type"
          :data-source="typeList"/>
    <Tabs class-prefix="interval"
          v-model:value="interval"
          :data-source="intervalList"/>
    <ol class="content">
      <li v-for="(group,index) in showResult()" :key="index">
        <h3 class="title">{{ index }}</h3>
        <ol>
          <li v-for="item in group" :key="item.time"
              class="record">
            <span>{{ item.tags.join(',') || '无无无无无无无无无无无无无无无无无无无无无无无无无' }}</span>
            <span class="notes">￥无无无无无无无无无无无无无无无无无无无无无无无无{{ item.notes }}</span>
            <span>￥无无无无无无无无无无无无无无无无无无无无无无无无{{ item.money }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {defineComponent, ref} from 'vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import model from '@/models/model';
import {RecordItem} from '@/custom';

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
    const result = ref(model.fetch('tagsList'));
    const result2 = ref(model.fetch2('recordsList'));
    const showResult = () => {
      const hashTable: { [key: string]: RecordItem[] } = {};
      for (let i = 0; i < result2.value.length; i++) {
        const time = result2.value[i].time;
        if (time) {
          const [data] = time.toString().split('T');
          hashTable[data] = hashTable[data] || [];
          hashTable[data].push(result2.value[i]);
        }
      }
      return hashTable;
    };
    return {
      typeList,
      intervalList,
      interval,
      type,
      result,
      result2,
      showResult
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(li.type-tabs-item),
::v-deep(li.interval-tabs-item), {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}

::v-deep(li.interval-tabs-item) {
  padding: 5px 0;
  font-size: 20px;
}

.content {
  font-size: 16px;

  .title {
    padding: 8px 16px;
  }

  .record {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 6px 16px;
    border-bottom: 1px solid #e6e6e6;

    > span {
      max-width: 30%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.notes {
        margin-right: auto;
        margin-left: 10px;
        color: #999999;
      }
    }
  }
}

</style>
