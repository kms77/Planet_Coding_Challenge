import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCrewsComponent } from './all-crews/all-crews.component';
import { AllPlanetsComponent } from './all-planets/all-planets.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlanetEditComponent } from './planet-edit/planet-edit.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'all-planets', component: AllPlanetsComponent},
  {path: 'all-crews', component: AllCrewsComponent},
  // {path: 'edit-planet', component: PlanetEditComponent},
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
