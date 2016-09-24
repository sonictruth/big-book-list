<template>
  <div id="app">

      <div class="mdl-typography--text-center logo">
       <i class="material-icons">account_balance</i> <br>
      Big Book List</div>
      <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col"></div>
          <div class="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">


          <books-list></books-list>


          </div>
       <div class="mdl-cell mdl-cell--3-col"></div>
      </div>

  </div>
</template>

<script>
import BooksList from './components/BooksList';

export default {
  ready() {
    window.componentHandler.upgradeDom();
  },
  components: {
    BooksList,
  },
};
</script>

<style>
html, body {
  font-family: 'Roboto', 'Helvetica', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  height: 100%;
  background-image: url("./assets/books.jpg");
  background-size: cover;
}

.logo {
  color: white;
  font-weight: bolder;
  font-size: 40px;
  padding: 20px;
}

div {
  box-sizing: border-box;
}



</style>
