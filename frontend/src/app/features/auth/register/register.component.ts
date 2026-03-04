import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  currentStep = 1;

  accountType: 'USER' | 'COMPANY' = 'USER';

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
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      certificationLevel: ['Sin certificación'],
      acceptTerms: [false, [Validators.requiredTrue]],
      cif: [''],
      role: ['ROLE_USER']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/feed']);
    }
  }

  // Método para cambiar el tipo de cuenta y ajustar validaciones
    setAccountType(type: 'USER' | 'COMPANY'): void {
        this.accountType = type;
        const cifControl = this.registerForm.get('cif');
        const roleControl = this.registerForm.get('role');

        if (type === 'COMPANY') {
            // Si es empresa, exigimos CIF y cambiamos el rol
            cifControl?.setValidators([Validators.required, Validators.pattern(/^[A-Z0-9]{8,9}$/i)]);
            roleControl?.setValue('ROLE_COMPANY');
        } else {
            // Si es usuario normal, limpiamos validaciones
            cifControl?.clearValidators();
            cifControl?.setValue('');
            roleControl?.setValue('ROLE_USER');
        }
        // Actualizamos el estado del formulario en tiempo real
        cifControl?.updateValueAndValidity();
    }

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric;
    return valid ? null : { weakPassword: true };
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, email, password, fullName, cif, role } = this.registerForm.value;

    this.authService.register({ username, email, password, fullName, cif, role }).subscribe({
      next: () => {
        const target = this.authService.isAdmin() ? '/admin' : '/';
        this.router.navigate([target]);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  nextStep(): void {
    if (this.currentStep === 1) {
        const isCifValid = this.accountType === 'COMPANY' ? this.registerForm.get('cif')?.valid : true;
        const step1Valid = this.username?.valid && this.email?.valid && this.fullName?.valid && isCifValid;
      if (step1Valid) {
        this.currentStep = 2;
      } else {
        this.username?.markAsTouched();
        this.email?.markAsTouched();
        this.fullName?.markAsTouched();
        this.registerForm.get('cif')?.markAsTouched();
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getPasswordStrength(): number {
    const password = this.password?.value || '';
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get fullName() { return this.registerForm.get('fullName'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get acceptTerms() { return this.registerForm.get('acceptTerms'); }
    get cif() { return this.registerForm.get('cif'); }
}
