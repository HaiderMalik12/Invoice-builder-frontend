import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
  constructor(private invocieService: InvoiceService) {}

  ngOnInit() {
    this.invocieService.getInvoices().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }
}
