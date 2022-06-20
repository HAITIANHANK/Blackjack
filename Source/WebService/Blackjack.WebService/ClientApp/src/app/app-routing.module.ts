import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PlayGameComponent } from './components/play-game-page/play-game-page.component';

const routes: Route[] = [
  { path: 'play', component: PlayGameComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
