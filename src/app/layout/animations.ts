import { animate, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('0.5s ease-in', style({ transform: 'translateX(0)' }))
  ]),
]);