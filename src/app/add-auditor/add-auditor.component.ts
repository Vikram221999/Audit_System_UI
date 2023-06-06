import { Component, OnInit } from '@angular/core';
import { SelectAuditorComponent } from '../select-auditor/select-auditor.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../entity/user';
import { DealerService } from '../dealer.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-auditor',
  templateUrl: './add-auditor.component.html',
  styleUrls: ['./add-auditor.component.css']
})
export class AddAuditorComponent implements OnInit {
  user!:User;
  users : any[]= [];
  temp : any[]= [];
  userName!: string
  projectForm: any;
  // temp 
  constructor(private dialog: MatDialog,
    private route:ActivatedRoute,
    private dealerService: DealerService,
    private _formBuilder: UntypedFormBuilder,
   
    ) {  
      this.projectForm = this._formBuilder.group({
        percentage: null
      });
    }

  ngOnInit(): void {
   
    this.formGroup()
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
  handlePercentage(person: any, index: number) {
    const percentage = this.projectForm.get('percentage').value;
    const dummy ={
      "firstName": person.firstName,
      "percentage": percentage,
    }
    this.temp.push(dummy);
    console.log(this.temp);
    // Perform actions with the percentage value and the person object
    console.log(`Entered percentage for ${person.firstName} (index ${index}): ${percentage}`);
  }
  openDialog(): void {
    
    const dialogRef = this.dialog.open(SelectAuditorComponent, {
      width:"90%",height:"90%"
    
    
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result)
      this.users.push(result)
      this.userName = result.firstName
      console.log(this.users);
    
      
    });
  }
  dummy(person : any, index : number ): void {
    const percentage = this.projectForm.get('percentage')?.value;
    if (percentage !== null && percentage !== '') {
      // this.projectForm.value.firstName = person.firstName
      // this.projectForm.value.lastName = person.lastName
      const firstName =person.firstName
      console.log(index)
      console.log(firstName)
      console.log(percentage)
      const dummy ={
        "firstName": firstName,
        "percentage": percentage,
      }
      this.temp.push(dummy)
      // this.temp[index].firstName = firstName;
      // this.temp[index].percentage = percentage;
      console.log(this.temp);
    }
    // const percentage = this.projectForm.value.percentage;
    // console.log(percentage)
    // if (percentage !== null && percentage !== '') {
     
    //   const result = this.projectForm.value;
    //   console.log(result);
    //   this.users.push(result);
    //   this.userName = result.firstName;
    //   console.log(this.users);
    // }
  }
  

}
