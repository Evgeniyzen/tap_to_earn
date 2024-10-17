function changeBackground(level = 1) {
    const currentHour = new Date().getHours();
    const backgroundElement = document.getElementById('background');

    let dayBackground = "https://i.gifer.com/IxN.gif";
    let nightBackground = "https://img.freepik.com/free-vector/door-with-magic-portal-to-travel-to-another-universe-or-time-on-rocky-surface-of-alien-planet-in-space-cartoon-game-ui-landscape-with-glowing-mysterious-entrance-to-parallel-reality-or-fantasy-world_107791-23767.jpg";

    if (level > 1) {
        dayBackground = "https://img.freepik.com/free-vector/alien-planet-landscape-space-game-background_107791-1847.jpg?semt=ais_hybrid";
        nightBackground = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wyHa3pGPRrlFNaG7DrprrmU564ONyVmd6Q&s";
    }

    if (currentHour >= 9 && currentHour < 19) {
        backgroundElement.style.backgroundImage = `url(${dayBackground})`;
    } else {
        backgroundElement.style.backgroundImage = `url(${nightBackground})`;
    }
}

// Запуск смены фона при загрузке
window.onload = function() {
    changeBackground();
    loadBalances(); // Загружаем сохраненные балансы

    // Проверка на активный майнинг
    const miningStartTime = localStorage.getItem('miningStartTime');
    const miningDuration = 3600; // Длительность майнинга в секундах
    if (miningStartTime) {
        const startTime = parseInt(miningStartTime);
        const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        const timeLeft = miningDuration - elapsedTime; // Остаток времени

        if (timeLeft > 0) {
            startMining(timeLeft); // Если есть сохраненное время, запускаем майнинг
        }
    }
};

// Устанавливаем начальные значения для балансов
document.getElementById('btc-balance').innerText = '0.0000';
document.getElementById('ltc-balance').innerText = '0.0000';
document.getElementById('xrp-balance').innerText = '0.0000';

// Функция для запуска майнинга
function startMining(initialTimeLeft = 3600) {
    const miningButton = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('mining-timer');
    let timeLeft = initialTimeLeft;
    miningButton.disabled = true; // Деактивируем кнопку
  
    // Сохраняем время начала майнинга
    const startTime = new Date().getTime();
    localStorage.setItem('miningStartTime', startTime);

    // Обновляем таймер каждую секунду
    const interval = setInterval(() => {
        timeLeft--; // Уменьшаем оставшееся время

        if (timeLeft <= 0) {
            clearInterval(interval);
            miningButton.disabled = false; // Включаем кнопку обратно
            timerDisplay.innerText = "Start Mining";
            localStorage.removeItem('miningStartTime'); // Удаляем сохраненное время
        } else {
            timerDisplay.innerText = formatTime(timeLeft);
            distributeCoins(); // Добавляем монеты
        }
    }, 1000);

    // Устанавливаем начальное значение таймера
    timerDisplay.innerText = formatTime(timeLeft);
}

// Форматирование времени в MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Функция для распределения монет
function distributeCoins() {
    const coins = [
        { type: 'BTC', chance: 0.01 },
        { type: 'LTC', chance: 0.26 },
        { type: 'XRP', chance: 0.73 },
    ];

    coins.forEach(coin => {
        const randomValue = Math.random();
        if (randomValue < coin.chance) {
            const balanceElement = document.getElementById(`${coin.type.toLowerCase()}-balance`);
            const currentBalance = parseFloat(balanceElement.innerText) + 0.0001; // Увеличиваем баланс
            balanceElement.innerText = currentBalance.toFixed(4); // Обновляем текст баланса
            animateCoinAddition(coin.type); // Запускаем анимацию
        }
    });
}

// Функция для анимации добавления монет
function animateCoinAddition(coinType) {
    const coinElement = document.createElement('div');
    coinElement.classList.add('animated-coin');
    coinElement.innerText = coinType;

    // Находим элемент main, чтобы ограничить появление анимации
    const mainElement = document.getElementById('main');
    mainElement.appendChild(coinElement); // Добавляем элемент в рабочую область

    // Начальные стили для анимации
    coinElement.style.position = 'absolute';
    coinElement.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
    coinElement.style.opacity = '1';

    // Устанавливаем случайные координаты появления внутри main
    const startX = Math.random() * mainElement.clientWidth;
    const startY = Math.random() * mainElement.clientHeight;
    coinElement.style.left = `${startX}px`;
    coinElement.style.top = `${startY}px`;

    // Увеличиваем размер
    coinElement.style.transform = 'scale(2)';

    // Плавное уменьшение
    setTimeout(() => {
        coinElement.style.transform = 'scale(1)';
        coinElement.style.opacity = '0';
    }, 1000);

    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        coinElement.remove();
    }, 2000);

    // Дополнительная анимация увеличения и уменьшения картинки монеты
    const coinIcon = document.getElementById(`${coinType.toLowerCase()}-icon`);
    coinIcon.style.transition = 'transform 0.5s ease';
    coinIcon.style.transform = 'scale(1.5)'; // Увеличиваем монету

    // Плавное уменьшение монеты обратно
    setTimeout(() => {
        coinIcon.style.transform = 'scale(1)';
    }, 500);
}

// Функция для загрузки сохраненных балансов
function loadBalances() {
    const btcBalance = localStorage.getItem('btcBalance') || '0.0000';
    const ltcBalance = localStorage.getItem('ltcBalance') || '0.0000';
    const xrpBalance = localStorage.getItem('xrpBalance') || '0.0000';

    document.getElementById('btc-balance').innerText = btcBalance;
    document.getElementById('ltc-balance').innerText = ltcBalance;
    document.getElementById('xrp-balance').innerText = xrpBalance;
}

// Обработчик для кнопки "Назад"
document.getElementById('back-btn').addEventListener('click', function() {
    // Сохранение балансов в localStorage перед переходом
    localStorage.setItem('btcBalance', document.getElementById('btc-balance').innerText);
    localStorage.setItem('ltcBalance', document.getElementById('ltc-balance').innerText);
    localStorage.setItem('xrpBalance', document.getElementById('xrp-balance').innerText);

    // Переход на главную страницу
    window.location.href = 'index.html';
});

// Получаем элементы модального окна и иконки
const infoIcon = document.getElementById('info-icon');
const infoModal = document.getElementById('info-modal');
const closeButton = document.querySelector('.close-button');

// Открытие модального окна при клике на иконку
infoIcon.addEventListener('click', () => {
    infoModal.style.display = 'block'; // Показываем модальное окно
});

// Закрытие модального окна при клике на кнопку закрытия
closeButton.addEventListener('click', () => {
    infoModal.style.display = 'none'; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне области контента
window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
        infoModal.style.display = 'none'; // Скрываем модальное окно
    }
});
