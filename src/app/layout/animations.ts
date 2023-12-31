import { trigger, animate, transition, style, query, group } from '@angular/animations';

// export const slideInAnimation =
//   trigger('slideInAnimation', [
//     transition('* <=> *', [
//       query(':enter, :leave', 
//         style({ position: 'fixed', width: '100%' }), 
//         { optional: true }
//       ),
//       group([
//         query(':enter', [
//           style({ transform: 'translateX(100%)', opacity: 0 }),
//           animate('0.5s ease-in-out', 
//             style({ transform: 'translateX(0%)', opacity: 1 }))
//         ], { optional: true }),
//         query(':leave', [
//           style({ transform: 'translateX(0%)', opacity: 1 }),
//           animate('0.5s ease-in-out', 
//             style({ transform: 'translateX(-100%)', opacity: 0 }))
//         ], { optional: true }),
//       ])
//     ])
//   ]);

export const slideInAnimation = trigger('slideInAnimation', [
    transition(':enter', [
      style({ transform: 'translateX(100%)' }), // Start off-screen to the right
      animate('0.5s ease-in', style({ transform: 'translateX(0)' })) // Animate to the left
    ]),
  ]);

  /*
trigger creates an animation trigger with a given name ('slideIn' in this case).
transition(':enter', [...]) defines the animation to occur when an element with this trigger is added to the DOM (:enter).
style({ transform: 'translateX(100%)' }) is the initial style, which places the element off-screen to the right.
animate('0.5s ease-in', style({ transform: 'translateX(0)' })) defines the animation to slide the element from right to left over 0.5 seconds.
  */
