class Player {
  private element: HTMLDivElement;
  private image: HTMLBodyElement;
  private audio: HTMLAudioElement;
  private state: boolean;
  private track: string;
  private volume: HTMLInputElement;

  constructor(element: HTMLDivElement) {
   this.element = element;
   this.element.addEventListener('click', this.handleClick);
   this.image = document.body as HTMLBodyElement;
   this.audio = document.querySelector('audio') as HTMLAudioElement;
   this.volume = document.getElementById('volume-slider') as HTMLInputElement;
   this.volume.addEventListener('input', this.handleVolumeChange);
   this.state = this.isPlaying();
   this.track = '';
  }

  private handleVolumeChange = (): void => {
    this.audio.volume = Number(this.volume.value) / 100;
    this.volume.style.backgroundSize = this.volume.value + '% 100%'
  }

  private handleClick = (): void => {
    const dataAttributes = this.element.dataset;

    this.state = this.isPlaying();
    this.track = this.audio.src?.split('/').pop() || '';

    if (dataAttributes.image) {
      this.background(dataAttributes.image)
    }

    if (dataAttributes.src && `${dataAttributes.src}.mp3` !== this.track.split('/').pop()) {
      this.audio.src = `/public/sounds/${dataAttributes.src}.mp3`;
    }

    if (this.state || this.audio.src.split('/').pop() !== this.track.split('/').pop()) {
      this.play();
    } else {
      this.pause();
    }

  }

  public background = (bg: string): void => {
    this.image.style.backgroundImage = `url('/public/images/${bg}')`;
  }

  public pause = (): void => {
    this.audio.pause();
  }

  public play = (): void => {
    this.audio.play();
  }

  public isPlaying(): boolean {
    return this.audio.paused;
  }
}

const playerTracks = document.querySelectorAll<HTMLDivElement>('.player__track');
playerTracks.forEach((track) => new Player(track));