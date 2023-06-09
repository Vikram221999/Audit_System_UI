import { Dealer } from './../entity/dealer';
import { DealerService } from './../dealer.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { MAT_DATE_LOCALE, ThemePalette,   } from '@angular/material/core';


import {
  AfterViewInit,
  Component,
  Injectable,
  Pipe,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';

import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { SelectAuditorComponent } from '../select-auditor/select-auditor.component';
import { User } from '../entity/user';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root',
  // providedIn:FormBuilder
})
@Component({
  selector: 'app-dealer-audit-system',
  templateUrl: './dealer-audit-system.component.html',
  styleUrls: ['./dealer-audit-system.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }]
})
export class DealerAuditSystemComponent implements AfterViewInit {
  filteredItems: string[] = [];
  searchTerm: string = '';

[x: string]: any;

  startDate = new Date(1990, 0, 1);
  value!: string;
  viewValue!: string;
  Dealer!: any;
  projectForm: any;
  assignAuditor:any;
  language: String[] = ['English', 'Tamil', 'Hindi'];
   dealerId!: number;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  selectedRowData: any;
  dealerss!: Dealer;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns1: string[] = [
    'dealerCode',
    'businessCenter',
    'dealerName',
    'state',
  ];

  dealerId1 !: any ;
  // =this.dealerService.getDealerId();

  
  @Pipe({
    name: 'filter'
  })


  
  dataSource!: MatTableDataSource<Dealer>;
  searchName!:string;
  dateAssignedControl = new FormControl();
  dateAssignedFormat = 'dd/MM/yyyy';
   user!:User;
   isNextClicked = false;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dealerService: DealerService,
    private router: Router,
    private dialog: MatDialog,
    private route:ActivatedRoute,
    
  ) 
  
  {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.getDealers();
  }
 
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return day !== 0 && day !== 6;
  };

  


  ngOnInit(): void {
    this.getDealers();
    this.formGroup();

   this.dataSource.sort = this.sort;
    
 
  }

// applyFilter(event: any): void {
//   const filterValue = event.target.value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();
// }

// applyFilter(event: Event, columnName: string): void {
//   const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

//   this.dataSource.filter = filterValue.substring(0,filterValue.length-1);

//   this.dataSource.filterPredicate = (data: any) => {
//     const columnValue = data[columnName].toString().toLowerCase();
//     return columnValue.includes(filterValue);
//   };
// }


filterValues: { [key: string]: string } = {};
applyFilter(event: Event, columnName: string): void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.filterValues[columnName] = filterValue;

  this.dataSource.filterPredicate = (data: any) => {
    let match = true;
    for (const key in this.filterValues) {
      if (this.filterValues.hasOwnProperty(key)) {
        const columnValue = data[key]?.toString().toLowerCase();
        const filterVal = this.filterValues[key];
        if (columnValue && !columnValue.includes(filterVal)) {
          match = false;
          break;
        }
      }
    }
    return match;
  };

  this.dataSource.filter = 'filtering';
}









  clickedRows = new Set<any>();
  getDealers() {
    this.dealerService.getDealers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.sort = this.sort;

        //console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  formGroup() {
    this.projectForm = this._formBuilder.group({
      dealerCode: ['', Validators.required],
      dealerName: ['', Validators.required],
      businessCenter: ['', Validators.required],
      dealerCompanyName: ['', Validators.required],
      saleGroupSize: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      
      inceptionDate: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zicode: ['', Validators.required],
      email: ['', Validators.required],

      auditType: ['', Validators.required],
      dateAssigned: ['', Validators.required],  
      reasonAuditSelected: ['', Validators.required], 
      reportLanguage:['',Validators.required],  
      stateLegalLimitation:['',Validators.required],
      noOfMonthsData: ['', Validators.required],
      comments: ['', Validators.required],
    });

   
  }

  formDetails() {
    const updateAssignment = {
      "dealerCode": this.Dealer.dealerCode,
      "dealerName": this.projectForm.value.dealerName,
      "businessCenter": this.projectForm.value.businessCenter,
      "dealerCompanyName": this.projectForm.value.dealerCompanyName,
      "saleGroupSize": this.projectForm.value.saleGroupSize,
      
      "phoneNumber": this.projectForm.value.phoneNumber,
      "addressLine1": this.projectForm.value.addressLine1,
      "addressLine2":this.projectForm.value.country ,
      "inceptionDate":this.projectForm.value.inceptionDate ,
      "state": this.projectForm.value.state ,
      "country": this.projectForm.value.country,
      "city": this.projectForm.value.city,
      "zicode": this.projectForm.value.zicode,
      "email": this.projectForm.value.email,
      "dateAssigned": this.projectForm.value.dateAssigned,
      "reasonAuditSelected": this.projectForm.value.reasonAuditSelected,
     "auditType": this.projectForm.value.auditType,
      "reportLanguage": this.projectForm.value.reportLanguage,
      "stateLegalLimitation": this.projectForm.value.stateLegalLimitation,
      "noOfMonthsData": this.projectForm.value.noOfMonthsData,
      "comments": this.projectForm.value.comments,
    }
    console.log(updateAssignment)
    this.dealerService.setReviewSubmit(updateAssignment);
    // this.service.updateProjectAssignment(updateAssignment).subscribe((data) => {
    //   console.log(data);
    //    this.tsmAlertService.showSuccess("Project Assignment Updated");
    //    this.router.navigate(['./userlist/edituser']);
    //  });
  }
  getSingleDealer() {
    this.dealerService.getSingleDealer(this.dealerId).subscribe((data) => {
      this.Dealer = data;
     // console.log(this.Dealer);
      
     // console.log(this.Dealer.address.email);
      this.projectForm.controls['dealerCode'].setValue(data.dealerCode);
      this.projectForm.controls['dealerName'].setValue(data.dealerName);
      this.projectForm.controls['businessCenter'].setValue(data.businessCenter);
      this.projectForm.controls['dealerCompanyName'].setValue(data.dealerCompanyName);
      this.projectForm.controls['saleGroupSize'].setValue(data.saleGroupSize);
      this.projectForm.controls['phoneNumber'].setValue(
        data.address.phoneNumber
      );
      this.projectForm.controls['addressLine1'].setValue(
        data.address.addressLine1
      );
      this.projectForm.controls['addressLine2'].setValue(
        data.address.addressLine2
      );
      this.projectForm.controls['state'].setValue(data.address.state);
      this.projectForm.controls['country'].setValue(data.address.country);
      this.projectForm.controls['city'].setValue(data.address.city);
      this.projectForm.controls['zicode'].setValue(data.address.zicode);
      this.projectForm.controls['email'].setValue(data.address.email);
    });
  }

  ngAfterViewInit() {}


  reviewsubmit(){
    this.formDetails();
    this.dealerService.setDealerId(this.dealerId);
  }


  onRowClicked(row: any, stepper: MatStepper) {
    //console.log('Row clicked: ', row);
    this.dealerId = row.dealerCode;
    console.log(this.dealerId);
    stepper.next();
   
    //this.dealerId1.next(this.dealerId);
    
    this.getSingleDealer();

  }
  openDialog(): void {
   
    const dialogRef = this.dialog.open(SelectAuditorComponent, {
      width: '90%',
      height: '90%',

    });

    dialogRef.afterClosed().subscribe((result) => {

    });
   
  }

  goToNextStep(stepper: MatStepper): void {
    stepper.next();
  }

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

  userDisplay(){
    
    this.user=this.route.snapshot.params['User'];
    if(this.user!=null||this.user!=undefined){
    return this.user.firstName
  }
  else{
    return "no user"
  }
  }
}

export interface PeriodicElement {
  name: number;
  position: number;
  weight: string;
  symbol: string;
}




