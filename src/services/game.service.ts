import { Pagination } from 'src/types/pagination';
import { SearchData, GameData, GameSearchResult } from 'src/types/tak';

export class GameService {
  private API_HOST = `${import.meta.env.VITE_API_HOST}/v1/games-history`;

  public async getGames(pagination?: Pagination, searchData?: SearchData): Promise<GameSearchResult|null> {
    try {
      let path = `${this.API_HOST}?`;
      if (pagination?.page !== undefined && pagination?.rowsPerPage !== undefined) {
        const page = pagination.page - 1;
        path += new URLSearchParams({
          page: page.toString(),
          limit: pagination.rowsPerPage.toString(),
        }).toString();
      }
      if (searchData) {
        path += `&${new URLSearchParams(Object.entries(searchData)
          .filter(([k, v]) => v != null)
          .map(([k, v]) => [k, v.toString()]))}`;
      }
      const results = await fetch(path, {
        method: 'GET',
      });
      return await results.json();
    } catch (error) {
      console.error('Error: ', error);
      return null;
    }
  }

  public async getGameByID(id: string): Promise<GameData> {
    try {
      const url = `${this.API_HOST}/${id}`;
      const result = await fetch(url, {
        method: 'GET',
      });
      const data = await result.json();
      if (data.get('statusCode')) {
        throw new Error(`Failed to get game #${id}: `, data);
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getDBInfo() {
    try {
      const url = `${this.API_HOST}/db`;
      const result = await fetch(url, {
        method: 'GET',
      });
      return await result.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
