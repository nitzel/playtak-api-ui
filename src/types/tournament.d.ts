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

export interface Stage {
  id: number
  name: string
  rules: GameRuleset | number
}

export interface TournamentSummary {
  id: number
  name: string
  description: string
  finished: boolean
}

export interface TournamentDetails extends TournamentSummary {
  stages: Stage[]
}
