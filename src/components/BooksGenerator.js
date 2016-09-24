import genres from './genres.js';
import genders from './genders.js';
import names from './names.js';
import words from './words.json';

export default class BooksGenerator {
  static getBooks(numberOfBooks = 1000000) {
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const namesLength = names.length - 1;
    const genresLength = genres.length - 1;
    const gendersLength = genders.length - 1;
    const wordsLength = words.length - 1;
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const books = [];
        for (let i = 0; i < numberOfBooks; i++) {
          /* eslint prefer-template: 0*/
          const title = words[getRandom(0, wordsLength)]
            + ' ' + words[getRandom(0, wordsLength)];
          const authorName = names[getRandom(0, namesLength)]
            + ' ' + names[getRandom(0, namesLength)];
          const authorGender = getRandom(0, gendersLength);
          const publishDate = getRandom(-1474675203, 1474675203453);
          const genre = getRandom(0, genresLength);
          books.push({ title, authorName, authorGender, publishDate, genre });
        }
        resolve(books);
      }, 1);
    });
  }
}
