import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Manager' },
  ];

  departments = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'HR' },
  ];

  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      enableRfid: [false],
      rfid: [''],
      role: [null, Validators.required],
      department: [null, Validators.required],
      fleet: [''],
    });

    this.userForm.get('enableRfid')?.valueChanges.subscribe((v) => {
      console.log(v);
      if (v) this.userForm.get('rfid')?.enable();
      else this.userForm.get('rfid')?.disable();
    });
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

    let data = this.userForm.getRawValue();
    //handle user image
    //add user logic
  }

  cancel() {
    console.log('reset');
    this.previewUrl = null;
    this.userForm.reset();
  }
}
