import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vis-nav',
  templateUrl: './vis-nav.component.html',
  styleUrls: ['./vis-nav.component.css']
})
export class VisNavComponent implements OnInit {

  @Input() selectVis: string;
  @Input() loadingStatus: any;
  @Output() selectVisChange = new EventEmitter<string>();

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  selectedVis(title) {
    this.selectVisChange.emit(title);
  }

}
