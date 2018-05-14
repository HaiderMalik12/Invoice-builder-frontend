import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService, AuthService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  logout() {
    this.authService.logOut().subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => {
        this.jwtService.destroyToken();
        this.router.navigate(['/login']);
      }
    );
  }
}
