import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../types/user.type';
import { UsersService } from '../../services/users.service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../../../shared/types/table-column.type';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: false,
})
export class UsersListComponent implements OnInit, OnDestroy {
  columns: TableColumn[] = [
    { field: 'firstName', header: 'First Name', sortable: true, visible: true },
    {
      field: 'middleName',
      header: 'Middle Name',
      sortable: true,
      visible: true,
    },
    { field: 'lastName', header: 'Last Name', sortable: true, visible: true },
    { field: 'email', header: 'Email', sortable: true, visible: true },
    { field: 'phone', header: 'Phone', sortable: true, visible: true },
    { field: 'role', header: 'Role', sortable: true, visible: true },
    {
      field: 'department',
      header: 'Department',
      sortable: true,
      visible: true,
    },
    { field: 'fleet', header: 'Fleet', sortable: true, visible: true },
  ];

  globalFilterFields: string[] = this.columns.map((c) => c.field);

  tableStyle = { 'min-width': '50rem' };
  dataKey: string = 'id';

  users: User[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.users = res;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something Went Wrong',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
