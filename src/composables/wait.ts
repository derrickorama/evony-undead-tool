import PCancelable from 'p-cancelable';

export default function useWait() {
  return (delay = 0) =>
    new PCancelable((resolve) => {
      setTimeout(resolve, delay);
    });
}