import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { DealerService } from '../dealer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Dealer } from '../entity/dealer';
import { MatSort } from '@angular/material/sort';
import { Audit } from '../entity/audit';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../entity/user';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-auditor',
  templateUrl: './select-auditor.component.html',
  styleUrls: ['./select-auditor.component.css'],
})
export class SelectAuditorComponent implements OnInit {
  dealerId!: number;
  dataSource!: MatTableDataSource<Audit>;
  user!: User;
  users: User[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns1: string[] = [
    'lastName',
    'firstName',
    'title',
    'description',
  ];



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
  




  constructor(
    private dealerService: DealerService,
    private router: Router,
    public dialogRef: MatDialogRef<SelectAuditorComponent>,
    @Inject(MAT_DIALOG_DATA) public dummy: any
  ) {}

  ngOnInit(): void {
    console.log(this.dummy)
    this.getAuditors();

    this.dataSource.sort = this.sort;
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
    this.user = row;
    console.log(this.user.userId)
    const index = this.dummy.findIndex((user: any) => user.userId !== this.user.userId);
    if (index !== -1) {
      console.log(234567)
      this.dummy.splice(index, 1);
    }
    this.dialogRef.close(row);

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  getAuditors() {

    this.dealerService.getAuditors().subscribe(
      (data) => {
        // this.dummy.(this.user)
        console.log(this.dummy)
        if (this.dummy.length > 0) {
          data = data.filter((item: any) =>
            !this.dummy.some((dummyItem: any) =>
              JSON.stringify(dummyItem) === JSON.stringify(item)
            )
          );
        }
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.users = data; 
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  // getAuditors() {
  //   this.dealerService.getAuditor().subscribe(
  //     (data) => {
  //       this.users = data;

  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  //   this.dealerService.getAuditors().subscribe(
  //     (data) => {
  //       if (this.dummy.length > 0) {
  //         for (let index = 0; index < data.length; index++) {
  //           console.log(123);
  //           console.log(data);
  //           console.log(this.dummy);
  //           if (
  //             this.dummy.some((item: any) =>JSON.stringify(item) === JSON.stringify(data[index])
  //             )
  //           ) {
  //             console.log(4564674567);
  //             data.splice(index, 1);
  //             this.dataSource = new MatTableDataSource(data);
  //             this.dataSource.sort = this.sort;
  //           }
  //         }
  //       } else {
  //         this.dataSource = new MatTableDataSource(data);
  //         this.dataSource.sort = this.sort;
  //       }
  //       console.log(this.dataSource);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
