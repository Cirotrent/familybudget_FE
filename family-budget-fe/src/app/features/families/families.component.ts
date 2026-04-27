import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Family, FamilyService } from '../../core/services/family.service';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-families',
  templateUrl: './families.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule
  ]
})

export class FamiliesComponent implements OnInit {

  private familyService = inject(FamilyService);

  families: Family[] = [];
  newFamilyName = '';

  ngOnInit(): void {
    this.loadFamilies();
  }

  loadFamilies() {
    this.familyService.getFamilies().subscribe({
      next: data => this.families = data
    });
  }

  createFamily() {
    if (!this.newFamilyName) return;

    this.familyService.createFamily(this.newFamilyName).subscribe({
      next: () => {
        this.newFamilyName = '';
        this.loadFamilies();
      }
    });
  }

  addMember(familyId: number, username: string) {
    if (!username) return;

    this.familyService.addMember(familyId, username).subscribe({
      next: () => alert('Membro aggiunto'),
      error: err => alert(err.error)
    });
  }
}