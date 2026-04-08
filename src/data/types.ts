export interface AccidentRecord {
  id?: string;
  time?: string;
  latitude?: number;
  longitude?: number;
  weather?: string;
  road_type?: string;
  roadType?: string;
  severity?: 'Minor' | 'Moderate' | 'Severe' | 'Fatal' | string;
}
