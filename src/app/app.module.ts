import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { VisualisationsComponent } from './visualisations/visualisations.component';
import { VisNavComponent } from './vis-nav/vis-nav.component';
import { VisSelectorComponent } from './vis-selector/vis-selector.component';
import { VisTableComponent } from './vis-table/vis-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBarComponent,
    SearchResultsComponent,
    VisualisationsComponent,
    VisNavComponent,
    VisSelectorComponent,
    VisTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
