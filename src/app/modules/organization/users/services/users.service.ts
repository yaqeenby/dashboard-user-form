import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';
import { MockApiService } from '../../../../core/api/mock-api';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private mockApiService: MockApiService) {}

  getUsers(): Observable<Array<User>> {
    return this.mockApiService.get<Array<User>>('/users');
  }

  addUser(user: User): Observable<User> {
    return this.mockApiService.post<User>('/users', user);
  }
}
