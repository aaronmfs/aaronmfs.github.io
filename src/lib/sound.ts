import clickSound from '../assets/sounds/click.ogg';

let audio: HTMLAudioElement | null = null;

export function playClick() {
  if (!audio) {
    audio = new Audio(clickSound);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
