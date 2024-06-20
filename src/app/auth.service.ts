import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly validUsername: string = 'admin';
  private readonly validPassword: string = 'admin';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      localStorage.setItem('authToken', 'dummy-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }
}