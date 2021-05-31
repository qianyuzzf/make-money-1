<template>
  <nav>
    <router-link to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics">
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
nav {
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

  > a {
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    > .icon {
      width: 30px;
      height: 30px;
    }
  }
}

</style>