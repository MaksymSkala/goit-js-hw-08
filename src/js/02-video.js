import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player'); // Замість "vimeo-player" вкажіть свій id
const storageKey = 'videoplayer-current-time';

// Функція для збереження часу відтворення у локальному сховищі
const saveCurrentTimeToStorage = throttle(async (time) => {
  try {
    await localStorage.setItem(storageKey, time.toString());
  } catch (error) {
    console.error('Error saving current time to localStorage:', error);
  }
}, 1000); // Оновлювати не частіше ніж раз на секунду

// Отримання збереженого часу відтворення з локального сховища
const getSavedTimeFromStorage = async () => {
  try {
    const savedTime = await localStorage.getItem(storageKey);
    return parseFloat(savedTime) || 0;
  } catch (error) {
    console.error('Error getting saved time from localStorage:', error);
    return 0;
  }
};

// Встановлення збереженого часу відтворення у плеєр
getSavedTimeFromStorage().then((savedTime) => {
  vimeoPlayer.setCurrentTime(savedTime);
});

// Відстеження події оновлення часу відтворення
vimeoPlayer.on('timeupdate', async (event) => {
  const currentTime = event.seconds;
  saveCurrentTimeToStorage(currentTime);
});
