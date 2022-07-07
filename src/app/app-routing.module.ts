import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { LoginComponent } from './components/login/login.component';
import { DisplayComponent } from './components/display/display.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DisplayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddGameComponent },
  { path: ':id', component: GameDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
