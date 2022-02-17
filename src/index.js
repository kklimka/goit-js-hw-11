import './sass/main.scss';
import ApiService from './APIService';
import LoadMoreBtn from './LoadMoreBtn';
import Notiflix from 'notiflix';

const seachForm = document.querySelector('.search-form');
const imgGallery = document.querySelector('.gallery');
const newApiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
});

seachForm.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  
  const currentQuery = e.currentTarget.elements.searchQuery.value.trim();
  if (currentQuery.length === 0) {
    Notiflix.Notify.failure('Please enter your request');
  } else if (currentQuery != newApiService.searchQuery && currentQuery != '') {
    newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
    clearPhotos();
    loadMoreBtn.hide();
    newApiService.resetPage();
    newApiService.fetchPhotos().then(result => {
      if (result.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      } else if (result.length < newApiService.perPage && result.length > 0) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        renderPhotos(result);
      } else {
        Notiflix.Notify.success(`Hooray! We've found ${newApiService.totalHits} images`);
        showPhoto(result);
        loadMoreBtn.show();
      }
    });
  }
}

function onLoadMore() {
  newApiService.fetchPhotos().then(showPhoto);
}
function showPhoto(photos) {
  const articles = photos
    .map(el => {
      return `<div class="photo-card">
          <img src=${el.webformatURL} alt=${el.tags} loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${el.likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${el.views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${el.comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${el.downloads}</span>
            </p>
          </div>
        </div>`;
    })
    .join('');
  imgGallery.insertAdjacentHTML('beforeend', articles);
}

function clearPhotos() {
  imgGallery.innerHTML = '';
}
