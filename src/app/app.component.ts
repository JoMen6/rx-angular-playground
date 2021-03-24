import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>App</h1>
    <ng-container *rxLet="count$; let count">AppCounter: {{ count }}</ng-container>
    <button (click)="btn$.next()">Increment</button>
    <router-outlet></router-outlet>
  `,
  providers: [RxState]
})
export class AppComponent {
  title = 'Rx-State';

  readonly count$ = this.state.select('count');

  btn$ = new Subject();

  constructor(
    private state: RxState<{ count: number }>
  ) {
    this.state.set({ count: 0 });
    this.state.connect(this.btn$, (s, e) => ({ count: s.count + 1 }));
  }
}
