import './sass/main.scss';
import galleryTpl from './templates/gallery-tmp';
import { onFetchError } from './js/notify';
import ImagesApiService from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';
import getRefs from './js/getRefs';

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query.trim() === '') {
    return onFetchError();
  }

  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  imagesApiService.fetchHits().then(hits => {
    appendImagesMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(images));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}
