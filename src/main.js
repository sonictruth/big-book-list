import Vue from 'vue';
import App from './App';
import 'material-design-lite/dist/material.css';
import 'material-design-lite/dist/material.js';
import 'animate.css';

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

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
});
