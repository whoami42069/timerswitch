export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  vx: number;
  vy: number;
}

export interface AnimatedEmoji {
  id: number;
  imageIndex: number;
  position: Position;
  velocity: Velocity;
}

export interface CollisionEffect {
  id: string;
  position: Position;
  timestamp: number;
}

export interface Timezone {
  name: string;
  offset: number;
  label: string;
}

export type Player = 'X' | 'O' | null;

export interface TicTacToeState {
  board: Player[];
  currentPlayer: Player;
  winner: Player | 'draw' | null;
}