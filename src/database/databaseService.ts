import { openDB, type DBSchema } from 'idb';
import type { AppSettings, FieldSurvey, MapLayer, Photo, Valve, Zone } from '@/models';
import { demoPhotos, demoValves, demoZones } from './demo';
interface GISDB extends DBSchema {
 valves:{key:string;value:Valve;indexes:{codigo:string;zona:string}};
 photos:{key:string;value:Photo;indexes:{valvula_id:string}};
 surveys:{key:string;value:FieldSurvey;indexes:{valvula_id:string}};
 zones:{key:string;value:Zone}; layers:{key:string;value:MapLayer;indexes:{zoneId:string}};
 settings:{key:string;value:AppSettings}; meta:{key:string;value:{key:string;value:string}};
}
const defaultSettings:AppSettings={maxGpsAccuracy:10,distanceUnit:'metros',coordinateDisplay:'Decimal',coordinateFormat:'Latitud / Longitud',theme:'Claro'};
const dbPromise=typeof indexedDB==='undefined'?null:openDB<GISDB>('app-valvulas-gis',1,{upgrade(db){
 const valves=db.createObjectStore('valves',{keyPath:'id'}); valves.createIndex('codigo','codigo',{unique:true}); valves.createIndex('zona','zona');
 const photos=db.createObjectStore('photos',{keyPath:'id'}); photos.createIndex('valvula_id','valvula_id');
 const surveys=db.createObjectStore('surveys',{keyPath:'id'}); surveys.createIndex('valvula_id','valvula_id');
 db.createObjectStore('zones',{keyPath:'id'}); const layers=db.createObjectStore('layers',{keyPath:'id'}); layers.createIndex('zoneId','zoneId'); db.createObjectStore('settings'); db.createObjectStore('meta',{keyPath:'key'});
}});
async function db(){if(!dbPromise) throw new Error('IndexedDB no está disponible'); return dbPromise}
export const databaseService={
 async initialize(){const d=await db(); if(await d.get('meta','demo-seeded')) return; const tx=d.transaction(['valves','photos','zones','settings','meta'],'readwrite'); await Promise.all([...demoValves.map(x=>tx.objectStore('valves').put(x)),...demoPhotos.map(x=>tx.objectStore('photos').put(x)),...demoZones.map(x=>tx.objectStore('zones').put(x)),tx.objectStore('settings').put(defaultSettings,'app'),tx.objectStore('meta').put({key:'demo-seeded',value:'1'})]); await tx.done},
 async getValves(){return (await db()).getAll('valves')}, async putValves(items:Valve[]){const tx=(await db()).transaction('valves','readwrite'); await Promise.all(items.map(x=>tx.store.put(x))); await tx.done},
 async getPhotos(valveId?:string){const d=await db(); return valveId?d.getAllFromIndex('photos','valvula_id',valveId):d.getAll('photos')}, async putPhotos(items:Photo[]){const tx=(await db()).transaction('photos','readwrite'); await Promise.all(items.map(x=>tx.store.put(x))); await tx.done},
 async getSurveys(){return (await db()).getAll('surveys')}, async putSurvey(x:FieldSurvey){return (await db()).put('surveys',x)}, async clearSurveys(){return (await db()).clear('surveys')},
 async getZones(){return (await db()).getAll('zones')}, async putZone(x:Zone){return (await db()).put('zones',x)},
 async deleteZone(zone:Zone){const d=await db(); const valves=await d.getAllFromIndex('valves','zona',zone.nombre); const tx=d.transaction(['valves','photos','layers','zones'],'readwrite'); for(const v of valves){const photos=await tx.objectStore('photos').index('valvula_id').getAllKeys(v.id); photos.forEach(id=>tx.objectStore('photos').delete(id)); tx.objectStore('valves').delete(v.id)} const layers=await tx.objectStore('layers').index('zoneId').getAllKeys(zone.id); layers.forEach(id=>tx.objectStore('layers').delete(id)); await tx.objectStore('zones').delete(zone.id); await tx.done},
 async getSettings(){return (await db()).get('settings','app')??defaultSettings}, async saveSettings(x:AppSettings){return (await db()).put('settings',x,'app')},
};
