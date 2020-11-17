import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,
      {
        onSameUrlNavigation: 'reload',
        preloadingStrategy: PreloadAllModules,
        enableTracing: false,
        useHash: true
      }),
    CommonModule
  ]
})
export class AppRoutingModule { }
