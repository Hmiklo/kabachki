document.addEventListener('DOMContentLoaded', function() {
    const startDates = [
      new Date('2020-10-13'),
      new Date('2021-01-02'),
      new Date('2021-07-11'),
      new Date('2021-11-04'),
      new Date('2022-03-12'),
      new Date('2022-04-05'),
      new Date('2022-07-03'),
      new Date('2022-07-13'),
      new Date('2022-08-22'),
      new Date('2022-11-03'),
      new Date('2023-03-03'),
      new Date('2023-05-10'),
      new Date('2024-04-11')

    ];
  
    const timerElements = [
      document.getElementById('timer101'),
      document.getElementById('timer102'),
      document.getElementById('timer104'),
      document.getElementById('timer105'),
      document.getElementById('timer106'),
      document.getElementById('timer107'),
      document.getElementById('timer108'),
      document.getElementById('timer109'),
      document.getElementById('timer110'),
      document.getElementById('timer111'),
      document.getElementById('timer112'),
      document.getElementById('timer113'),
      document.getElementById('timer114')


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
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);
  
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
        days: calculatedDays
      };
  }
  
  
  function displayTime(timerElement, difference) {
    const words = [['год', 'года', 'лет'], ['месяц', 'месяца', 'месяцев'], ['день', 'дня', 'дней']];
    const timeStrings = [
      formatNumber(difference.years, words[0]),
      formatNumber(difference.months, words[1]),
      formatNumber(difference.days, words[2])
    ];
  
    // Проверяем, все ли компоненты времени равны нулю
    const allZero = timeStrings.every(str => str === '0 дней' || str === '0 месяцев' || str === '0 лет');
  
    // Если все компоненты времени равны нулю, устанавливаем текст элемента таймера в пустую строку
    if (allZero) {
      timerElement.textContent = '';
    } else {
      // Создаем массив для хранения непустых строк времени
      const nonZeroTimeStrings = [];
    
      // Проверяем каждую строку времени
      timeStrings.forEach(str => {
        // Если строка не равна '0', добавляем ее в массив
        if (str !== '0 дней' && str !== '0 месяцев' && str !== '0 лет') {
          nonZeroTimeStrings.push(str);
        }
      });
    
      // Объединяем непустые строки времени и добавляем 'назад'
      const timeDisplay = nonZeroTimeStrings.join(', ') + ' назад';
      timerElement.textContent = timeDisplay;
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
      }, 1000);
    });
  });
  


  document.addEventListener('DOMContentLoaded', function() {
    var audio1 = document.getElementById('audio1');
    var audio2 = document.getElementById('audio2');
    var musicIcon = document.querySelector('.music-icon');
  
    audio1.addEventListener('play', function() {
        audio2.classList.remove('hidden');
        audio2.play();
  
        // Fade out audio1
        audio1.classList.add('fade-out');
        // Set opacity to 0 to smoothly fade out
        audio1.style.opacity = 0;
        // Disable controls and pause audio1
        audio1.controls = false;
        audio1.pause();
  
        // Fade in audio2
        audio2.style.opacity = 1;
        musicIcon.style.opacity = 1;
  
        // Show music icon
        musicIcon.classList.remove('hidden');
    });
  });