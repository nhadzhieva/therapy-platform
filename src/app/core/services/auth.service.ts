import { Injectable, inject } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { User, UserRole } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    return this.apiService.get<User[]>(`users?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('Invalid credentials');
        }
        const user = users[0];
        const token = this.generateToken(user);
        this.storeAuthData(user, token);
        return { user, token };
      })
    );
  }

  register(userData: Partial<User>): Observable<{ user: User; token: string }> {
    const newUser: User = {
      id: this.generateId(),
      email: userData.email!,
      role: userData.role!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      phone: userData.phone,
      avatar: userData.avatar || `https://i.pravatar.cc/150?u=${userData.email}`,
      createdAt: new Date(),
      ...userData
    };

    return this.apiService.post<User>('users', newUser).pipe(
      map(user => {
        const token = this.generateToken(user);
        this.storeAuthData(user, token);
        return { user, token };
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private generateToken(user: User): string {
    return btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role, timestamp: Date.now() }));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private storeAuthData(user: User, token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));
  }
}
