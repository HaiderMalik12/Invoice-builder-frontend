import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
  invoice: Invoice;
  total: number;
  isResultsLoading = false;
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { invoice: Invoice }) => {
      this.invoice = data.invoice;
      console.log(this.invoice);
      if (
        typeof this.invoice.qty !== 'undefined' &&
        typeof this.invoice.rate !== 'undefined'
      ) {
        this.total = this.invoice.qty * this.invoice.rate;
      }
      let salesTax = 0;
      if (typeof this.invoice.tax !== 'undefined') {
        salesTax = this.total * this.invoice.tax / 100;
      }
      this.total += salesTax;
    });
  }
  downloadHandler(id) {
    this.isResultsLoading = true;
    this.invoiceService.downloadInvoice(id).subscribe(
      data => {
        saveAs(data, this.invoice.item);
      },
      err => {
        this.errorHandler(err, 'Error while downloading invoice');
      },
      () => {
        this.isResultsLoading = false;
      }
    );
  }
  private errorHandler(error, message) {
    console.error(error);
    this.isResultsLoading = false;
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
