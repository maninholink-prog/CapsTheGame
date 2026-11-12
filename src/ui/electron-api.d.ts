import type {SaveSummary} from '../profile/save-store.js';
declare global {
 interface Window {
  capsSaves?: {
   list():Promise<SaveSummary[]>;
   read(id:string):Promise<string|null>;
   write(id:string,raw:string):Promise<void>;
  };
 }
}
export {};
