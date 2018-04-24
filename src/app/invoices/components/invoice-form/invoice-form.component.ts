import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
      data => {
        this.invoiceForm.reset();
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }
  createForm() {
    this.invoiceForm = this.fb.group({
      item: '',
      date: '',
      due: '',
      qty: '',
      rate: '',
      tax: ''
    });
  }
}
