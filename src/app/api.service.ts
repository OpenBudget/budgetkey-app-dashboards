import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public config: any = {};

  searchQueue = new Subject<any>();
  searchResults = new BehaviorSubject<any>([]);
  selectedItem = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.searchQueue
      .pipe(
        distinctUntilChanged((x, y) => x.term === y.term),
        debounceTime(300),
        switchMap((params) => this.doSearch(params))
      ).subscribe((results: any) => {
        this.searchResults.next(results);
      });
  }

  search(term: string) {
    const doctype = this.config.doctype;
    const filters = this.config.filters;
    console.log('term', term);
    if (term) {
      this.searchQueue.next({term, doctype, filters});
      if (window['gtag']) {
        window['gtag']('event', 'dashboard-search', {
          'event_category': 'dashboard',
          'event_label': term,
          'value': 1
        });
      }
    }
  }

  selectItem(doc_id: string) {
    if (doc_id) {
      const url = `https://next.obudget.org/get/${doc_id}`;
      this.http
        .get(url)
        .subscribe((result: any) => {
          this.selectedItem.next(result.value);
        });
    } else {
      this.selectedItem.next(doc_id);
    }
  }


  doSearch(params) {
    const URL = 'https://next.obudget.org/search';
    let url = `${URL}/${params.doctype}?q=${encodeURIComponent(params.term)}`;
    const filters = JSON.stringify(params.filters).slice(1, -1);
    url += '&filter=' + encodeURIComponent(filters);
    return this.http
      .get(url)
      .pipe(
        map((r: any) => {
          const results: Array<any> = r.search_results;
          if (results.length === 1) {
            this.selectItem(results[0].source.doc_id);
          } else {
            this.selectItem(null);
          }
          return results.map((x) => x.source);
        })
      );
  }

  formatQuery(query: string, parameters: object): string {
    return query.replace(/:([a-z][a-z0-9_.]*)/ig, (match, name) => {
      return _.get(parameters, name) ? _.get(parameters, name) : match;
    });
  }

  doQuery(query) {
    query = this.formatQuery(query, this.selectedItem.getValue());
    const url = `https://next.obudget.org/api/query?query=${encodeURIComponent(query)}`;
    return this.http
      .get(url)
      .pipe(
        map((r: any) => r.rows)
      );
  }
}
