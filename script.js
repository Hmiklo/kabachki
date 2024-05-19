document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-date');
    const sliderDates = document.querySelectorAll('.slider .date');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentSlideIndex = 0;

    function setActiveSlide(index) {
        sliderDates.forEach((date, i) => {
            if (i === index) {
                date.classList.add('date-active');
            } else {
                date.classList.remove('date-active');
            }
        });
    }

    function updateTimelineIndicator(index) {
        timelineItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('timeline-date-active');
            } else {
                item.classList.remove('timeline-date-active');
            }
        });
    }

    function expandSecondPart() {
        const secondPart = document.querySelector('.timeline-date-big .second-part');
        secondPart.classList.add('expanded');
        const timelineDateBig = document.querySelector('.timeline-date-big');
        timelineDateBig.classList.add('active');
    }

    function collapseSecondPart() {
        const secondPart = document.querySelector('.timeline-date-big .second-part');
        secondPart.classList.remove('expanded');
        const timelineDateBig = document.querySelector('.timeline-date-big');
        timelineDateBig.classList.remove('active');
    }

    function navigateSlide(direction) {
        if (direction === 'up') {
            currentSlideIndex = (currentSlideIndex === 0) ? sliderDates.length - 1 : currentSlideIndex - 1;
        } else if (direction === 'down') {
            currentSlideIndex = (currentSlideIndex === sliderDates.length - 1) ? 0 : currentSlideIndex + 1;
        }
      
        setActiveSlide(currentSlideIndex);
        updateTimelineIndicator(currentSlideIndex);

        // Если текущий слайд является timeline-date-big, то раскрываем вторую часть текста и устанавливаем высоту
        if (timelineItems[currentSlideIndex].classList.contains('timeline-date-big')) {
            expandSecondPart();
        } else {
            collapseSecondPart();
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            navigateSlide(event.key === 'ArrowUp' ? 'up' : 'down');
        }
    });

    prevButton.addEventListener('click', function() {
        navigateSlide('up');
    });

    nextButton.addEventListener('click', function() {
        navigateSlide('down');
    });

    timelineItems.forEach((timelineItem, index) => {
        timelineItem.addEventListener('click', function() {
            currentSlideIndex = index;
            setActiveSlide(currentSlideIndex);
            updateTimelineIndicator(currentSlideIndex);

            if (timelineItem.classList.contains('timeline-date-big')) {
                expandSecondPart();
            } else {
                collapseSecondPart();
            }
        });
    });

    setActiveSlide(currentSlideIndex);
    updateTimelineIndicator(currentSlideIndex);
});


document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(event) {
    if (event.key === '1') {
      window.location.href = document.querySelector('.nav-title:nth-child(1) a').href;
    } else if (event.key === '2') {
      window.location.href = document.querySelector('.nav-title:nth-child(2) a').href;
    } else if (event.key === '3') {
      window.location.href = document.querySelector('.nav-title:nth-child(3) a').href;
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    let audio = document.querySelector('audio');
    
    audio.volume = 0.2;
  }, false);
