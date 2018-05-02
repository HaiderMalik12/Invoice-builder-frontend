import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { remove } from 'lodash';
import 'rxjs/Rx';


@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
  constructor(
    private invocieService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar) { }
  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  resultsLength = 0;
  isResultsLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  saveBtnHanlder() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }
  editBtnHandler(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  }
  deleteBtnHandler(id) {
    this.invocieService.deleteInvoice(id)
      .subscribe(data => {
        const removedItems = remove(this.dataSource, (item) => {
          return item._id === data._id
        });
        this.dataSource = [...this.dataSource];
        this.snackBar.open('Invoice deleted', 'Success', {
          duration: 2000
        })
      }, err => this.errorHandler(err, 'Failed to delete invoice'))
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.paginator
      .page
      .flatMap(() => {
        this.isResultsLoading = true;
        return this.invocieService.getInvoices({
          page: this.paginator.pageIndex,
          perPage: this.paginator.pageSize,
          sortField: this.sort.active,
          sortDir: this.sort.direction
        })
      })
      .subscribe(data => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        this.isResultsLoading = false;
      }, err => this.errorHandler(err, 'Failed to fetch invoices'));

    this.sort.sortChange.
      flatMap(() => {
        this.isResultsLoading = true;
        this.paginator.pageIndex = 0;
        return this.invocieService.getInvoices({
          page: this.paginator.pageIndex,
          perPage: this.paginator.pageSize,
          sortField: this.sort.active,
          sortDir: this.sort.direction
        })
      })
      .subscribe((data) => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        this.isResultsLoading = false;
      }, err => this.errorHandler(err, 'Failed to fetch invoices'));

    this.populateInvoices();
  }
  private populateInvoices() {
    this.isResultsLoading = true
    this.invocieService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction
    }).subscribe(
      data => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        console.log(data);
      },
      err => this.errorHandler(err, 'Failed to fetch invoices'),
      () => {
        this.isResultsLoading = false;
      });
  }
  private errorHandler(error, message) {
    this.isResultsLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
