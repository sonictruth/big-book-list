<template>
  <div class="bl-main mdl-shadow--4dp">
  <div class="bl-toolbar">TOolbar</div>
  <div v-el:container class="bl-container">
    <div v-el:holder  class="bl-holder">

    </div>
  </div>
  <div>
</template>

<script>
import BooksGenerator from './BooksGenerator.js';
const rowsPerPage = 10;
const rowHeight = 25; // fixed row height to avoid css height overflow

export default {
  ready() {
    window.debug = this;
    this.$els.container.style.height = `${rowHeight * rowsPerPage}px`;
    BooksGenerator.getBooks().then((books) => {
      // this.books = books;
      // this.books = books;
      console.log('xxx', books.length);
    });
  },
  data() {
    return {
      books: [],
    };
  },
};
</script>

<style scoped>
 .bl-main {
  background-color: white;
 }
 .bl-toolbar {
    padding: 10px;
 }
 .bl-container{
    border-top: 1px solid lightgray;
    overflow-x: scroll;
 }
</style>
