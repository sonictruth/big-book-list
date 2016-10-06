<template>
  <div class="bl-main mdl-shadow--16dp">
  <div class="bl-toolbar">
    Generate
          <select v-model="numberOfBooks" @change="loadBooks">
            <option value="1000">
              1.000
            </option>
            <option value="10000">
              10.000
            </option>
            <option value="100000">
              100.000
            </option>
            <option value="1000000">
              1.000.000
            </option>
          </select>
    Books

      <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">


          <select v-model="selectedGender">
            <option value="" selected>Gender</option>
            <option v-for="gender in genders" v-bind:value="$index">
              {{ gender }}
            </option>
          </select>


          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input v-model="authorFilter" debounce="100" class="mdl-textfield__input" type="text" id="sample3">
            <label class="mdl-textfield__label" for="sample3">Search Author...</label>
          </div>


      </div>
       <div class="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">

          <select v-model="selectedGenre">
            <option value="" selected>Genre</option>
            <option v-for="genre in genres" v-bind:value="$index">
              {{ genre }}
            </option>
          </select>

           <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input v-model="titleFilter" debounce="100" class="mdl-textfield__input" type="text" id="sample3">
            <label class="mdl-textfield__label" for="sample3">Search Title...</label>
          </div>

       </div>
      </div>
    Published between:
    <date-picker :time.sync="startDateFilter" ></date-picker>
    <date-picker :time.sync="endDateFilter" ></date-picker>
    <div class="bl-buttons">

      <button @click="applyFilters" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
        <i class="material-icons">search</i>Search
      </button>

      <button @click="clearFilters" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect ">
        <i class="material-icons">clear</i>Clear
      </button>
    
    </div>




  </div>
  <div class="bl-header">
      <table class="bl-table" cellspacing="0" cellpadding="0">
        <tr class="bl-row">
          <td @click="sortBy('title', getOrderDirection('title'))" class="bl-table-title">Title</td>
          <td @click="sortBy('authorName', getOrderDirection('authorName'))" class="bl-table-auth">Author</td>
          <td @click="sortBy('genre',  getOrderDirection('genre'))" class="bl-table-gen">Genre</td>
          <td @click="sortBy('publishDate', getOrderDirection('publishDate'))" class="bl-table-pub">Published</td>
        </tr>
      </table>
  </div>
  <div v-el:container class="bl-container">
    <div v-el:holder  class="bl-holder">
      <div v-el:view  class="bl-view">
      <table class="bl-table" cellspacing="0" cellpadding="0">
        <tr class="bl-row" v-for="book in viewBooks">
          <td class="bl-table-title">{{book.title}}</td>
          <td class="bl-table-auth">{{genders[book.authorGender]}} {{book.authorName}}</td>
          <td class="bl-table-gen">{{genres[book.genre]}}</td>
          <td class="bl-table-pub">{{book.publishDate | formatTimestamp}}</td>
        </tr>
      </table>
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
import myDatepicker from 'vue-datepicker';

const rowsPerPage = 10;
const rowHeight = 25; // fixed row height to avoid css height overflow

export default {
  methods: {
    getOrderDirection(column) {
      let order = this.columnOrderDirections[column];
      if (order === undefined || order === -1) {
        order = 1;
      } else {
        order = -1;
      }
      this.columnOrderDirections[column] = order;
      return order;
    },
    clearFilters() {
      // FIXME:  kind of W.E.T. :/
      this.titleFilter = '';
      this.authorFilter = '';
      this.selectedGenre = '';
      this.selectedGender = '';
      this.startDateFilter = '';
      this.endDateFilter = '';
      this.books = this.booksUnfiltered;
      this.renderView(true);
    },
    applyFilters() {
      // FIXME:  kind of W.E.T. :/
      window.requestIdleCallback(() => {
        this.books = this.booksUnfiltered;
        if (this.titleFilter) {
          this.books = this.books.filter((book) => book.title.includes(this.titleFilter));
        }
        if (this.authorFilter) {
          this.books = this.books.filter((book) => book.authorName.includes(this.authorFilter));
        }
        if (Number.isInteger(this.selectedGenre)) {
          this.books = this.books.filter((book) => book.genre === this.selectedGenre);
        }
        if (Number.isInteger(this.selectedGender)) {
          this.books = this.books.filter((book) => book.authorGender === this.selectedGender);
        }
        if (this.startDateFilter) {
          const startTimestamp = (new Date(this.startDateFilter)).getTime();
          this.books = this.books.filter((book) => book.publishDate > startTimestamp);
        }
        if (this.endDateFilter) {
          const endTimestamp = (new Date(this.endDateFilter)).getTime();
          this.books = this.books.filter((book) => book.publishDate < endTimestamp);
        }
        this.renderView(true);
      });
    },
    sortBy(column, direction = 1) {
      window.requestIdleCallback(() => {
        this.books.sort((a, b) => {
          if (a[column] < b[column]) {
            return - direction;
          }
          if (a[column] > b[column]) {
            return direction;
          }
          return 0;
        });
        this.renderView(true);
      });
    },
    onScrollDebounce() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.renderView.bind(this), 100);
    },
    renderView(refresh = false) {
      const container = this.$els.container;
      const view = this.$els.view;
      if (refresh) {
        container.scrollTop = 0;
        const holderheight = rowHeight * this.books.length + 1;
        this.$els.holder.style.height = `${holderheight}px`;
      }
      const firstItem = Math.floor(container.scrollTop / rowHeight);
      let lastItem = firstItem + Math.ceil(container.offsetHeight / rowHeight);
      if (lastItem + 1 >= this.totalRows) {
        lastItem = this.totalRows;
      }
      view.style.top = `${firstItem * rowHeight}px`;
      this.viewBooks = this.books.slice(firstItem, lastItem + 5);
      if (this.books.length === 0) {
        this.statusMsg = 'No books :(';
      } else {
        this.statusMsg = `Showing ${firstItem + 1} - ${lastItem} of ${this.books.length}`;
      }
    },
    loadBooks() {
      this.statusMsg = 'Loading...';
      BooksGenerator.getBooks(this.numberOfBooks).then((generatedBooks) => {
        this.books = generatedBooks;
        this.booksUnfiltered = this.books.slice(); // make copy
        this.totalRows = generatedBooks.length;
        this.statusMsg = `Loaded ${generatedBooks.length} books`;
        this.renderView(true);
      });
    },
  },
  ready() {
    window.componentHandler.upgradeDom();
    this.books = [];
    this.booksUnfiltered = [];
    this.totalRows = 0;
    this.$els.container.style.height = `${rowHeight * rowsPerPage}px`;
    this.$els.container.addEventListener('scroll', this.onScrollDebounce.bind(this));
    this.loadBooks();
  },
  data() {
    return {
      columnOrderDirections: {},
      numberOfBooks: 1000,
      startDateFilter: '',
      endDateFilter: '',
      titleFilter: '',
      authorFilter: '',
      selectedGenre: '',
      selectedGender: '',
      genres,
      genders,
      statusMsg: 'Ready',
      viewBooks: [],
    };
  },
  components: {
    'date-picker': myDatepicker,
  },
};
</script>

<style scoped>
 .bl-buttons{
  padding-top: 10px;
 }
 .bl-table-title{
  width: 25%;
 }
 .bl-table-auth{
  width: 25%;
 }
 .bl-table-gen{
  text-align: center;
  width: 15%;
 }
 .bl-table-pub{
  text-align: center;
  width: 15%;
 }
 .bl-main {
  background-color: white;
 }
 .bl-toolbar {
    text-align: center;
    padding: 5px;
  background-image: url("../assets/asanoha-400px.png");
 }
 .bl-status .material-icons {
    font-size: 10px;
 }
 .bl-status {
    padding: 5px;
 }
 .bl-row {
  padding: 5px;
  overflow: hidden;
  height: 25px;
 }

 .bl-view .bl-row:nth-child(odd) {
      background: #f4f5f6;
  }
  .bl-view .bl-row:nth-child(even) {
      background: white;
  }
 .bl-view .bl-row:hover {
  background-color: lightgray;
 }
 .bl-view {
    position: absolute;
    width: 100%;
    height: 100px;
    top: 0px;
 }
 .bl-table{
   margin: 5px;
   width: 100%;
 }
 .bl-container, .bl-holder{
    width: 100%;
    position: relative;
 }
 .bl-header td{
   cursor: pointer;
 }
 .bl-header td:hover{
   color: gray;
 }
 .bl-header {
    border-top: 1px solid lightgray;
    font-weight: bolder;
    margin-right: 11px;
 }
 .bl-container{
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
select {
  width: 80px;
  border: 1px solid lightgray;
  background-color: white;
}

</style>
