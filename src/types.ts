export interface WeddingConfig {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  date: string;
  time: string;
  weddingDate?: string;
  uzatuDate?: string;
  weddingTime?: string;
  uzatuTime?: string;
  venueName: string;
  venueAddress: string;
  twoGisUrl?: string;
  coordinates: { lat: number; lng: number };
  mapQuery: string;
  weddingVenueName?: string;
  weddingVenueAddress?: string;
  weddingTwoGisUrl?: string;
  weddingMapQuery?: string;
  uzatuVenueName?: string;
  uzatuVenueAddress?: string;
  uzatuTwoGisUrl?: string;
  uzatuMapQuery?: string;
  musicUrl: string;
  musicTitle: string;
  additionalInfo: string;
  weddingAdditionalInfo?: string;
  uzatuAdditionalInfo?: string;
}

export interface GuestResponse {
  id: string;
  name: string;
  isAttending: boolean;
  guestsCount: number;
  wishes?: string;
  timestamp: string;
}
