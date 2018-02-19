import { init } from 'sapper/runtime.js';
import { routes } from './manifest/client.js';

// `routes` is an array of route objects injected by Sapper
init(document.querySelector('#app'), routes);

if (module.hot) module.hot.accept();
