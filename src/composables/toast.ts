import mitt from 'mitt';
import { createApp, defineComponent } from 'vue';
import Toast from 'components/Toast.vue';

type onHideFunction = () => void;

export default function useToast({ message = '', onHide: onHideFunction = () => { }, persistent = false }) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const emitter = mitt();

  const app = createApp(Toast, {
    message,
    persistent,
    emitter,
  });

  const instance = app.mount(div);

  emitter.on('hide', () => app.unmount());

  return {
    async show() {
      await instance.show();
      if (!persistent) {
        app.unmount();
      }
    },
    async hide() {
      await instance.hide();
      app.unmount();
    }
  };
}