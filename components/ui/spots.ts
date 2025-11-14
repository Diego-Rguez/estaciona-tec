export type Status = 'free' | 'busy' | 'reserved';

export type Spot = {
  id: string;
  x: number; y: number; w: number; h: number;
  r?: number;
  status: Status;
};

export const initialSpots: Spot[] = [
  { id: 'A1', x: 120, y: 180, w: 40, h: 80, status: 'free' },
  { id: 'A2', x: 180, y: 180, w: 40, h: 80, status: 'busy' },
  { id: 'A3', x: 240, y: 180, w: 40, h: 80, status: 'reserved' },
];
