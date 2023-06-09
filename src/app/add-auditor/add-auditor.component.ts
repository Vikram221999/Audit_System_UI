import { Component, OnInit } from '@angular/core';
import { SelectAuditorComponent } from '../select-auditor/select-auditor.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../entity/user';
import { DealerService } from '../dealer.service';
import { ChangeDetectorRef } from '@angular/core';

import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-auditor',
  templateUrl: './add-auditor.component.html',
  styleUrls: ['./add-auditor.component.css'],
})
export class AddAuditorComponent implements OnInit {
  user!: User;
  users: any[] = [];
  abc: any[] = [];
  temp: any[] = [];
  userName!: string;
  projectForm: any;
  // temp
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private dealerService: DealerService,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.projectForm = this._formBuilder.group({
      percentage: null,
    });
  }

  ngOnInit(): void {
    this.formGroup();
  }
  formGroup() {
    this.projectForm = this._formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      percentage: ['', Validators.required],
    });
    for (let i = 0; i < this.users.length; i++) {
      this.projectForm.addControl('percentage_' + i, new FormControl(null));
    }
  }
  
  handlePercentage(person: User, index: number) {
  
    const percentage = this.projectForm.get('percentage').value;

    this.temp.splice(index, 1);
    const dummy = {
      userId: person.userId,
      firstName: person.firstName,
      lastName: person.firstName,
      percentage: percentage,
    };
    this.dealerService.setAuditor(person);
    // if(this.users.includes(person)){ 
    this.abc.push(person);
  // }
    this.temp.push(dummy);
    console.log(this.temp);
    this.projectForm.get('percentage').value = 0;
    // Perform actions with the percentage value and the person object
    console.log(
      `Entered percentage for ${person.firstName} (index ${index}): ${percentage}`
    );
    // }else{
    //  console.warn("cannot add");
    // }
    const sum = this.temp
      .map((item) => item.percentage)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log('Total Percentage:', sum);
    if (sum == 100) {

this.dealerService.setAuditor(this.temp);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '100% Entered',
        showConfirmButton: false,
        timer: 1500
      })
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Give the 100%',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      
      console.warn();
    }
  }
  //   openDialog(index: number): void {
  //     if(this.users.length >=2){
  //       this.users.splice(index,1);
  //     }
  //     const dialogRef = this.dialog.open(SelectAuditorComponent, {
  //       data :  this.abc,
  //       width:"90%",height:"90%"

  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       if(result){
  //       console.log(result)
  //       this.users.push(result)
  //       this.userName = result.firstName
  //       console.log(this.users);
  //     }
  //       else{
  // console.log(2543465)
  //       }

  //     });

  //   }
  openDialogs(index: number ,person: any): void {
    // this.abc = this.abc.filter(user => !this.users.includes(user));
    if (this.users.length >= 2) {
      this.users.splice(index, 1);
    }
    const dialogRef = this.dialog.open(SelectAuditorComponent, {
      data: this.abc, // Pass a copy of abc array
      width: '90%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.users.push(result);
        this.userName = result.firstName;
        const indexToRemove = this.abc.findIndex(
          (item) => item.userId === result.userId
        );
        if (indexToRemove !== -1) {
          this.abc.splice(indexToRemove, 1);
          // console.log(45689+'jhgjh');
          
        }
      } else {
       
        console.warn(45689+'jhgjh');
      }
    });
  }
  openDialog(index: number): void {
    
    if (this.users.length >= 2) {
      this.users.splice(index, 1);
    }
    const dialogRef = this.dialog.open(SelectAuditorComponent, {
      data: this.abc.slice(), // Pass a copy of abc array
      width: '90%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.users.push(result);
        this.userName = result.firstName;
        const indexToRemove = this.abc.findIndex(
          (item) => item.userId === result.userId
        );
        if (indexToRemove !== -1) {
          this.abc.splice(indexToRemove, 1);
          console.log(45689+'jhgjh');
          
        }
      } else {
       
        console.warn(45689+'jhgjh');
      }
    });
  }

}
