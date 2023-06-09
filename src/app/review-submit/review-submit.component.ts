import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css'],
})
export class ReviewSubmitComponent implements OnInit {
  Dealer: any;

  dealerId!:number;

  auditor: any[] = [];

  dateAssignedFormat = 'dd/MM/yyyy';



  constructor(private dealerService: DealerService,) 
  {

    
  }

  ngOnInit(): void {
    // this.getSingleDealer();
    // this.dealerService.getDealerId().subscribe((data1)=>{
    //   this.dealerId=data1;
    //   console.log(this.dealerId)
    // });
    this.dealerService.getReviewSubmit().subscribe((data)=>
    {
    this.Dealer=data;
console.log(this.Dealer);
    });
    this.dealerService.getAuditor().subscribe((data)=>
    {
    this.auditor=data;
console.log(this.auditor);
    });
    
  
}
 

}



