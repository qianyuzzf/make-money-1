<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'NumberPad',
  setup(props, context) {
    const output = ref('0');
    const inputContent = (event: MouseEvent) => {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent as string;
      if (output.value.length === 16) {
        return;
      }
      if (output.value === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          output.value = input;
        } else {
          output.value += input;
        }
        return;
      }
      if (output.value.indexOf('.') >= 0 && input === '.') {
        return;
      }
      output.value += input;
    };
    const ok = () => {
      if (output.value === '0') {
        window.alert('金额不能为零');
      } else {
        context.emit('update:value', output.value);
        context.emit('submit', output.value);
        output.value = '0';
      }
    };
    const remove = () => {
      const index = output.value.length;
      if (index === 1) {
        output.value = '0';
        return;
      }
      output.value = output.value.substr(0, index - 1);
    };
    const clear = () => {
      output.value = '0';
    };
    return {output, inputContent, ok, remove, clear};
  }
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.numberPad {
  > .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    background: white;
  }

  > .buttons {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(4, 64px);

    > button {
      $bg: #f2f2f2;
      border: none;

      &.ok {
        grid-row: 3/5;
        grid-column: 4/5;
      }

      &.zero {
        grid-column: 1/3;
      }

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4%*2);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4%*3);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4%*4);
      }

      &:nth-child(14) {
        background: darken($bg, 4%*5);
      }

      &:nth-child(12) {
        background: darken($bg, 4%*6);
      }
    }
  }
}
</style>