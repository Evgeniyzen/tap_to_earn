// miningWorker.js
let miningInterval;
const coins = [
    { type: 'BTC', chance: 0.01 },
    { type: 'LTC', chance: 0.26 },
    { type: 'XRP', chance: 0.73 },
];

// Функция для распределения монет
function distributeCoins() {
    coins.forEach(coin => {
        const randomValue = Math.random();
        if (randomValue < coin.chance) {
            postMessage({ coinType: coin.type }); // Отправляем сообщение с типом монеты
        }
    });
}

// Функция для запуска майнинга
function startMining() {
    miningInterval = setInterval(distributeCoins, 1000); // Запуск распределения монет каждую секунду
}

// Остановка майнинга
function stopMining() {
    clearInterval(miningInterval);
}

// Получение сообщений из главного потока
onmessage = function(event) {
    const { command } = event.data;
    if (command === 'start') {
        startMining();
    } else if (command === 'stop') {
        stopMining();
    }
};
