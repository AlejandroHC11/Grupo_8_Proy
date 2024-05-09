import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  // private primarysid$ = new BehaviorSubject<string>("");


  constructor() { 
    this.loadInitialData();
  }

  private loadInitialData() {
    const storedIdUser = localStorage.getItem('idUser');
    if (storedIdUser) {
      // Aquí podrías emitir este valor mediante un BehaviorSubject si fuera necesario
      console.log('Loaded idUser from LocalStorage:', storedIdUser);
    }
  }
  public getIdUserFromStore(): string | null {
    return localStorage.getItem('idUser');
  }

  public setIdUserForStore(idUser: string) {
    localStorage.setItem('idUser', idUser);
  }

  public getCreatorUserFromStore(): string | null {
    return localStorage.getItem('creatorUser');
  }
  public setCreatorUserForStore(creatorUser: string) {
    localStorage.setItem('creatorUser', creatorUser);
  }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName : string){
    this.fullName$.next(fullName)
  }

  
  // public getIdFromStore(){
  //   return this.primarysid$.asObservable();
  // }
  // public setIdForStore(primarysid : string){
  //   this.primarysid$.next(primarysid)
  // }


}
