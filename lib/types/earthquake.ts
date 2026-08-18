export interface EarthquakeApiItem {
  date: string;
  hour: string;
  place: string;
  magnitude: string;
  depth: string;
  latitude: string;
  longitude: string;
  image?: string;
  info?: string;
}

export interface EarthquakeApiResponse {
  status: string;
  data: EarthquakeApiItem[];
}

export interface LatestEarthquakeApiResponse {
  status: string;
  data: EarthquakeApiItem;
}

export interface Earthquake {
  id: string;
  occurredAt: string;
  date: string;
  hour: string;
  place: string;
  magnitude: number;
  depthKm: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
  reportUrl: string;
}
