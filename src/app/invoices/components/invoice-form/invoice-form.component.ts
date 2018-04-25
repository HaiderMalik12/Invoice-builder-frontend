import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar, ICON_REGISTRY_PROVIDER } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  private invoice: Invoice;
  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
  }
  onSubmit() {
    //user wants to edit the invoice
    if (this.invoice) {
      this.invoiceService
        .updateInvoice(this.invoice._id, this.invoiceForm.value)
        .subscribe(data => {
          this.snackBar.open('Invoice updated', 'Success', {
            duration: 2000
          });
          this.router.navigate(['dashboard', 'invoices']);
        }, err => this.errorHandler(err, 'Failed to update invoice'));
    }
    else {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        data => {
          this.snackBar.open('Invoice created!', 'Success', {
            duration: 2000
          });
          this.invoiceForm.reset();
          this.router.navigate(['dashboard', 'invoices']);
        },
        err => this.errorHandler(err, 'Failed to create Invoice')
      );
    }
  }
  private setInvoiceToForm() {
    //get the id of the invoice
    this.route.params
      .subscribe(params => {
        let id = params['id'];
        if (!id) {
          return;
        }
        this.invoiceService.getInvoice(id)
          .subscribe(invoice => {
            this.invoice = invoice;
            this.invoiceForm.patchValue(this.invoice);

          }, err => this.errorHandler(err, 'Failed to get Invoice'));
      })

  }
  private createForm() {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: '',
      tax: ''
    });
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
