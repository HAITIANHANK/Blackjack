import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from '../shared/components/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayGameComponent } from './components/play-game-page/play-game.component';


@NgModule({
  declarations: [
    PlayGameComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
