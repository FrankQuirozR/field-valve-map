export interface Valve {
  id: string; codigo: string; tipo: string; diametro: string; material: string; estado: string;
  latitud: number; longitud: number; altitud?: number; precision?: number; sector: string; zona: string;
  observaciones?: string; fecha_actualizacion: string;
}
export interface Photo { id: string; valvula_id: string; nombre: string; tipo_foto: 'Frente'|'Entorno'|'Tapa'|'Placa'|'Otra'; ruta_local: string; blob: Blob; fecha: string }
export interface FieldSurvey { id: string; valvula_id: string; latitud_campo: number; longitud_campo: number; precision_gps: number; altitud?: number; fecha: string; hora: string; observaciones: string; estado: 'guardado'|'exportado' }
export interface Zone { id: string; nombre: string; valveCount: number; photoCount: number; sizeBytes: number; availableOffline: boolean; updatedAt: string; hasOfflineMap: boolean; isDemo?: boolean }
export interface MapLayer { id: string; zoneId: string; name: string; type: 'valves'|'pipes'|'sectors'|'basemap'; data?: Blob; enabled: boolean }
export interface AppSettings { maxGpsAccuracy: number; distanceUnit: 'metros'; coordinateDisplay: 'Decimal'; coordinateFormat: 'Latitud / Longitud'; theme: 'Claro'|'Oscuro' }
export interface StorageInfo { data: number; photos: number; maps: number; total: number; available?: number }
export interface GpsPosition { latitude: number; longitude: number; accuracy: number; altitude?: number; timestamp: number }
