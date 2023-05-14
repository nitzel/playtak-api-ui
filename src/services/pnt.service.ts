import { SeekDto } from 'src/types/tak';
import {
  GameRuleset, TournamentDetails, TournamentGame, TournamentGameUpsert, TournamentGroup,
  TournamentMatchup, TournamentStage, TournamentStageUpsert, TournamentSummary,
} from 'src/types/tournament';

const PLAYTAK_API_BASE_URL = `${import.meta.env.VITE_API_HOST}/v1`;

export class PlaytakApiError extends Error {
  constructor(data: { message: string }) {
    super(data.message);
  }
}

export async function createSeek(game: TournamentGame): Promise<SeekDto> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments/seeks/${game.id}`;
  const response = await fetch(url, {
    method: 'PUT',
  });
  if (response.ok) return response.json();
  throw new PlaytakApiError(await response.json());
}

export async function addGame(matchup: Partial<TournamentGameUpsert>): Promise<TournamentGame> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments/game`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(matchup),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) return response.json();
  throw new PlaytakApiError(await response.json());
}

export async function addMatchup(matchup: Partial<TournamentMatchup>): Promise<TournamentMatchup> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments/matchups`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(matchup),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) return response.json();
  throw new PlaytakApiError(await response.json());
}

export async function addGroup(group: Partial<TournamentGroup>): Promise<TournamentGroup> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments/groups`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(group),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) return response.json();
  throw new PlaytakApiError(await response.json());
}

export async function addStage(stage: Partial<TournamentStageUpsert>): Promise<TournamentStage> {
  const url = `${PLAYTAK_API_BASE_URL}/tournaments/stages`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(stage),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) return response.json();
  throw new PlaytakApiError(await response.json());
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
