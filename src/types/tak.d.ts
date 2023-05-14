export enum Color {
  /* eslint-disable no-unused-vars */
  White = 'WHITE',
  Black = 'BLACK',
  Any = 'ANY',
  /* eslint-enable no-unused-vars */
}

export interface GameData {
  id: number
  date: number
  player_white: string
  player_black: string
  timertime: number
  timerinc: number
  result: string
  size: number
  /** Integer. Double of what it actually is. */
  komi: number
  pieces: number
  capstones: number
  notation: string

  tournament: 0 | 1
  unrated: 0 | 1

  rating_white: number
  rating_black: number
  rating_change_white: number
  rating_change_black: number
}

export interface GameSearchResult {
  page: number
  perPage: number
  total: number
  items: GameData[]
}

export interface SearchData {
  mirror?: boolean
  size?: number
  sort?: string

  game_result?: string
  id?: string
  player_black?: string
  player_white?: string
  type?: 'Normal' | 'Tournament' | 'Unrated' | string;
}

export interface SeekDto {
  id: number;
  pntId: number;
  creator: string;
  opponent: string;
  timeContingent: number;
  timeIncrement: number;
  extraTimeTriggerMove: number;
  extraTimeAmount: number;
  komi: number;
  boardSize: number;
  capstones: number;
  pieces: number;
  unrated: boolean;
  tournament: boolean;
  color: Color;
}
