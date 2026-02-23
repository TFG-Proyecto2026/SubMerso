import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'hace unos segundos';
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} minutos`;
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} horas`;
    if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)} días`;
    
    return date.toLocaleDateString('es-ES');
  }
}
