import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private primarysid$ = new BehaviorSubject<string>("");


  constructor() { }


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

  
  public getIdFromStore(){
    return this.primarysid$.asObservable();
  }
  public setIdForStore(primarysid : string){
    this.primarysid$.next(primarysid)
  }


}
