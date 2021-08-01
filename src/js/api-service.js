import { onFetchError, onFetchEnd, onFetchSuccess } from './notify';
import LoadMoreBtn from './load-more-btn';

const API_KEY = '22697108-16f99a6bb7067689183444e58';
const BASE_URL = 'https://pixabay.com/api/';

const axios = require('axios');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchHits() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;

    try {
      const response = await axios(url);
      const newHits = await response.data.hits;

      this.incrementPage();

      if (newHits.length === 0) {
        loadMoreBtn.enable();
        loadMoreBtn.hide();
        return onFetchError();
      }

      if (newHits.length < 40) {
        loadMoreBtn.disable();
        loadMoreBtn.hide();
        onFetchEnd();
      }
      return newHits;
    } catch {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
