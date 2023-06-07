import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Dealer } from "./entity/dealer";
import { Audit } from "./entity/audit";

import { BehaviorSubject } from 'rxjs';
import { User } from "./entity/user";
@Injectable({
    providedIn: 'root'
  })

  export class DealerService{
    private user :BehaviorSubject<any> = new BehaviorSubject(null);


    getAuditor(): Observable<User[]> {
      return this.user;
    }
    setAuditor(user: User) {
      return this.user.next(user);
    }
    private baseURL:string = 'http://localhost:9091/dealer/';

    private baseURL1:string = 'http://localhost:9091/auditor/';
    // [x: string]: any;
    getDealers(): Observable<Dealer[]> {
      return this.httpClient.get<Dealer[]>(this.baseURL + "/showAllDealer");
    }

    getSingleDealer(dealerCode:any) :Observable<any>{
      return this.httpClient.get<Dealer>(this.baseURL + `getDealerById/`+`${dealerCode}`);
    } 

    getAuditors(): Observable<any[]> {
      return this.httpClient.get<any[]>(this.baseURL1 + "/showAllAuditors");
    }
   
   constructor(private httpClient: HttpClient) { }

  //  public getDealers(){
  //   return this.httpClient.get(`${this.baseURL}showAllDealer`);
  // }



  }
