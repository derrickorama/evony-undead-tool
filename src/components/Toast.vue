<template>
  <article class="toast row my-none text-white pa-sm" :class="{ 'show': show }">
    <div>{{ message }}</div>
    <a href="#" @click.prevent="hide">
      <Close />
    </a>
  </article>
</template>

<script setup lang="ts">
import type { Emitter } from 'mitt';
import type PCancelable from 'p-cancelable';
import { onMounted, ref, watchEffect } from 'vue';
import useWait from 'composables/wait';
import Close from 'vue-material-design-icons/Close';

const props = withDefaults(defineProps<{ emitter?: Emitter; hidetimeout?: number; message?: string; persistent?: boolean }>(), {
  emitter: undefined,
  hidetimeout: 5000,
});

const emit = defineEmits(['hide']);

const wait = useWait();

const autoCloseTimeout: Ref<PCancelable | null> = ref(null);
const show = ref(false);

async function hide() {
  show.value = false;
  if (autoCloseTimeout.value) {
    autoCloseTimeout.value.cancel();
  }
  await wait(500); // wait for it to hide
  if (props.emitter) {
    props.emitter.emit('hide');
  }
  emit('hide');
}

defineExpose({
  hide,
  async show() {
    show.value = true;
    await wait(500); // wiat for it to show

    if (!props.persistent) {
      try {
        autoCloseTimeout.value = wait(props.hidetimeout);
        await autoCloseTimeout.value;
        await hide();
      } catch {
        // do nothing
      }
    }
  },
});
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: 1rem;
  right: 1rem;
  border: 1px solid rgb(35, 159, 207);
  background: rgb(33, 192, 255);
  box-shadow: 5px 5px 3px 0px rgba(33, 192, 255, 0.199);
  transform: translateX(calc(100% + 1rem + 1px));
  transition: transform 0.5s ease-out;

  &.show {
    transform: translateX(0);
  }
}
</style>