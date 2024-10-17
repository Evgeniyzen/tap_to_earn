function changeBackground(level = 1) {
    const currentHour = new Date().getHours();
    const backgroundElement = document.getElementById('background');

    let dayBackground = "https://i.gifer.com/IxN.gif";
    let nightBackground = "https://img.freepik.com/free-vector/door-with-magic-portal-to-travel-to-another-universe-or-time-on-rocky-surface-of-alien-planet-in-space-cartoon-game-ui-landscape-with-glowing-mysterious-entrance-to-parallel-reality-or-fantasy-world_107791-23767.jpg";

    if (level > 1) {
        dayBackground = "https://img.freepik.com/free-vector/alien-planet-landscape-space-game-background_107791-1847.jpg?semt=ais_hybrid";
        nightBackground = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wyHa3pGPRrlFNaG7DrprrmU564ONyVmd6Q&s";
    }

    backgroundElement.style.backgroundImage = (currentHour >= 9 && currentHour < 19) ? 
        `url(${dayBackground})` : `url(${nightBackground})`;
}

// Запуск смены фона при загрузке
window.onload = function() {
    changeBackground();
    loadBalances(); // Загружаем сохраненные балансы
};

// Устанавливаем начальные значения для балансов
function loadBalances() {
    document.getElementById('btc-balance').innerText = localStorage.getItem('btcBalance') || '0.0000';
    document.getElementById('ltc-balance').innerText = localStorage.getItem('ltcBalance') || '0.0000';
    document.getElementById('xrp-balance').innerText = localStorage.getItem('xrpBalance') || '0.0000';
}

function startMining() {
    const miningButton = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('mining-timer');
    let timeLeft = 3600; // 1 час в секундах
    miningButton.disabled = true; // Деактивируем кнопку

    const interval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);
        
        // Добавляем монеты каждую секунду
        distributeCoins();

        // Сохраняем оставшееся время в localStorage
        localStorage.setItem('timeLeft', timeLeft);

        if (timeLeft <= 0) {
            clearInterval(interval);
            miningButton.disabled = false; // Включаем кнопку обратно
            timerDisplay.innerText = "Start Mining";
            localStorage.removeItem('timeLeft'); // Удаляем сохраненное время
        }
    }, 1000);
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
            
            // Сохраняем обновленный баланс в localStorage
            localStorage.setItem(`${coin.type.toLowerCase()}Balance`, currentBalance);
            
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

// Обработка кнопки "Назад"
document.getElementById('back-btn').addEventListener('click', function() {
    // Сохраняем балансы перед переходом на главную страницу
    localStorage.setItem('btcBalance', document.getElementById('btc-balance').innerText);
    localStorage.setItem('ltcBalance', document.getElementById('ltc-balance').innerText);
    localStorage.setItem('xrpBalance', document.getElementById('xrp-balance').innerText);

    // Переход на главную страницу
    window.location.href = 'index.html';
});

// Проверка состояния при загрузке страницы
window.onload = function() {
    changeBackground();
    loadBalances(); // Загружаем сохраненные балансы
    
    // Проверка на активный майнинг
    const savedTimeLeft = localStorage.getItem('timeLeft');
    if (savedTimeLeft) {
        startMining(); // Если есть сохраненное время, запускаем майнинг
    }
};
