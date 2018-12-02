import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vis-table',
  templateUrl: './vis-table.component.html',
  styleUrls: ['./vis-table.component.css']
})
export class VisTableComponent implements OnInit {

  data: any[] = null;
  @Input() query: string;
  @Output() loading = new EventEmitter<boolean>();
  fields: any[];
  request: Subscription;

  constructor(private api: ApiService) { }

  str(x) {
    return '' + x;
  }

  strw(x) {
    return `<span class='strw'>${x}</span>`;
  }

  fig(x: number) {
    if (!x) {
      return '&mdash;';
    }
    const digs = Math.abs(x) > 1000 ? 0 : 2;
    const xstr = x.toLocaleString([], {minimumFractionDigits: digs,
                                       maximumFractionDigits: digs});
    return `<span class='fig'>${xstr}</span>`;
  }

  ngOnInit() {
    const aliases = RegExp('[Aa][Ss]\\s+"(([^":]+):([^"]+))"', 'g');
    this.fields = [];
    let match: any;
    while ((match = aliases.exec(this.query)) != null) {
      const field = match[1];
      const title = match[2];
      const formatter = this[match[3]];
      this.fields.push({field, title, formatter});
    }
    this.api.selectedItem.subscribe((item) => {
      if (this.request) {
        this.request.unsubscribe();
      }
      this.loading.emit(true);
      this.data = null;
      this.request = this.api.doQuery(this.query)
          .subscribe((rows) => {
            this.loading.emit(false);
            this.data = rows;
          });
    });
  }

}
