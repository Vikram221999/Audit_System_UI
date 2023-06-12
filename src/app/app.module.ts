import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { DealerAuditSystemComponent } from './dealer-audit-system/dealer-audit-system.component';
import { SideNavbarComponent } from './navbars/side-navbar/side-navbar.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopNavbarComponent } from './navbars/top-navbar/top-navbar.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectAuditorComponent } from './select-auditor/select-auditor.component';
import { AddAuditorComponent } from './add-auditor/add-auditor.component';

import { SearchDealerCodePipe } from './pipe/search-dealer-code.pipe';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';
import { MatTableModule } from '@angular/material/table';

import { PracticeComponent } from './practice/practice.component';

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';


import { DatePipe } from '@angular/common';






@NgModule({
  declarations: [
    AppComponent,
    DealerAuditSystemComponent,
    SideNavbarComponent,
    TopNavbarComponent,
    SelectAuditorComponent,

    AddAuditorComponent,

    SearchDealerCodePipe,
      ReviewSubmitComponent,
      PracticeComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule  ,
    MatTableModule ,

  ],
  providers: [FormBuilder,
    DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-US' }],
  bootstrap: [AppComponent],
  
  
  
 
})
export class AppModule { }