import { Dealer } from './../entity/dealer';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDealerCode'
})
export class SearchDealerCodePipe implements PipeTransform {

  transform(dealer:Dealer[],searchName:String|any): any {
    if(!dealer || !searchName){
      return dealer;
    }
    return dealer.filter(dealer => 
      
      dealer.dealerCode==(searchName)
     
      );
  }
  }


