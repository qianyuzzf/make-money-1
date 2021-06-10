<template>
  <nav>
    <router-link to="/money" active-class="selected">
      <Icon name="tally"/>
      记账
    </router-link>
    <router-link to="/labels" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue';

export default {
  name: 'Nav',
  components: {Icon}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  background: #f5f5f5;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;

  > a {
    padding: 6px 0 2px 0;
    width: 33.3333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.selected {
      color: $sure-button-bg;
    }

    > .icon {
      width: 30px;
      height: 30px;
    }
  }
}

</style>