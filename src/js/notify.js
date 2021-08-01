import Notiflix from 'notiflix';

function onFetchError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

function onFetchEnd() {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

export { onFetchError, onFetchEnd };
