import { GameRuleset, TournamentDetails, TournamentSummary } from 'src/types/tournament';

const PLAYTAK_API_BASE_URL = `${import.meta.env.VITE_API_HOST}/v1`;

export class PlaytakApiError extends Error {
  constructor(data: { message: string }) {
    super(data.message);
  }
}

export async function getTournaments(): Promise<TournamentSummary[]> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments`;
  const response = await fetch(url);
  const json = await response.json();

  if (response.ok) return json.tournaments;
  console.warn('Failed to fetch tournaments', json);
  throw new PlaytakApiError(json);
}

export async function getTournament(id: number): Promise<TournamentDetails> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments/${id}`;
  const response = await fetch(url);
  const json = await response.json();

  if (response.ok) return json;
  console.warn(`Failed to fetch tournament #${id}`, json);
  throw new PlaytakApiError(json);
}

export async function getRulesets(): Promise<GameRuleset[]> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments/game-rules`;
  const response = await fetch(url);
  const json = await response.json();

  if (response.ok) return json;
  console.warn('Failed to fetch game-rules', json);
  throw new PlaytakApiError(json);
}
