import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  template: `
  <h1>List</h1>
  <ng-container *rxLet="count$; let count;">DetailCounter: {{ count }}</ng-container>
  <button (click)="btn$.next()">Increment</button>`,
  providers: [RxState]
})
export class ListComponent {
  readonly count$ = this.state.select('count');

  btn$ = new Subject();

  constructor(
    private state: RxState<{ count: number }>
  ) {
    this.state.set({ count: 42 });
    this.state.connect(this.btn$, (s,e) => ({ count: s.count + 1 }));
  }
}
