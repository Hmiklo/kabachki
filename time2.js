 
  document.addEventListener('DOMContentLoaded', function() {
    const startDates = [
      new Date('2020-09-27'),
      new Date('2020-12-31'),
      new Date('2021-01-12'),
      new Date('2021-03-20'),
      new Date('2021-04-16'),
      new Date('2021-05-14'),
      new Date('2021-07-29'),
      new Date('2021-12-31'),
      new Date('2022-02-27'),
      new Date('2022-05-30'),
      new Date('2022-06-04'),
      new Date('2022-07-02'),
      new Date('2022-07-30'), // 22
      new Date('2022-12-31'),
      new Date('2023-01-22'),
      new Date('2023-07-17'),
      new Date('2023-09-05'),
      new Date('2023-12-31'),
      new Date('2024-02-23'),
      new Date('2024-03-17'),
      new Date('2021-06-16'),
    ];
  
    const timerElements = [
      document.getElementById('timer10'),
      document.getElementById('timer11'),
      document.getElementById('timer12'),
      document.getElementById('timer13'),
      document.getElementById('timer14'),
      document.getElementById('timer15'),
      document.getElementById('timer16'),
      document.getElementById('timer17'),
      document.getElementById('timer18'),
      document.getElementById('timer19'),
      document.getElementById('timer20'),
      document.getElementById('timer21'),
      document.getElementById('timer22'),
      document.getElementById('timer23'),
      document.getElementById('timer24'),
      document.getElementById('timer25'),
      document.getElementById('timer26'),
      document.getElementById('timer27'),
      document.getElementById('timer28'),
      document.getElementById('timer29'),
      document.getElementById('timer103')
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

  

