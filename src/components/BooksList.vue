<template>
  <div class="bl-main mdl-shadow--4dp">
  <div class="bl-toolbar">TOolbar</div>
  <div v-el:container class="bl-container">
    <div v-el:holder  class="bl-holder">
      <div v-el:view  class="bl-view">
      <div class="bl-row" v-for="book in viewBooks">
        {{book.title}}
        {{book.authorName}}
        {{genders[book.authorGender]}}
        {{genres[book.genre]}}
        {{book.publishDate}}
      </div>
      </div>
    </div>
  </div>
  <div v-el:status class="bl-status"><i class="material-icons">favorite</i> {{statusMsg}}</div>
  <div>
</template>

<script>
import BooksGenerator from './BooksGenerator.js';
import genres from './genres.js';
import genders from './genders.js';

const rowsPerPage = 10;
const rowHeight = 25; // fixed row height to avoid css height overflow

export default {
  methods: {
    onScrollDebounce() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.renderView.bind(this), 500);
    },
    renderView() {
      const container = this.$els.container;
      const view = this.$els.view;
      const firstItem = Math.floor(container.scrollTop / rowHeight);
      let lastItem = firstItem + Math.ceil(container.offsetHeight / rowHeight) + 1;
      if (lastItem + 1 >= this.totalRows) {
        lastItem = this.totalRows - 1;
      }
      view.style.top = `${firstItem * rowHeight}px`;
      this.viewBooks = this.books.slice(firstItem, lastItem + 3);
      this.statusMsg = `Showing ${firstItem + 1} - ${lastItem + 1} of ${this.totalRows}`;
    },
    loadBooks() {
      this.statusMsg = 'Loading...';
      BooksGenerator.getBooks().then((generatedBooks) => {
        this.books = generatedBooks;
        this.totalRows = generatedBooks.length;
        const holderheight = rowHeight * this.totalRows;
        this.statusMsg = `Loaded ${generatedBooks.length} books`;
        this.$els.holder.style.height = `${holderheight}px`;
        this.renderView();
      });
    },
  },
  ready() {
    this.books = [];
    this.totalRows = 0;
    this.$els.container.style.height = `${rowHeight * rowsPerPage}px`;
    this.$els.container.addEventListener('scroll', this.onScrollDebounce.bind(this));
    this.loadBooks();
  },
  data() {
    return {
      genres,
      genders,
      statusMsg: 'Ready',
      viewBooks: [],
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
 .material-icons, .bl-status {
    font-size: 10px;
 }
 .bl-status {
    padding: 5px 10px 5px 10px;
 }
 .bl-row {
   overflow: hidden;
   height: 25px;
 }
 .bl-view {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: red;
    top: 0px;
 }
 .bl-container, .bl-holder{
    width: 100%;
    position: relative;
 }
 .bl-container{
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    overflow-x: scroll;
 }
/* fix scrollbar osx */
 .bl-container::-webkit-scrollbar {
    -webkit-appearance: none;
}

 .bl-container::-webkit-scrollbar:vertical {
    width: 11px;
}

 .bl-container::-webkit-scrollbar:horizontal {
    height: 0px;
}

 .bl-container::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white; /* should match background, can't be transparent */
    background-color: rgba(0, 0, 0, .5);
}

 .bl-container::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 8px;
}

</style>
