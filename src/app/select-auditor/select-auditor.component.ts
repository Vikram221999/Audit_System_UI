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

@Component({
  selector: 'app-select-auditor',
  templateUrl: './select-auditor.component.html',
  styleUrls: ['./select-auditor.component.css'],
})
export class SelectAuditorComponent implements OnInit {
  dealerId!: number;
  dataSource!: MatTableDataSource<Audit>;
  user!: User;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns1: string[] = [
    'lastName',
    'firstName',
    'title',
    'description',
  ];

  constructor(
    private dealerService: DealerService,
    private router: Router,
    public dialogRef: MatDialogRef<SelectAuditorComponent>
  ) {}

  ngOnInit(): void {
    this.getAuditors();
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
    this.user = row;
    // this.dealerService.setAuditor(this.user);
    // console.log(this.dealerId);
    this.dialogRef.close(row);
  

    // this.closeDialog;

  }
  closeDialog( ): void {
    this.dialogRef.close();
  }
  getAuditors() {
    this.dealerService.getAuditors().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
