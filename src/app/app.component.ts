import { Component, trigger, state, style, transition, animate, keyframes, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<button (click)="toggleState()" [@removeMe]='btnState'>Przycisk</button>
  <ul>
    <li *ngFor='let item of items' [@myTrigger]='state' (@myTrigger.start)="animStart($event)" (@myTrigger.done)="animDone($event)">
      {{ item }}
    </li>

    {{ animDetails }}
  </ul>
  `,
  styles: [`
    ul { list-style-type:none; margin: 30px 30px 0 0;padding: 0;}
    li {
      padding:15px;
      width:100px;
      background:#fififi;
      margin-bottm:2px;
      font-weight:bold;
    }
  `],
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
        opacity: '1',
        transform: 'scale(1.2)'
      })),
      // transition('small => large', animate('500ms ease-in')),
      // transition('large => small', animate('500ms ease-out')),
      // transition('small => large, large => small', animate('500ms'))
      // transition('small <=> large', animate('500ms'))
      // transition('* => small', animate('500ms'))
      // transition('* => *', animate('500ms'))
      transition('void => *', [
        // style({ opacity: '0', transform: 'translateY(20px)' }),
        // animate('2000ms 0.5s ease-in') // czas, opóźnienie powolny poczatek

        animate(500, keyframes([
          style({ opacity: 0, transform: 'translateY(-30px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(5px) scale(1.2)', offset: .3 }),
          style({ opacity: 1, transform: 'translateY(0px) sclae(1.2)', offset: 1 })
        ]))
      ])
    ]),
    trigger('removeMe', [
      state('out', style({
        trnsform: 'scale(0)',
        opacity: 0
      })),

      transition('* => out', [
        animate('500ms 0s ease-in', keyframes([
          style({opacity: 1, transform: 'translateX(-8px)', offset: 0}),
          style({opacity: 1, transform: 'translateX(0px)', offset: 0.3}),
          style({opacity: 0, transform: 'translateX(50px)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class AppComponent  { 
  state: string = 'fadeIn';
  items = new Array();
  animDetails: string = 'Waiting';
  btnState: string = 'in';

  constructor(private cdRef: ChangeDetectorRef) { }

  toggleState(): void {
    // this.state = (this.state === 'small' ? 'large' : 'small');

    this.items.push('another item');
    this.state = 'fadeIn';
    this.btnState = 'out';
  }

  animStart(event: any): void {
    console.log(event);
  }

  animDone(event: any): void {
    this.animDetails = 'IT took me ' + event.totalTime + 'ms to complete.';
    this.cdRef.detectChanges();
    console.log(event);
  }
}
