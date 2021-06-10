<template>
  <router-view/>
</template>

<style lang="scss">
@import "~@/assets/styles/helper.scss";
@import "~@/assets/styles/reset.scss";

body {
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #f5f5f5;
}

#app {
  @media (min-width: 500px) {
    width: 500px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}

</style>
