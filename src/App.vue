<template>
  <div id="app">

      <div class="mdl-typography--text-center logo animated slideInDown">
       <i class="material-icons">account_balance</i><br>
           Big Book List
      </div>
      <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col"></div>
          <div class="mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet animated zoomIn">


          <books-list></books-list>


          </div>
       <div class="mdl-cell mdl-cell--2-col"></div>
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
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  height: 100%;
  background-image: url("./assets/books.jpg");
  background-size: cover;
}
td, html, body{
  font-family: 'Roboto', 'Helvetica', sans-serif;
}

.logo {
  color: white;
  font-weight: bolder;
  font-size: 40px;
  padding: 20px;
}

div, tr, td {
  box-sizing: border-box;
}

</style>
