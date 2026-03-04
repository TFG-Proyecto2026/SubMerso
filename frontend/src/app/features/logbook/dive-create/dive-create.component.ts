import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiveService } from '../../../core/services/dive.service';

@Component({
  selector: 'app-dive-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dive-create.component.html',
  styleUrl: './dive-create.component.css'
})
export class DiveCreateComponent {
  form: FormGroup;
  enviando = false;
  error = '';

  opcionesProteccion = [
    { value: 'WET_SUIT', label: 'Traje húmedo' },
    { value: 'DRY_SUIT', label: 'Traje seco' },
    { value: 'HOOD', label: 'Capa' },
    { value: 'GLOVES', label: 'Guantes' },
    { value: 'BOOTS', label: 'Botas' }
  ];

  opcionesCondiciones = [
    { value: 'FRESH', label: 'Agua dulce' },
    { value: 'SALT', label: 'Agua salada' },
    { value: 'SHORE', label: 'Desde orilla' },
    { value: 'BOAT', label: 'Desde embarcación' },
    { value: 'WAVES', label: 'Olas / marejada' },
    { value: 'CURRENT', label: 'Corriente / deriva' },
    { value: 'CONTROLLED', label: 'Medio controlado' }
  ];

  opcionesTipoInmersion = [
    { value: 'COMPUTER', label: 'Inmersión con ordenador' },
    { value: 'RDP', label: 'Inmersión RDP / eRDP(L)' },
    { value: 'REBREATHER', label: 'Inmersión con rebreather' }
  ];

  constructor(
    private fb: FormBuilder,
    private diveService: DiveService,
    private router: Router
  ) {
    this.form = this.fb.group({
      diveNumber: [null],
      diveDate: [null, Validators.required],
      location: ['', Validators.required],
      depthMax: [null, Validators.required],
      durationMinutes: [null, Validators.required],
      rnt: [null],
      abt: [null],
      tbt: [null],
      visibility: [null],
      visibilityUnit: ['m'],
      tempAir: [null],
      tempSurface: [null],
      tempBottom: [null],
      weight: [null],
      weightUnit: ['kg'],
      exposureProtection: [[]],
      conditions: [[]],
      diveType: ['COMPUTER'],
      pressureStart: [null],
      pressureEnd: [null],
      timeIn: [null],
      timeOut: [null],
      gasMixPercent: [null],
      comments: [''],
      bottomTimeToDate: [null],
      bottomTimeThisDive: [null],
      cumulativeTime: [null]
    });
  }

  toggleProteccion(value: string): void {
    const arr = this.form.get('exposureProtection')?.value as string[] || [];
    const idx = arr.indexOf(value);
    if (idx === -1) this.form.patchValue({ exposureProtection: [...arr, value] });
    else this.form.patchValue({ exposureProtection: arr.filter((_, i) => i !== idx) });
  }

  tieneProteccion(value: string): boolean {
    return ((this.form.get('exposureProtection')?.value as string[]) || []).includes(value);
  }

  toggleCondicion(value: string): void {
    const arr = this.form.get('conditions')?.value as string[] || [];
    const idx = arr.indexOf(value);
    if (idx === -1) this.form.patchValue({ conditions: [...arr, value] });
    else this.form.patchValue({ conditions: arr.filter((_, i) => i !== idx) });
  }

  tieneCondicion(value: string): boolean {
    return ((this.form.get('conditions')?.value as string[]) || []).includes(value);
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Completa al menos los campos obligatorios: fecha, ubicación, profundidad y duración.';
      return;
    }
    this.error = '';
    this.enviando = true;
    const raw = this.form.getRawValue();
    const payload = {
      diveNumber: raw.diveNumber ?? undefined,
      diveDate: raw.diveDate ?? undefined,
      location: raw.location || undefined,
      depthMax: raw.depthMax ?? undefined,
      durationMinutes: raw.durationMinutes ?? undefined,
      rnt: raw.rnt ?? undefined,
      abt: raw.abt ?? undefined,
      tbt: raw.tbt ?? undefined,
      visibility: raw.visibility ?? undefined,
      visibilityUnit: raw.visibilityUnit || undefined,
      tempAir: raw.tempAir ?? undefined,
      tempSurface: raw.tempSurface ?? undefined,
      tempBottom: raw.tempBottom ?? undefined,
      weight: raw.weight ?? undefined,
      weightUnit: raw.weightUnit || undefined,
      exposureProtection: Array.isArray(raw.exposureProtection) ? raw.exposureProtection : [],
      conditions: Array.isArray(raw.conditions) ? raw.conditions : [],
      diveType: raw.diveType || undefined,
      pressureStart: raw.pressureStart ?? undefined,
      pressureEnd: raw.pressureEnd ?? undefined,
      timeIn: raw.timeIn || undefined,
      timeOut: raw.timeOut || undefined,
      gasMixPercent: raw.gasMixPercent || undefined,
      comments: raw.comments || undefined,
      bottomTimeToDate: raw.bottomTimeToDate ?? undefined,
      bottomTimeThisDive: raw.bottomTimeThisDive ?? undefined,
      cumulativeTime: raw.cumulativeTime ?? undefined
    };

    this.diveService.createDive(payload).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/logbook']);
      },
      error: (err) => {
        this.enviando = false;
        this.error = err?.error?.message || 'No se pudo guardar la inmersión. Inténtalo de nuevo.';
      }
    });
  }
}
