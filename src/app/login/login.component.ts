import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if(!this.username && !this.password){
      this.errorMessage = 'Please input username and password';
    } else if (this.authService.login(this.username, this.password)) {
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        window.location.reload();
      });
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe(status => {
      if(status){
        this.router.navigate(['/']);
      }
    });
  }
}
