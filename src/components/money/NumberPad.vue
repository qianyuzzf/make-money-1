<template>
  <div class="numberPad">
    <button @click="ok" class="ok">OK</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NumberPad',
  setup(props, context) {
    const ok = () => {
      context.emit('submit');
    };
    return {ok};
  }
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.numberPad {
  > .ok {
    @extend %transformCenter;
    border: none;
    background: $sure-button-bg;
    color: $sure-button-color;
    margin: 16px 0 80px 0;
    padding: 8px 80px;
    border-radius: 40px;
  }
}

</style>