import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user.type';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  roles = ['Admin', 'Manager'];

  departments = ['IT', 'HR'];

  previewUrl: string | ArrayBuffer | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      enableRfid: [true],
      rfid: [''],
      role: [null, Validators.required],
      department: [null, Validators.required],
      fleet: [''],
    });

    this.userForm
      .get('enableRfid')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        if (v) this.userForm.get('rfid')?.enable();
        else this.userForm.get('rfid')?.disable();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }

  onImageSelect(event: any) {
    const file: File = event.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    let data: User = this.userForm.getRawValue();

    this.usersService
      .addUser(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Added Successfully',
          });

          setTimeout(() => {
            this.router.navigate(['/organization/users/list']);
          }, 500);
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

  cancel() {
    this.previewUrl = null;
    this.userForm.reset();
    this.router.navigate(['/organization/users/list']);
  }
}
