import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
  constructor(private invocieService: InvoiceService, private router: Router) { }
  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];

  saveBtnHanlder() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }
  deleteBtnHandler(id) {
    this.invocieService.deleteInvoice(id)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.error(err);
      })
  }
  ngOnInit() {
    this.invocieService.getInvoices().subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }
}
