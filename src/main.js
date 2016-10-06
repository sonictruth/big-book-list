import Vue from 'vue';
import App from './App';
import 'material-design-lite/dist/material.css';
import 'material-design-lite/dist/material.js';
import 'animate.css';

// TODO: Move filter and shim from main

Vue.filter('formatTimestamp', (timestamp) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec',
  ];

  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day} ${monthNames[monthIndex]} ${year}`;
});


// requestIdleCallback shim
window.requestIdleCallback = window.requestIdleCallback ||
  (cb => setTimeout(() => {
    const start = Date.now();
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      },
    });
  }, 1));

window.cancelIdleCallback = window.cancelIdleCallback ||
  (id => {
    clearTimeout(id);
  });


/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
});
