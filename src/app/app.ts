import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router, NavigationEnd } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
    const last_route = localStorage.getItem(LOCALSTORAGE_LAST_VISIT_ROUTE_KEY)

    if(last_route && last_route !== '/'){
      this.router.navigateByUrl(last_route)
    }

    //Guardar en localStorage el ultimo modulo o seccion visitada

    this.router.events.pipe(
      filter(
        (event): event is NavigationEnd =>  event instanceof NavigationEnd
      )
    )
    .subscribe(
      (event: NavigationEnd) => {
        localStorage.setItem(LOCALSTORAGE_LAST_VISIT_ROUTE_KEY, event.urlAfterRedirects)
      }
    )
  }
}

const LOCALSTORAGE_LAST_VISIT_ROUTE_KEY = 'lastVisitedRoute'