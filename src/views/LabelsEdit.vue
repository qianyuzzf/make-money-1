<template>
  <Layout>
    <div class="navBar">
      <Icon @click="goBack" class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="formWrapper">
      <FormItem :data="tagValue.name"
                @update:value="onUpdateValue"
                placeholder="请输入新的标签名">
        标签名
      </FormItem>
    </div>
    <div class="buttonWrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {defineComponent, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import model from '@/models/model';
import Icon from '@/components/Icon.vue';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'LabelsEdit',
  components: {Button, FormItem, Icon, Layout},
  setup() {
    const route = useRoute();  //获取路由信息
    const router = useRouter();  //执行路由操作
    const tagValue = ref({});
    const id = route.params.id;
    const tagList = ref(model.fetch('tagsList'));
    const tagListClone = model.clone(tagList.value);
    const tag = tagList.value.filter(t => t.id === id)[0];
    if (tag) {
      tagValue.value = tag;
      for (let i = 0; i < tagListClone.length; i++) {
        if (tag.name === tagListClone[i].name) {
          tagListClone.splice(i, 1);
        }
      }
    } else {
      router.push('/404');
    }
    const onUpdateValue = (data: string) => {
      tag.name = data;
      model.save('tagsList', tagList.value);
    };
    const remove = () => {
      if (window.confirm('是否要删除标签')) {
        const indexList = tagList.value.map(t => t.name);
        const index = indexList.indexOf(tag.name);
        tagList.value.splice(index, 1);
        model.save('tagsList', tagList.value);
        router.push('/labels');
      }
    };
    const goBack = () => {
      if (tag.name === '') {
        window.alert('标签名不能为空');
        return;
      }
      const repeat = tagListClone.filter(item => item.name === tag.name)[0];
      if (repeat) {
        window.alert('标签名重复，请重新输入');
        return;
      } else {
        router.push('/labels');
      }
    };
    return {tagValue, onUpdateValue, remove, goBack};
  }
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.navBar {
  background: white;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .leftIcon {
    width: 20px;
    height: 20px;
  }

  > .rightIcon {
    width: 20px;
    height: 20px;
  }
}

.formWrapper {
  background: white;
  margin-top: 10px;
}

.buttonWrapper {
  text-align: center;
  padding-top: 32px;
}

.buttonWrapper ::v-deep(.button) {
  background: $danger-button;
}

</style>