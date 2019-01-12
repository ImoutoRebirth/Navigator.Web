import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Tag } from '../api-types/Tag';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchText = new Subject<string>();
  public searchResults: Tag[] = [];
  public selectedTags: Tag[] = [];
  public isPopupHidden: Boolean = false;

  constructor() {
    this.searchText.next("");

    this.searchText
      .pipe(debounceTime(500))
      .subscribe(x => this.search(x));
  }

  ngOnInit() {
  }

  onSearchTextChange(newValue: string) {
    this.searchText.next(newValue);
  }

  search(searchString: string) {
    this.isPopupHidden = false;
    this.searchResults = [];

    if (!searchString)
      return;
      
    this.searchResults.push({ name: searchString + "haha1" });
    this.searchResults.push({ name: searchString + "haha2" });
    this.searchResults.push({ name: searchString + "haha3" });
  }

  resultSelected(searchResult: Tag) {
    this.isPopupHidden = true;
    this.selectedTags.push(searchResult);
  }

  invertTag(searchResult: Tag) {
  }  

  removeTag(searchResult: Tag) {
    let index = this.selectedTags.indexOf(searchResult);
    this.selectedTags.splice(index, 1);
  }
}
