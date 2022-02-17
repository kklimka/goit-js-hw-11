const axios = require('axios').default;
export default class ApiService {
    BASE_URL = 'https://pixabay.com/api/';
    KEY = '25012805-59b7b0f79caf9ae2fc83ea928';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhotos() {
    

    try {
      const url = await axios.get(
        `${this.BASE_URL}?key=${this.KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`,
      );
      const dataSearch = url.data;
      const dataHits = dataSearch.hits;
      this.totalHits = url.data.totalHits;
      this.incrementPage();
      return dataHits;
      
      
    } catch (error) {
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

/*import axios from 'axios';

export default class APIService{
    BASE_URL = "https://pixabay.com/api/";
    KEY = "25012805-59b7b0f79caf9ae2fc83ea928";
    constructor(){
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
    }

    fetchPhotos(){
        const url = `${this.BASE_URL}?key=${this.KEY}&q=${this.searchQuery}&image-type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;
        return fetch(url, options)
        .then(r => r.json())
        .then(data => {
            this.incrementPage();
            return data.hits;
        });
    }

    async fetchPhotos() {
        return await axios
        .get(
            `${this.BASE_URL}?key=${this.KEY}&q=${this.searchQuery}&image-type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
        )
        .then(response => {
            this.incrementPage();
            return response.data;
        }
        )
        .catch(e => {
            console.error(e);
            console.error('Sorry, there are no images matching your search query. Please try again.');
         });

    }
    incrementPage() {
        this.page += 1;
     }
  
     resetPage() {
        this.page = 1;
     }
     get query(){
         return this.searchQuery;
     }
     set query(newQuery){
         this.searchQuery = newQuery;
     }
}
*/
