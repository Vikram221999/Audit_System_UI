import { Dealer } from './../entity/dealer';
import { DealerService } from './../dealer.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { ThemePalette,   } from '@angular/material/core';

import {
  AfterViewInit,
  Component,
  Injectable,
  Pipe,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
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
  filteredItems: string[] = [];
  searchTerm: string = '';

[x: string]: any;

  startDate = new Date(1990, 0, 1);
  value!: string;
  viewValue!: string;
  Dealer!: any;
  projectForm: any;
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
  
  @Pipe({
    name: 'filter'
  })


  
  dataSource!: MatTableDataSource<Dealer>;
  searchName!:string;

   user!:User;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dealerService: DealerService,
    private router: Router,
    private dialog: MatDialog,
    private route:ActivatedRoute
   
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

    this.displayedColumns.forEach(column => {
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
        switch (sortHeaderId) {
          case 'dealerCode':
            return data.dealerCode;
          case 'businessCenter':
            return data.businessCenter;
          case 'dealerName':
            return data.dealerName;
          case 'dealerState':
            return data.address.state;
          default:
            return '';
        }
      };
    });
 
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

        console.log(data);
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
      saleGroupSize: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zicode: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  




  getSingleDealer() {
    this.dealerService.getSingleDealer(this.dealerId).subscribe((data) => {
      this.Dealer = data;
      console.log(this.Dealer.address.email);
      this.projectForm.controls['dealerCode'].setValue(data.dealerCode);
      this.projectForm.controls['dealerName'].setValue(data.dealerName);
      this.projectForm.controls['businessCenter'].setValue(data.businessCenter);
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

  onRowClicked(row: any, stepper: MatStepper) {
    console.log('Row clicked: ', row);
    this.dealerId = row.dealerCode;
    console.log(this.dealerId);
    stepper.next();
    this.getSingleDealer();
  }
  openDialog(): void {
    // Open your popup dialog here
    const dialogRef = this.dialog.open(SelectAuditorComponent, {
      width: '90%',
      height: '90%',

      // Specify dialog options if needed
    });

    // Handle dialog close event if necessary
    dialogRef.afterClosed().subscribe((result) => {
      // Do something with the result
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



