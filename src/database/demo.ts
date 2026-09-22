import type { Photo, Valve, Zone } from '@/models';
const types = ['Compuerta','Mariposa','Bola','Retención'];
const materials = ['Hierro dúctil','Acero','PVC','Bronce'];
const statuses = ['Operativa','Operativa','Operativa','En revisión'];
const centers = [{lat:-11.9875,lng:-77.0651,zone:'Zona Norte',sector:'Sector Norte'},{lat:-12.0464,lng:-77.0428,zone:'Zona Centro',sector:'Sector Centro'},{lat:-12.1083,lng:-76.9961,zone:'Zona Sur',sector:'Sector Sur'}];
export const demoValves: Valve[] = Array.from({length:20},(_,i)=>{
 const c=centers[i%3] ?? centers[0] ?? {lat:-12.04,lng:-77.04,zone:'Zona Demo',sector:'Sector Demo'}; const n=i+1;
 return {id:`demo-${n}`,codigo:`VAL-${String(n).padStart(3,'0')}`,tipo:types[i%types.length]??'Compuerta',diametro:`${[4,6,8,10][i%4]??6}\"`,material:materials[i%materials.length]??'Hierro dúctil',estado:statuses[i%statuses.length]??'Operativa',latitud:c.lat+((i%5)-2)*0.00055,longitud:c.lng+((i%4)-1.5)*0.00065,altitud:90+i,precision:3.2+(i%4),sector:c.sector,zona:c.zone,observaciones:'Registro ficticio para demostración. No usar como información real.',fecha_actualizacion:'2026-09-21'};
});
export const demoZones: Zone[] = [
 {id:'north',nombre:'Zona Norte',valveCount:7,photoCount:6,sizeBytes:18_400_000,availableOffline:true,updatedAt:'2026-09-21',hasOfflineMap:true,isDemo:true},
 {id:'center',nombre:'Zona Centro',valveCount:7,photoCount:3,sizeBytes:12_800_000,availableOffline:true,updatedAt:'2026-09-20',hasOfflineMap:false,isDemo:true},
 {id:'south',nombre:'Zona Sur',valveCount:6,photoCount:0,sizeBytes:9_600_000,availableOffline:false,updatedAt:'2026-09-18',hasOfflineMap:false,isDemo:true},
];
const svg=(code:string,type:string,color:string)=>new Blob([`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="640"><rect width="900" height="640" fill="${color}"/><circle cx="450" cy="290" r="150" fill="#dbeafe" stroke="#0b4f82" stroke-width="24"/><path d="M320 290h260M450 160v260" stroke="#0b4f82" stroke-width="35"/><rect x="275" y="500" width="350" height="70" rx="12" fill="#082f49"/><text x="450" y="548" font-family="Arial" font-size="34" text-anchor="middle" fill="white">${code} · ${type}</text></svg>`],{type:'image/svg+xml'});
export const demoPhotos: Photo[] = demoValves.slice(0,6).map((v,i)=>({id:`photo-${i}`,valvula_id:v.id,nombre:`${v.codigo.toLowerCase()}_${i%2?'entorno':'frente'}.svg`,tipo_foto:i%2?'Entorno':'Frente',ruta_local:`photos/${v.codigo}/demo.svg`,blob:svg(v.codigo,i%2?'Entorno':'Frente',i%2?'#d1fae5':'#e0f2fe'),fecha:'2026-09-21'}));
