import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface JwtPayload {
  sub: string;
  role: string[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';

  // URL del backend (Render)
  private readonly API_URL = 'https://tfm-fraud-backend.onrender.com/auth';

  constructor(private http: HttpClient) {}

  // LOGIN 
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, {
      email,
      password
    });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // REGISTER 
  register(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, {
      fullName,
      email,
      password,
      role: 'USER'
    });
  }

  //  SESSION 
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }

  //  ROLES 
  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const payload = this.decodeToken(token);
    return payload ? payload.role : [];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ADMIN');
  }

  isAuditor(): boolean {
    return this.getRoles().includes('AUDITOR');
  }

  canReject(): boolean {
    return this.isAdmin() || this.isAuditor();
  }

  //  JWT 
  private decodeToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}
