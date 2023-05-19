import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, Component, Injectable, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { DealerService } from '../dealer.service';
import { Dealer } from '../entity/dealer';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
  // providedIn:FormBuilder
})
@Component({
  selector: 'app-dealer-audit-system',
  templateUrl: './dealer-audit-system.component.html',
  styleUrls: ['./dealer-audit-system.component.css'],
})


 






export class DealerAuditSystemComponent implements AfterViewInit {

startDate = new Date(1990, 0, 1);
value!: string;
viewValue!: string;
language: String[] = [
  "English",
  "Tamil",
  "Hindi",
];


dealerId !:number;


  @ViewChild(MatSort) sort!: MatSort;
  selectedRowData: any;
  dealerss!: Dealer;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns1: string[] = ['dealerCode', 'businessCenter', 'dealerName','state'];

  dataSource!: MatTableDataSource<Dealer>;
 
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return day !== 0 && day !== 6;
  };

  ngOnInit(): void {
     this.getDealers();
  }
  clickedRows = new Set<any>();
  getDealers() {
    this.dealerService.getDealers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        
        this.dataSource.sort = this.sort;

         console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSingleDealer(){
    this.dealerService.getSingleDealer().subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  ngAfterViewInit() {
    
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
this.dealerId=row.dealerCode;
console.log(this.dealerId);

  }
  // onRowClicked(rowData: any) {
  //   this.selectedRowData = rowData;
  //   this.router.navigate(['/next-stepper'], { state: { data: this.selectedRowData } });
  // }



  showFiller = false;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dealerService: DealerService,
    private router: Router,
  )
  
  
  {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.getDealers();
  }
 
}

export interface PeriodicElement {
  name: number;
  position: number;
  weight: string;
  symbol: string;
}


