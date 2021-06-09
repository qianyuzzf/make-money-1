<template>
  <Layout>
    <Tabs class-prefix="type"
          v-model:value="type"
          :data-source="typeList"/>
    <Chart :result="showResult()"/>
    <ol class="content" v-if="showResult().length>0">
      <li v-for="group in showResult()" :key="group.title">
        <h3 class="title">
          <span>{{ changeDate(group.title) }}</span>
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="(item,index) in group.items" :key="index"
              class="record">
            <span>{{ item.tags.map(i => i.name).join('，') || '无' }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.money }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="no-data-wrapper">
      <span class="no-data">亲，目前还没有数据呢</span>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {defineComponent, ref, watch} from 'vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import model from '@/models/model';
import dayjs from 'dayjs';
import Chart from '@/components/Chart.vue';

export default defineComponent({
  name: 'Statistics',
  components: {Chart, Tabs, Layout},
  setup() {
    const typeList = ref(recordTypeList);
    const type = ref('-');
    const result = ref(model.fetch('tagsList'));
    const result2 = ref(model.fetch2('recordsList'));
    const showResult = () => {
      const selectType = model.clone(result2.value).filter(r => r.type === type.value);
      if (!selectType[0]) {
        return [];
      }
      const result = selectType.sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf());
      const hashArray = [{title: result[0].time, items: [result[0]], total: 0}];
      for (let i = 1; i < result.length; i++) {
        if (dayjs(result[i].time).isSame(dayjs(hashArray[hashArray.length - 1].title), 'day')) {
          hashArray[hashArray.length - 1].items.push(result[i]);
        } else {
          hashArray.push({title: result[i].time, items: [result[i]], total: 0});
        }
      }
      hashArray.forEach(group => group.total = group.items.reduce((sum, item) => sum + item.money, 0));
      return hashArray;
    };
    const changeDate = (date: string) => {
      const now = dayjs();
      if (dayjs(date).isSame(now, 'day')) {
        return '今天';
      } else if (dayjs(date).isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (dayjs(date).isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (dayjs(date).isSame(now, 'year')) {
        return dayjs(date).format('MM月DD日');
      } else {
        return dayjs(date).format('YYYY年MM月DD日');
      }
    };
    const chartsData = ref(showResult());
    watch(type, () => {
      chartsData.value = showResult();
    });
    return {
      typeList,
      type,
      result,
      result2,
      showResult,
      changeDate,
      chartsData
    };
  }
});
</script>

<style lang="scss" scoped>
.no-data {

  &-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 80px;
  }
}

::v-deep(li.type-tabs-item) {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}

.content {
  font-size: 16px;

  .title {
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
