import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  isSaving = false;
  successMessage = '';
  errorMessage = '';
  avatarPreview: string | null = null;
  selectedFile: File | null = null;

  certificationLevels = [
    'Sin certificación',
    'Open Water Diver',
    'Advanced Open Water',
    'Rescue Diver',
    'Divemaster',
    'Instructor'
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      bio: ['', [Validators.maxLength(500)]],
      location: ['', [Validators.maxLength(100)]],
      certificationLevel: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.profileForm.patchValue({
        fullName: this.currentUser.fullName,
        bio: this.currentUser.bio || '',
        location: this.currentUser.location || '',
        certificationLevel: this.currentUser.certificationLevel || 'Sin certificación'
      });
      this.avatarPreview = this.currentUser.avatar || null;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Por favor selecciona una imagen válida';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'La imagen no puede superar los 5MB';
        return;
      }

      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeAvatar(): void {
    this.avatarPreview = null;
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.selectedFile) {
      this.userService.uploadAvatar(this.selectedFile).subscribe({
        next: (response) => {
          this.updateProfile(response.avatarUrl);
        },
        error: (err) => {
          this.errorMessage = 'Error al subir la imagen';
          this.isSaving = false;
        }
      });
    } else {
      this.updateProfile();
    }
  }

  private updateProfile(avatarUrl?: string): void {
    const data = {
      ...this.profileForm.value,
      ...(avatarUrl && { avatar: avatarUrl })
    };

    this.userService.updateProfile(data).subscribe({
      next: (updatedUser) => {
        this.successMessage = 'Perfil actualizado correctamente';
        this.isSaving = false;
        
        setTimeout(() => {
          this.router.navigate(['/profile', updatedUser.username]);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = 'Error al actualizar el perfil';
        this.isSaving = false;
      }
    });
  }

  get fullName() { return this.profileForm.get('fullName'); }
  get bio() { return this.profileForm.get('bio'); }
  get location() { return this.profileForm.get('location'); }
}
