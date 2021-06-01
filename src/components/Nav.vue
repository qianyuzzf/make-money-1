<template>
  <nav>
    <router-link to="/money" active-class="selected">
      <Icon name="money"/>
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

export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 14px;

  > a {
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.selected {
      color: $color-heightLight;
    }

    > .icon {
      width: 30px;
      height: 30px;
    }
  }
}

</style>