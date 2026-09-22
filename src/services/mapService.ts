import type { Valve } from '@/models';
export const mapService={toFeatureCollection(valves:Valve[]){return {type:'FeatureCollection' as const,features:valves.map(v=>({type:'Feature' as const,geometry:{type:'Point' as const,coordinates:[v.longitud,v.latitud]},properties:{id:v.id,codigo:v.codigo,tipo:v.tipo,diametro:v.diametro,estado:v.estado}}))}};
