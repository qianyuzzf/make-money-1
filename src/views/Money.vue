<template>
  <Layout class-prefix="layout">
    <NumberPad @submit="saveRecord"/>
    <FormItem :init-value="initNoteValue"
              @update:value3="onUpdateNotes3"
              formItemType="money"
              placeholder="请输入金额">
      金额
    </FormItem>
    <FormItem :init-value="initNoteValue"
              @update:value="onUpdateNotes"
              placeholder="请输入备注信息">
      备注
    </FormItem>
    <FormItem :init-value="initNoteValue"
              @update:value2="onUpdateNotes2"
              formItemType="date"
              :data="nowDate">
      日期
    </FormItem>
    <Tabs v-model:value="record.type" :data-source="typeList"/>
    <Tags :data-source="tagsList"
          @update:data-source="saveTags"
          @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import {ref, defineComponent, watch} from 'vue';
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import {RecordItem, Tag} from '@/custom.ts';
import model from '@/models/model';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import hashArray from '@/store/hashArray';

export default defineComponent({
  name: 'Money',
  components: {
    Tabs,
    Layout,
    Tags,
    FormItem,
    NumberPad
  },
  setup() {
    const nowDate = dayjs().format('YYYY-MM-DD');
    const initNoteValue = ref(false);
    const tagsInit = () => {
      const tags = model.fetch('tagsList').length === 0 ?
          hashArray :
          model.fetch('tagsList');
      model.save('tagsList', tags);
      return tags;
    };
    const tagsList = ref<Tag[]>(tagsInit());
    const record = ref<RecordItem>({
      money: 0,
      type: '-',
      notes: '',
      tags: []
    });
    const typeList = ref(recordTypeList);
    const recordsList = ref<RecordItem[]>(model.fetch2('recordsList'));
    const onUpdateTags = (data: Tag[]) => {
      record.value.tags = data;
    };
    const onUpdateNotes = (data: string) => {
      record.value.notes = data;
    };
    const onUpdateNotes2 = (data: string) => {
      record.value.time = data;
    };
    const onUpdateNotes3 = (data: string) => {
      console.log(data);
      record.value.money = parseFloat(data);
    };
    const saveRecord = () => {
      if (record.value.tags.length === 0) {
        window.alert('请至少选择一个标签');
      } else if (record.value.money === 0) {
        window.alert('金额数不能为零或者为空');
      } else {
        record.value.time = record.value.time || dayjs().format('YYYY-MM-DD');
        recordsList.value.unshift(model.clone(record.value));
        window.alert('保存成功');
        initNoteValue.value = !initNoteValue.value;
      }
    };
    const saveTags = (data: Tag[]) => {
      tagsList.value = data;
      model.save('tagsList', tagsList.value);
    };
    watch(recordsList.value, () => {
      model.save('recordsList', recordsList.value);
    });
    return {
      tagsList,
      onUpdateTags,
      onUpdateNotes,
      onUpdateNotes2,
      onUpdateNotes3,
      record,
      saveRecord,
      recordsList,
      saveTags,
      typeList,
      initNoteValue,
      nowDate
    };
  }
});
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
