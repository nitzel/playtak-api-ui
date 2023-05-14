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

interface BaseTournamentGame {
  id: number
  player1goesFirst?: boolean
  playtakId?: number
  result?: string
  matchup?: number
}
export interface TournamentGame extends BaseTournamentGame {
  rules: GameRuleset
}
export interface TournamentGameUpsert extends BaseTournamentGame {
  rules: number
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

interface BaseTournamentStage {
  id: number
  name: string
  groups: TournamentGroup[]
  tournament?: number
}
export interface TournamentStage extends BaseTournamentStage {
  rules: GameRuleset
}
export interface TournamentStageUpsert extends BaseTournamentStage {
  rules: number
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
