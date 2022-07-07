import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setHeaderMenuLabel } from 'src/app/data/app.actions';

@Component({
  selector: 'rojo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('element') element: ElementRef;
  label: string;
  $body;

  expanded;
  constructor(private router: Router, private store: Store<{ header }>, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.store.select('header').subscribe(label => this.label = label);

    this.renderer.listen('window', 'click', ($event) => {
      $event.stopPropagation();

      if ($event.target.closest('.header__user-wrapper') === null) this.expanded = false;
    })

   const hasToken = localStorage.getItem('token');
   if (hasToken !== null) this.store.dispatch(setHeaderMenuLabel({ label: 'Signout' }));
  }

  navigateTo () {
    if (this.label === 'Signout') {
      localStorage.removeItem('token')
      this.store.dispatch(setHeaderMenuLabel({ label: 'Login' }));
      this.router.navigate(['home']);
    } else this.router.navigate([this.label.toLowerCase()]);
  }

  toggleExpandedButton () {
    this.expanded = !this.expanded;
  }
}
