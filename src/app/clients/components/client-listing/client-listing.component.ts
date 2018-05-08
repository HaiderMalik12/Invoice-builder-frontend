import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Client } from '../../models/client';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<Client>();
  constructor(private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clientService.getClients()
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data;
      }, err => console.error(err));
  }
  saveBtnHanlder() {

  }
  openDialog(): void {
    let dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      height: '300px'
    });

    dialogRef.afterClosed()
      .filter(clientParam => typeof clientParam === 'object')
      .flatMap(result => {
        debugger;
        return this.clientService.createClient(result)
      })
      .subscribe(data => {
        this.dataSource.data.push(data);
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Created Client', 'Success', {
          duration: 2000
        })
      }, err => this.errorHandler(err, 'Failed to created Client'))
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}
