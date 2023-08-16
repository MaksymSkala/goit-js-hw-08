import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const gallery = document.querySelector('.gallery');

const galleryItemsHTML = galleryItems
  .map(
    item =>
      `<li class="gallery__item">
         <a class="gallery__link" href="${item.original}">
           <img
             class="gallery__image"
             src="${item.preview}"
             alt="${item.description}"
             data-source="${item.original}"
           />
         </a>
       </li>`
  )
  .join('');

gallery.innerHTML = galleryItemsHTML;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);