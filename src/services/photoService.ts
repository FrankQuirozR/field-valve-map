import { databaseService } from '@/database/databaseService';
export const photoService={listByValve:(valveId:string)=>databaseService.getPhotos(valveId),url(blob:Blob){return URL.createObjectURL(blob)},release(url:string){URL.revokeObjectURL(url)}};
