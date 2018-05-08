import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Client } from '../../models/client';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<Client>();
  constructor(private clientService: ClientService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.clientService.getClients()
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data;
      }, err => console.error(err));
  }
  saveBtnHanlder() {

  }

  //
  animal: string;
  name: string;
  openDialog(): void {
    let dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      height: '300px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
