import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { databaseService } from '@/database/databaseService';
import type { AppSettings, FieldSurvey, GpsPosition, Valve, Zone } from '@/models';
import { gpsService } from '@/services/gpsService';
type AppContextValue={ready:boolean;valves:Valve[];zones:Zone[];surveys:FieldSurvey[];settings:AppSettings|null;position:GpsPosition|null;gpsError:string|null;online:boolean;refresh:()=>Promise<void>;refreshGps:()=>Promise<void>;saveSettings:(s:AppSettings)=>Promise<void>};
const AppContext=createContext<AppContextValue|null>(null);
export function AppDataProvider({children}:{children:ReactNode}){const [ready,setReady]=useState(false),[valves,setValves]=useState<Valve[]>([]),[zones,setZones]=useState<Zone[]>([]),[surveys,setSurveys]=useState<FieldSurvey[]>([]),[settings,setSettingsState]=useState<AppSettings|null>(null),[position,setPosition]=useState<GpsPosition|null>(null),[gpsError,setGpsError]=useState<string|null>(null),[online,setOnline]=useState(true);
 const refresh=async()=>{const [v,z,s,st]=await Promise.all([databaseService.getValves(),databaseService.getZones(),databaseService.getSurveys(),databaseService.getSettings()]);setValves(v);setZones(z);setSurveys(s);setSettingsState(st??null)};
 useEffect(()=>{setOnline(navigator.onLine); const update=()=>setOnline(navigator.onLine); addEventListener('online',update);addEventListener('offline',update);databaseService.initialize().then(refresh).finally(()=>setReady(true)); return()=>{removeEventListener('online',update);removeEventListener('offline',update)}},[]);
 const refreshGps=async()=>{try{setGpsError(null);setPosition(await gpsService.getCurrentPosition())}catch(e){setGpsError(e instanceof Error?e.message:'No fue posible obtener la ubicación')}};
 const saveSettings=async(s:AppSettings)=>{await databaseService.saveSettings(s);setSettingsState(s)};
 const value=useMemo(()=>({ready,valves,zones,surveys,settings,position,gpsError,online,refresh,refreshGps,saveSettings}),[ready,valves,zones,surveys,settings,position,gpsError,online]); return <AppContext.Provider value={value}>{children}</AppContext.Provider>}
export function useAppData(){const c=useContext(AppContext);if(!c)throw new Error('useAppData debe usarse dentro de AppDataProvider');return c}
