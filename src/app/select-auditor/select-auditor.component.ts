import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { DealerService } from '../dealer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Dealer } from '../entity/dealer';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-select-auditor',
  templateUrl: './select-auditor.component.html',
  styleUrls: ['./select-auditor.component.css']
})
export class SelectAuditorComponent implements OnInit {
  dealerId!: number;
  dataSource!: MatTableDataSource<Dealer>;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns1: string[] = [
    'dealerCode',
    'businessCenter',
    'dealerName',
    'state',
  ];

  constructor( private dealerService: DealerService,) { }

  ngOnInit(): void {

    this.getDealers();
  }


  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
    this.dealerId = row.dealerCode;
    console.log(this.dealerId);
    
    // this.getSingleDealer();
  }
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

}
