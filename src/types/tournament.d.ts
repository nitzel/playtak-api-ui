export interface GameRuleset {
  id: number;
  name: string;
  /** Seconds */
  timeContingent: number;
  /** Seconds */
  timeIncrement: number;
  extraTimeTriggerMove: number;
  /** Seconds */
  extraTimeAmount: number;
  komi: number;
  boardSize: number;
  capstones: number;
  pieces: number;
}

export interface TournamentGame {
  id: number
  rules: GameRuleset | number
  player1goesFirst?: boolean
  playtakId?: number
  result?: string
  matchup?: number
}
export interface TournamentMatchup {
  id: number
  player1: string
  player2: string
  games: TournamentGame[]
  group?: number
}

export interface TournamentGroup {
  id: number
  name: string
  matchups: TournamentMatchup[]
  stage?: number
}

export interface TournamentStage {
  id: number
  name: string
  rules: GameRuleset | number
  groups: TournamentGroup[]
  tournament?: number
}

export interface TournamentSummary {
  id: number
  name: string
  description: string
  finished: boolean
}

export interface TournamentDetails extends TournamentSummary {
  stages: TournamentStage[]
}
