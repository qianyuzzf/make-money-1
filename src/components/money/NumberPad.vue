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
    background: $sure-button;
    color: #fff;
    margin-top: 56px;
    padding: 8px 80px;
    border-radius: 40px;
  }
}

</style>