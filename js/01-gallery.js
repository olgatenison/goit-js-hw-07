// отримуємо масив карток
import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

//створюємо всі картки
const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      />
      
    </a>
  </li>`;
  })
  .join("");

// вставляємо в хтмл
gallery.insertAdjacentHTML("beforeend", markup);

// вішаємо клік
gallery.addEventListener("click", onGallery);

function onGallery(evt) {
  // прибераємо поведінку за замовчуванням
  evt.preventDefault();

  // перевіряем куди клікнули
  if (evt.target.className !== "gallery__image") {
    return;
  } else {
    // передаємо в модалку адресу картинки з target.dataset
    const fullImgModal = basicLightbox.create(`
    <div class="modal">
    <img src=${evt.target.dataset.source} 
    width="800" height="600">
    </div>
    `);
    // викликаємо  модалку
    fullImgModal.show();

    // слухаємо клавіатуру
    window.addEventListener("keydown", onModalKeydown);
    // закриття модалки по Escape
    function onModalKeydown(evt) {
      if (evt.code === "Escape") {
        fullImgModal.close();
      }
    }
  }
}
