import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7070/api/Login'; 
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.token = response.token; 
        // Guarda el token
        localStorage.setItem('token', this.token ?? '');
      })
    );
  }

  register(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
