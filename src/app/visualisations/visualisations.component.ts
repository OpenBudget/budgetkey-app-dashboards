import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-visualisations',
  templateUrl: './visualisations.component.html',
  styleUrls: ['./visualisations.component.css']
})
export class VisualisationsComponent implements OnInit {

  selectedVis: string;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.selectedVis = this.api.config.visualisations[0].title;
  }

}
