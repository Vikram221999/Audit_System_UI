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
    private dealerId :BehaviorSubject<any> = new BehaviorSubject(0);
    private reviewSubmit :BehaviorSubject<any> = new BehaviorSubject(null);

    getDealerId(): Observable<any> {
      return this.dealerId;
    }
    setDealerId(dealerId: any) {
      return this.dealerId.next(dealerId);
    }

    getReviewSubmit(): Observable<any> {
      return this.reviewSubmit;
    }
    setReviewSubmit(reviewSubmit: any) {
      return this.reviewSubmit.next(reviewSubmit);
    }

    getAuditor(): Observable<any[]> {
      return this.user;
    }
    setAuditor(user: any) {
      return this.user.next(user);
    }
    private baseURL:string = 'http://172.16.2.102:9091/dealer/';

    private baseURL1:string = 'http://172.16.2.102:9091/auditor/';
    private baseURL2:string = 'http://172.16.2.102:9091/audit/';
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

   
    createAuditor( dealerCode:any,data : any): Observable < any > {
      return this.httpClient.post<any>(this.baseURL2 + `saveAudit/`+`${dealerCode}`, data);
  }
   
   constructor(private httpClient: HttpClient) { }

  //  public getDealers(){
  //   return this.httpClient.get(`${this.baseURL}showAllDealer`);
  // }



  }
