import { Component, OnInit, Input } from '@angular/core';
import { query } from '@angular/core/src/render3/query';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vis-table',
  templateUrl: './vis-table.component.html',
  styleUrls: ['./vis-table.component.css']
})
export class VisTableComponent implements OnInit {

  data: any[] = null;
  @Input() query: string;
  fields: any[];

  constructor(private api: ApiService) { }

  str(x) {
    return '' + x;
  }

  strw(x) {
    return `<span class='strw'>${x}</span>`;
  }

  fig(x: number) {
    if (!x) {
      return '';
    }
    const digs = x > 1000 ? 0 : 2;
    const xstr = x.toLocaleString([], {minimumFractionDigits: digs,
                                       maximumFractionDigits: digs});
    return `<span class='fig'>${xstr}</span>`;
  }

  ngOnInit() {
    this.api.doQuery(this.query)
        .subscribe((rows) => {
          this.data = rows;
        });
    const aliases = RegExp('[Aa][Ss]\\s+"(([^":]+):([^"]+))"', 'g');
    this.fields = [];
    let match: any;
    while ((match = aliases.exec(this.query)) != null) {
      const field = match[1];
      const title = match[2];
      const formatter = this[match[3]];
      this.fields.push({field, title, formatter});
    }
    console.log(this.fields);
  }

}
