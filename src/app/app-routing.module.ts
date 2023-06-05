import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DealerAuditSystemComponent } from './dealer-audit-system/dealer-audit-system.component';

const routes: Routes = [
  { path: 'dealer-audit/:User', component: DealerAuditSystemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
