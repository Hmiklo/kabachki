

document.addEventListener('DOMContentLoaded', function() {
  const startDates = [
    new Date('2020-07-31T17:00:00'),
    new Date('2020-09-05T20:10:00'),
    new Date('2020-10-04T01:00:00'),
    new Date('2022-05-23T16:30:00'),
  ];

  const timerElements = [
    document.getElementById('timer1'),
    document.getElementById('timer2'),
    document.getElementById('timer3'),
    document.getElementById('timer4'),
  ];

  function formatNumber(num, words) {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${num} ${words[0]}`;
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
      return `${num} ${words[1]}`;
    } else {
      return `${num} ${words[2]}`;
    }
  }

  function getTimeDifference(startDate, endDate) {
    const difference = endDate.getTime() - startDate.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const endDay = endDate.getDate();
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();

    let calculatedDays = endDay - startDay;
    let calculatedMonths = endMonth - startMonth;
    let calculatedYears = endYear - startYear;

    if (calculatedDays < 0) {
      calculatedMonths--;
      const monthDays = new Date(endYear, endMonth, 0).getDate();
      calculatedDays += monthDays;
    }

    if (calculatedMonths < 0) {
      calculatedYears--;
      calculatedMonths += 12;
    }

    return {
      years: calculatedYears,
      months: calculatedMonths,
      days: calculatedDays,
      hours: hours % 24,
      minutes: minutes % 60,
    };
  }

  function displayTime(timerElement, difference) {
    const words = [['год', 'года', 'лет'], ['месяц', 'месяца', 'месяцев'], ['день', 'дня', 'дней'], ['час', 'часа', 'часов'], ['минута', 'минуты', 'минут']];
    const timeStrings = [
      difference.years ? formatNumber(difference.years, words[0]) : '',
      difference.months ? formatNumber(difference.months, words[1]) : '',
      difference.days ? formatNumber(difference.days, words[2]) : '',
      difference.hours ? formatNumber(difference.hours, words[3]) : '',
      difference.minutes ? formatNumber(difference.minutes, words[4]) : '',
    ].filter(Boolean); // Remove empty strings

    const timeDisplay = timeStrings.join(', ') + ' назад';
    timerElement.textContent = timeDisplay;

    if (difference.years > 0 && difference.months === 0 && difference.days === 0) {
      timerElement.classList.add('timeryear'); 
    } else {
      timerElement.classList.remove('timeryear');
    }
  }

  function updateTimer(timerElement, startDate) {
    const currentDate = new Date();
    const difference = getTimeDifference(startDate, currentDate);
    displayTime(timerElement, difference);
  }

  timerElements.forEach((timerElement, index) => {
    const startDate = startDates[index];
    updateTimer(timerElement, startDate);

    const interval = setInterval(() => {
      updateTimer(timerElement, startDate);
    }, 60000); // Update every minute
  });
});


document.addEventListener("keydown", function(event) {
  const scrollableElement = document.querySelector(".date-img-scroll");
  const scrollStep = 50; // Шаг прокрутки

  if (event.key === "ArrowRight") {
      scrollableElement.scrollTop += scrollStep; // Прокрутка вниз
      event.preventDefault(); // Предотвращаем прокрутку страницы по умолчанию
  } else if (event.key === "ArrowLeft") {
      scrollableElement.scrollTop -= scrollStep; // Прокрутка вверх
      event.preventDefault(); // Предотвращаем прокрутку страницы по умолчанию
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const rotateButton = document.querySelector('.rotate-button');

  rotateButton.addEventListener('click', function() {
      const imgRotate = document.querySelector('.img-rotate');
      const imgRotateHidden = document.querySelector('.img-rotate-hidden');

      let rotated = imgRotate.style.transform === "rotateY(-180deg)";

      if (rotated) {
          rotateBack(imgRotate, imgRotateHidden);
      } else {
          rotateImage(imgRotate, imgRotateHidden);
      }
  });
});

function rotateImage(imgRotate, imgRotateHidden) {
  imgRotate.style.transform = "rotateY(-180deg)";
  imgRotateHidden.style.transform = "rotateY(0deg)";
  imgRotateHidden.style.opacity = "1";
}

function rotateBack(imgRotate, imgRotateHidden) {
  imgRotate.style.transform = "rotateY(0deg)";
  imgRotateHidden.style.transform = "rotateY(180deg)";
  imgRotateHidden.style.opacity = "0";
}
