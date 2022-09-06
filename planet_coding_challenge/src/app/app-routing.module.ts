import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCrewsComponent } from './components/all-crews/all-crews.component';
import { AllPlanetsComponent } from './components/all-planets/all-planets.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'all-planets', component: AllPlanetsComponent},
  {path: 'all-crews', component: AllCrewsComponent},
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
