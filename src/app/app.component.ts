import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<button (click)="toggleState()">Przycisk</button>
  <ul>
    <li *ngFor='let item of items' [@myTrigger]='state'>{{ item }}</li>
  </ul>
  `,
  styles: [],
  animations: [
    trigger('myTrigger', [
      state('small', style({
        transform: 'scale(1)'
      })),
      state('large', style({
        transform: 'scale(1.4)'
      })),
      state('extra-large', style({
        transform: 'scale(2)'
      })),
      state('fadeIn', style({
        opacity: '1'
      })),
      // transition('small => large', animate('500ms ease-in')),
      // transition('large => small', animate('500ms ease-out')),
      // transition('small => large, large => small', animate('500ms'))
      // transition('small <=> large', animate('500ms'))
      // transition('* => small', animate('500ms'))
      // transition('* => *', animate('500ms'))
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateY(20px)'
        }),
        animate('500ms')
      ])
    ])
  ]
})
export class AppComponent  { 
  state: string = 'fadeIn';
  items: string[] = [];

  toggleState(): void {
    // this.state = (this.state === 'small' ? 'large' : 'small');

    this.items.push('another item');
    this.state = 'fadeIn';
  }
}
