import { Component, OnInit } from '@angular/core';

import { config } from './configurations/budget-transfers';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.config = config.kinds[0];
  }
}
