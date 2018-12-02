import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vis-selector',
  templateUrl: './vis-selector.component.html',
  styleUrls: ['./vis-selector.component.css']
})
export class VisSelectorComponent implements OnInit {

  @Input() vis: any;
  @Input() visible: boolean;
  @Output() loading = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  reportLoading(loading) {
    this.loading.emit(loading);
  }

}
