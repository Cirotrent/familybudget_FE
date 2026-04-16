import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamilyService } from '../../core/services/family.service';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-families',
  templateUrl: './families.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})

export class FamiliesComponent {

  private fb = inject(FormBuilder);
  private service = inject(FamilyService);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  create() {
    if (this.form.invalid) return;

    this.service.createFamily(this.form.value.name!)
      .subscribe();
  }
}