import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');
const storageKey = 'videoplayer-current-time';

const saveCurrentTimeToStorage = throttle(async (time) => {
  try {
    await localStorage.setItem(storageKey, time.toString());
  } catch (error) {
    console.error('Error saving current time to localStorage:', error);
  }
}, 1000);

const getSavedTimeFromStorage = async () => {
  try {
    const savedTime = await localStorage.getItem(storageKey);
    return parseFloat(savedTime) || 0;
  } catch (error) {
    console.error('Error getting saved time from localStorage:', error);
    return 0;
  }
};

getSavedTimeFromStorage().then((savedTime) => {
  vimeoPlayer.setCurrentTime(savedTime);
});

vimeoPlayer.on('timeupdate', async (event) => {
  const currentTime = event.seconds;
  saveCurrentTimeToStorage(currentTime);
});
