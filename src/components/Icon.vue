<template>
  <svg class="icon">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default {
  name: 'Icon',
  props: {
    name: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>