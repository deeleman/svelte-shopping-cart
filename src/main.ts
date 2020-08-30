import './polyfills';
import App from './app/App.svelte';
import settings from './settings';

export default new App({
  props: { settings },
  target: document.body
});
