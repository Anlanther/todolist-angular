import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Use this gaurd to make sure the id passed in the parametre is valid
@Injectable({
  providedIn: 'root'
})
export class TaskDetailGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = Number(route.paramMap.get('id'));

    if (isNaN(id) || id < 1) {
      console.log('Invalid task id was provided');
      this.router.navigate(['/tasks']);
      return false; // Has the guard say no to navigating to page
    }
    return true;
  }
  
}
