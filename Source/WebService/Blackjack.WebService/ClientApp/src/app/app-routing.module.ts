import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlayGameComponent } from './components/play-game/play-game.component';

const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'play', component: PlayGameComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
