type Color = { accent: string, dark: string };

export interface IColors {
  [index: string]: Color;
}

export interface IPlaylist {
  id: string;
  albumId: number;
  title: string;
  color: Color;
  cover: string;
  artists: string[];
}

export interface ISong {
  id: number;
  albumId: number;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
}

export interface IMusic {
	id: string;
  src: string;
	song: ISong | null;
	songs: ISong[];
}

export interface ResponseData {
  [index: string]: ISong[] | string;
  id: string;
  songs: ISong[];
}
