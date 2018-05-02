import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { remove } from 'lodash';
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { merge } from 'rxjs/observable/merge';


@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit, AfterViewChecked {
  constructor(
    private invocieService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef) { }
  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource = new MatTableDataSource<Invoice>();
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
        const removedItems = remove(this.dataSource.data, (item) => {
          return item._id === data._id
        });
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Invoice deleted', 'Success', {
          duration: 2000
        })
      }, err => this.errorHandler(err, 'Failed to delete invoice'))
  }
  ngOnInit() {

  }
  filterText(filterValue: string) {
    this.isResultsLoading = true;
    filterValue = filterValue.trim()
    this.paginator.pageIndex = 0;
    this.invocieService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction,
      filter: filterValue
    })
      .subscribe(data => {
        this.dataSource.data = data.docs;
        this.resultsLength = data.total;
        this.isResultsLoading = false;
      }, err => this.errorHandler(err, 'Failed to filter invoices'))
  }

  ngAfterViewChecked() {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.ref.detectChanges();
  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isResultsLoading = true;
          return this.invocieService.getInvoices({
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: ''
          })
        }),
        map(data => {
          this.isResultsLoading = false;
          this.resultsLength = data.total;
          return data.docs;
        }),
        catchError(() => {
          this.isResultsLoading = false;
          this.errorHandler('Failed to fetch invoices', 'Error');
          return observableOf([])
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      })
  }

  private errorHandler(error, message) {
    this.isResultsLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
