import { Injectable } from '@angular/core';
import { IPlayer } from '../RoulettePage/player-list/player/player.model';
// Optional: npm i lz-string
// import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

const KEY = 'roulette.config.history';
const MAX_ITEMS = 5;

type StoredPlayer = Pick<IPlayer, 'id' | 'PlayerName'> & {
  classIds?: number[];    // minimize: store class IDs
  specIds?: string[];     // minimize: store spec IDs
};

@Injectable({ providedIn: 'root' })
export class RouletteStorageService {
  // Serialize a minimal snapshot
  private toStored(players: IPlayer[]): StoredPlayer[] {
    return players.map(p => ({
      id: p.id,
      PlayerName: p.PlayerName,
      classIds: (p.classList ?? []).map(c => c.id),
      specIds: (p.classList ?? []).flatMap(c => c.activeSpecs ?? []),
    }));
  }

  // Deserialize snapshot (you can hydrate richer objects in reducer/effect)
  private fromStored(players: StoredPlayer[]): IPlayer[] {
    return players.map(p => ({
      id: p.id,
      PlayerName: p.PlayerName,
      classList: (p.classIds ?? []).map(id => ({ id, className: '', activeSpecs: [] }))
    }));
  }

  saveConfig(players: IPlayer[]): void {
    const history = this.loadHistoryRaw();
    const next = this.toStored(players);
    const updated = [next, ...history].slice(0, MAX_ITEMS);
    const json = JSON.stringify(updated);
    // const json = compressToUTF16(JSON.stringify(updated)); // if using lz-string
    localStorage.setItem(KEY, json);
  }

  loadLatest(): IPlayer[] | null {
    const history = this.loadHistoryRaw();
    if (!history.length) return null;
    return this.fromStored(history[0]);
  }

  loadHistory(): IPlayer[][] {
    return this.loadHistoryRaw().map(this.fromStored.bind(this));
  }

  clear(): void {
    localStorage.removeItem(KEY);
  }

  private loadHistoryRaw(): StoredPlayer[][] {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    try {
      // const decompressed = decompressFromUTF16(raw) ?? '[]';
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}