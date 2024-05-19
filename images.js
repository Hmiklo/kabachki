document.addEventListener('DOMContentLoaded', function() {
  const imageContainers = document.querySelectorAll('.date-img-carousel');

  imageContainers.forEach(carousel => {
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.date-img-cont');
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('thumbnail-container');

    images.forEach((image, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('thumbnail');
      thumbnail.src = image.querySelector('.date-imgs').src;
      thumbnail.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
      });

      thumbnailContainer.appendChild(thumbnail);
    });

    carousel.appendChild(thumbnailContainer);

    function showImage(index) {
      // Update the main image display
      images.forEach((image, i) => {
        image.style.display = i === index ? 'block' : 'none';
      });

      // Highlight the corresponding thumbnail
      const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
      thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.toggle('thumbnail-active', i === index);
      });
    }

    showImage(currentIndex);
  
    // Обработчики событий для кнопок "prev-arrow" и "next-arrow"
    const prevButton = carousel.querySelector('.prev-arrow');
    const nextButton = carousel.querySelector('.next-arrow');

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    // Обработчики событий для клавиш "влево", "вправо", "вверх" и "вниз"
    document.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      } else if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        currentIndex = 0; // Возвращаемся к первой картинке
        showImage(currentIndex);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('.gallery');

  galleries.forEach(gallery => {
      const thumbnails = gallery.querySelectorAll('.gallery-thumbnail');
      const prevButton = gallery.querySelector('.gallery-prev');
      const nextButton = gallery.querySelector('.gallery-next');
      let currentIndex = 0;

      // Функция обновления увеличенной миниатюры
      function updateThumbnails() {
          thumbnails.forEach((thumbnail, index) => {
              if (index === currentIndex) {
                  thumbnail.classList.add('enlarged');
                  thumbnail.style.opacity = '1';
              } else {
                  thumbnail.classList.remove('enlarged');
                  thumbnail.style.opacity = '0.7';
              }
          });
      }

      function showNextImage() {
          currentIndex = (currentIndex + 1) % thumbnails.length;
          updateThumbnails();
      }

      function showPrevImage() {
          currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
          updateThumbnails();
      }

      prevButton.addEventListener('click', showPrevImage);
      nextButton.addEventListener('click', showNextImage);

      // Обработчики клавиатуры для Shift и Ctrl
      document.addEventListener('keydown', function(event) {
          if (event.key === 'Shift') {
              showNextImage();
          } else if (event.key === 'Control' || event.key === 'Ctrl') {
              showPrevImage();
          }
      });

      // Проверяем наличие изображений в галерее
      if (thumbnails.length > 0) {
          // Устанавливаем currentIndex на 0 и обновляем миниатюры
          currentIndex = 0;
          updateThumbnails();

          thumbnails.forEach((thumbnail, index) => {
              thumbnail.addEventListener('click', function() {
                  if (this.classList.contains('enlarged')) {
                      // Если кликнута увеличенная миниатюра, сворачиваем её
                      this.classList.remove('enlarged');
                      this.style.opacity = '0.7'; // Скрываем прозрачность
                  } else {
                      // Иначе сворачиваем другие увеличенные миниатюры и открываем текущую
                      currentIndex = index;
                      updateThumbnails();
                  }
              });
          });
      }
  });
});