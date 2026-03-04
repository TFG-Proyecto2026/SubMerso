import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiveService, Dive } from '../../../core/services/dive.service';

@Component({
  selector: 'app-dive-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dive-edit.component.html',
  styleUrl: './dive-edit.component.css'
})
export class DiveEditComponent implements OnInit {
  form: FormGroup;
  diveId: string | null = null;
  cargando = true;
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
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.diveId = this.route.snapshot.paramMap.get('id');
    if (!this.diveId) {
      this.router.navigate(['/logbook']);
      return;
    }
    this.diveService.getDive(this.diveId).subscribe({
      next: (dive) => {
        this.cargando = false;
        if (dive) this.rellenarFormulario(dive);
        else this.router.navigate(['/logbook']);
      },
      error: () => {
        this.cargando = false;
        this.router.navigate(['/logbook']);
      }
    });
  }

  private rellenarFormulario(d: Dive): void {
    const timeIn = d.timeIn ? (d.timeIn.length >= 5 ? d.timeIn.substring(0, 5) : d.timeIn) : null;
    const timeOut = d.timeOut ? (d.timeOut.length >= 5 ? d.timeOut.substring(0, 5) : d.timeOut) : null;
    this.form.patchValue({
      diveNumber: d.diveNumber ?? null,
      diveDate: d.diveDate ?? null,
      location: d.location ?? '',
      depthMax: d.depthMax ?? null,
      durationMinutes: d.durationMinutes ?? null,
      rnt: d.rnt ?? null,
      abt: d.abt ?? null,
      tbt: d.tbt ?? null,
      visibility: d.visibility ?? null,
      visibilityUnit: d.visibilityUnit || 'm',
      tempAir: d.tempAir ?? null,
      tempSurface: d.tempSurface ?? null,
      tempBottom: d.tempBottom ?? null,
      weight: d.weight ?? null,
      weightUnit: d.weightUnit || 'kg',
      exposureProtection: d.exposureProtection || [],
      conditions: d.conditions || [],
      diveType: d.diveType || 'COMPUTER',
      pressureStart: d.pressureStart ?? null,
      pressureEnd: d.pressureEnd ?? null,
      timeIn,
      timeOut,
      gasMixPercent: d.gasMixPercent ?? null,
      comments: d.comments ?? '',
      bottomTimeToDate: d.bottomTimeToDate ?? null,
      bottomTimeThisDive: d.bottomTimeThisDive ?? null,
      cumulativeTime: d.cumulativeTime ?? null
    });
  }

  toggleProteccion(value: string): void {
    const arr = (this.form.get('exposureProtection')?.value as string[]) || [];
    const idx = arr.indexOf(value);
    if (idx === -1) this.form.patchValue({ exposureProtection: [...arr, value] });
    else this.form.patchValue({ exposureProtection: arr.filter((_, i) => i !== idx) });
  }

  tieneProteccion(value: string): boolean {
    return ((this.form.get('exposureProtection')?.value as string[]) || []).includes(value);
  }

  toggleCondicion(value: string): void {
    const arr = (this.form.get('conditions')?.value as string[]) || [];
    const idx = arr.indexOf(value);
    if (idx === -1) this.form.patchValue({ conditions: [...arr, value] });
    else this.form.patchValue({ conditions: arr.filter((_, i) => i !== idx) });
  }

  tieneCondicion(value: string): boolean {
    return ((this.form.get('conditions')?.value as string[]) || []).includes(value);
  }

  enviar(): void {
    if (!this.diveId || this.form.invalid) {
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

    this.diveService.updateDive(this.diveId, payload).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/logbook']);
      },
      error: (err) => {
        this.enviando = false;
        this.error = err?.error?.message || 'No se pudo actualizar la inmersión. Inténtalo de nuevo.';
      }
    });
  }
}
