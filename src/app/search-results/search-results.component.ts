import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as Mustache from 'mustache';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  template: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.template = this.api.config.result_template;
  }

  render(item) {
    return Mustache.render(this.template, item);
  }

  set selected(item) {
    if (item) {
      this.api.selectItem(item.doc_id);
    } else {
      this.api.selectItem(null);
    }
  }

  get selected() {
    return this.api.selectedItem.getValue();
  }

}
