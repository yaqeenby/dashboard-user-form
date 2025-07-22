import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationRoutingModule } from './organization-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [InvoiceComponent],
  imports: [RouterModule, OrganizationRoutingModule],
})
export class OrganizationModule {}
