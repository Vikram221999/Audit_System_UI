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
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { SelectAuditorComponent } from '../select-auditor/select-auditor.component';
import { User } from '../entity/user';
import { DatePipe } from '@angular/common';
import { Audit } from '../entity/audit';
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
  bool=true;
  audit!:any;

[x: string]: any;

  startDate = new Date(1990, 0, 1);
  value!: string;
  viewValue!: string;
  Dealer!: any;
  projectForm1: any;
  projectForm2: any;
  assignAuditor:any;
  language: String[] = ['English', 'Tamil', 'Hindi'];
   dealerId!: number;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowData: any;
  dealerss!: Dealer;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns1: string[] = [
    'dealerCode',
    'businessCenter',
    'dealerName',
    'state',
  ];


  Dealer1: any;
  auditor: any[] = [];
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
    private datepipe:DatePipe

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
    console.warn(this.firstFormGroup.valid)
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
    this.projectForm1 = this._formBuilder.group({
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

      
    });

    this.projectForm2 = this._formBuilder.group({
      auditType: ['', Validators.required],
      dateAssigned: ['', Validators.required],  
      reasonAuditSelected: ['', Validators.required], 
      reportLanguage:['',Validators.required],  
      stateLegalLimitation:['',Validators.required],
      noOfMonthsData: ['', Validators.required],
      comments: ['', Validators.required],

    })

   
  }

  async formDetails(stepper:MatStepper) {
    const updateAssignment = {
      "dealerCode": this.Dealer.dealerCode,
      "dealerName": this.projectForm1.value.dealerName,
      "businessCenter": this.projectForm1.value.businessCenter,
      "dealerCompanyName": this.projectForm1.value.dealerCompanyName,
      "saleGroupSize": this.projectForm1.value.saleGroupSize,
      "phoneNumber": this.projectForm1.value.phoneNumber,
      "addressLine1": this.projectForm1.value.addressLine1,
      "addressLine2":this.projectForm1.value.country ,
      "inceptionDate":this.projectForm1.value.inceptionDate ,
      "state": this.projectForm1.value.state ,
      "country": this.projectForm1.value.country,
      "city": this.projectForm1.value.city,
      "zicode": this.projectForm1.value.zicode,
      "email": this.projectForm1.value.email,
      "dateAssigned": this.projectForm2.value.dateAssigned,
      "reasonAuditSelected": this.projectForm2.value.reasonAuditSelected,
     "auditType": this.projectForm2.value.auditType,
      "reportLanguage": this.projectForm2.value.reportLanguage,
      "stateLegalLimitation": this.projectForm2.value.stateLegalLimitation,
      "noOfMonthsData": this.projectForm2.value.noOfMonthsData,
      "comments": this.projectForm2.value.comments,
      
    }
    this.onRowClicked1(stepper)
    // await new Promise(resolve => setTimeout(resolve, 250)); 
    console.log(updateAssignment)
    this.dealerService.setReviewSubmit(updateAssignment);
    // this.service.updateProjectAssignment(updateAssignment).subscribe((data) => {
    //   console.log(data);
    //    this.tsmAlertService.showSuccess("Project Assignment Updated");
    //    this.router.navigate(['./userlist/edituser']);
    //  });
    await new Promise(resolve => setTimeout(resolve, 250)); 
    this.bool=false;

  }
  getSingleDealer() {
    this.dealerService.getSingleDealer(this.dealerId).subscribe((data) => {
      this.Dealer = data;
     // console.log(this.Dealer);
      
     // console.log(this.Dealer.address.email);
      this.projectForm1.controls['dealerCode'].setValue(data.dealerCode);
      this.projectForm1.controls['dealerName'].setValue(data.dealerName);
      this.projectForm1.controls['businessCenter'].setValue(data.businessCenter);
      this.projectForm1.controls['dealerCompanyName'].setValue(data.dealerCompanyName);
      this.projectForm1.controls['saleGroupSize'].setValue(data.saleGroupSize);
      this.projectForm1.controls['phoneNumber'].setValue(
        data.address.phoneNumber
      );
      this.projectForm1.controls['addressLine1'].setValue(
        data.address.addressLine1
      );
      this.projectForm1.controls['addressLine2'].setValue(
        data.address.addressLine2
      );
      this.projectForm1.controls['state'].setValue(data.address.state);
      this.projectForm1.controls['country'].setValue(data.address.country);
      this.projectForm1.controls['city'].setValue(data.address.city);
      this.projectForm1.controls['zicode'].setValue(data.address.zicode);
      this.projectForm1.controls['email'].setValue(data.address.email);
    });
  }

  ngAfterViewInit() {}


  reviewsubmit(stepper:MatStepper){
    this.formDetails(stepper);
    this.dealerService.setDealerId(this.dealerId);
  }

  async onRowClicked(row: any, stepper: MatStepper) {
    //console.log('Row clicked: ', row);
    this.bool=false
    await new Promise(resolve => setTimeout(resolve, 250)); 
    this.dealerId = row.dealerCode;
    console.log(this.dealerId);
    stepper.next();
   
    //this.dealerId1.next(this.dealerId);
    
    this.getSingleDealer();
    this.bool=true
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

  onSubmit(){
    this.dealerService.getReviewSubmit().subscribe((data)=>
    {
    this.Dealer1=data;
console.log(this.Dealer);
    });
    this.dealerService.getAuditor().subscribe((data)=>
    {
    this.auditor=data;
console.log(this.auditor);
    });

    this.Dealer1={
      "dealerCode": this.Dealer.dealerCode,
      "dealerName": this.projectForm1.value.dealerName,
      "businessCenter": this.projectForm1.value.businessCenter,
      "dealerCompanyName": this.projectForm1.value.dealerCompanyName,
      "saleGroupSize": this.projectForm1.value.saleGroupSize,
      "phoneNumber": this.projectForm1.value.phoneNumber,
      "addressLine1": this.projectForm1.value.addressLine1,
      "addressLine2":this.projectForm1.value.country ,
      "inceptionDate":this.projectForm1.value.inceptionDate ,
      "state": this.projectForm1.value.state ,
      "country": this.projectForm1.value.country,
      "city": this.projectForm1.value.city,
      "zicode": this.projectForm1.value.zicode,
      "email": this.projectForm1.value.email,
      "dateAssigned": this.projectForm2.value.dateAssigned,
      "reasonAuditSelected": this.projectForm2.value.reasonAuditSelected,
     "auditType": this.projectForm2.value.auditType,
      "reportLanguage": this.projectForm2.value.reportLanguage,
      "stateLegalLimitation": this.projectForm2.value.stateLegalLimitation,
      "noOfMonthsData": this.projectForm2.value.noOfMonthsData,
      "comments": this.projectForm2.value.comments,
      "AuditorWorkAllocation":this.auditor
    }

    const audit ={
      "dateAssigned": this.datepipe.transform( this.projectForm2.value.dateAssigned,"yyyy-MM-dd"),
     "auditType": this.projectForm2.value.auditType,
      "noOfMonthsData": this.projectForm2.value.noOfMonthsData,
      "comments": this.projectForm2.value.comments,
      
    }
    const audit11={
      "audit":audit,
      "AuditorWorkAllocation":this.auditor
    }
    console.log(audit11);
    this.dealerService.createAuditor(this.Dealer1.dealerCode,audit11).subscribe(data=>{
      console.log(data);
      
    })
    



  }
  dummy(){
    
  }
  async onRowClicked1( stepper: MatStepper){
    this.bool=false
    await new Promise(resolve => setTimeout(resolve, 250)); 
    console.log(this.dealerId);
    stepper.next(); 
    //this.dealerId1.next(this.dealerId);
    this.bool=true
  }
}

export interface PeriodicElement {
  name: number;
  position: number;
  weight: string;
  symbol: string;
}



