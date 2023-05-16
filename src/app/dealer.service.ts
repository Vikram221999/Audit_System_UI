import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Dealer } from "./entity/dealer";


@Injectable({
    providedIn: 'root'
  })

  export class DealerService{
    private baseURL:string = 'http://localhost:9091/dealer/';
    // [x: string]: any;
    getDealers(): Observable<Dealer[]> {
      return this.httpClient.get<Dealer[]>(this.baseURL + "/showAllDealer");
    }

    getSingleDealer() :Observable<Dealer>{
      return this.httpClient.get<Dealer>(this.baseURL + "/getDealerById");
    } 
   
   constructor(private httpClient: HttpClient) { }

  //  public getDealers(){
  //   return this.httpClient.get(`${this.baseURL}showAllDealer`);
  // }



  }
