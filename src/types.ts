export interface WeddingConfig {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  coordinates: { lat: number; lng: number };
  mapQuery: string;
  musicUrl: string;
  musicTitle: string;
  additionalInfo: string;
}

export interface GuestResponse {
  id: string;
  name: string;
  isAttending: boolean;
  guestsCount: number;
  wishes?: string;
  timestamp: string;
}
