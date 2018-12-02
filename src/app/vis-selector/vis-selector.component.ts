import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vis-selector',
  templateUrl: './vis-selector.component.html',
  styleUrls: ['./vis-selector.component.css']
})
export class VisSelectorComponent implements OnInit {

  @Input() vis: any;
  @Input() visible: boolean;

  constructor() { }

  ngOnInit() {
  }

}
