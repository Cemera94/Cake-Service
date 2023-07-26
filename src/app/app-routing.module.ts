import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CakesComponent } from './cakes/cakes.component';
import { ContactComponent } from './core/contact/contact.component';
import { ProfileComponent } from './core/profile/profile.component';
import { CakeDetailComponent } from './cakes/cake-detail/cake-detail.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "cakes", component: CakesComponent},
  {path: "contact", component: ContactComponent},
  {path: "profile", component: ProfileComponent},
  {path: "cakes/:cakeId", component: CakeDetailComponent},
  {path: "", redirectTo: "/home", pathMatch: "prefix"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
