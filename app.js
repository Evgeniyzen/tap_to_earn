// Функция для смены фонов в зависимости от времени
function changeBackground(level = 1) {
    const currentHour = new Date().getHours();
    const backgroundElement = document.getElementById('background');

    let dayBackground = "https://img.freepik.com/free-vector/space-background-with-landscape-alien-planet_107791-1125.jpg?semt=ais_hybrid";
    let nightBackground = "https://cdn.pixabay.com/photo/2020/03/22/06/57/game-background-4956017_1280.jpg";

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
};

// Устанавливаем начальные значения для балансов
document.getElementById('btc-balance').innerText = '0.0000';
document.getElementById('ltc-balance').innerText = '0.0000';
document.getElementById('xrp-balance').innerText = '0.0000';

// Функция для создания случайной анимации
function randomFloatAnimation() {
    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        const randomDuration = Math.random() * (5 - 2) + 2; // Случайная продолжительность от 2 до 5 секунд
        const randomDistance = Math.random() * (20 - 5) + 5; // Случайная высота подъема от 5 до 20px
        const randomDelay = Math.random() * 2; // Случайная задержка от 0 до 2 секунд

        coin.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
        coin.style.setProperty('--float-distance', `${randomDistance}px`); // Задаем переменную для расстояния
    });
}

// Изменяем анимацию для каждой монеты
randomFloatAnimation();

// Обновим анимацию в CSS для использования переменной
const style = document.createElement('style');
style.textContent = `
@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(var(--float-distance)); /* Используем переменную для высоты подъема */
    }
}`;
document.head.appendChild(style);

// ------ БАЛАНСЫ ИЗ ЛОКАЛСТОРЕДЖ ---//
const btcBalance = localStorage.getItem('btcBalance') || '0.0000';
const ltcBalance = localStorage.getItem('ltcBalance') || '0.0000';
const xrpBalance = localStorage.getItem('xrpBalance') || '0.0000';

document.getElementById('btc-balance').innerText = btcBalance;
document.getElementById('ltc-balance').innerText = ltcBalance;
document.getElementById('xrp-balance').innerText = xrpBalance;

// Открытие и закрытие модального окна

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
