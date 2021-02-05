import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() collectionSize: number;
  @Input() maxSize: number;
  @Input() boundaryLinks: boolean;
  @Input() page: number;
  @Output() pageChange = new EventEmitter<number>(true);

  pages: number[];
  activePages: number[];

  constructor() {
  }

  ngOnInit(): void {
    this.pages = Array(this.collectionSize).fill(0).map((v, i) => i + 1);
    this.buildActivePages();
    // this.activePages = this.pages.slice(0, this.maxSize);
    console.log('pages', this.collectionSize, this.pages);
  }

  goNextPage(): void {
    this.pageChange.emit(this.page + 1);
    this.pageChange.subscribe(p => this.buildActivePages());
  }

  goPrevPage(): void {
    this.pageChange.emit(this.page - 1);
    this.pageChange.subscribe(p => this.buildActivePages());
  }

  goFirstPage(): void {
    this.pageChange.emit(1);
    this.pageChange.subscribe(p => this.buildActivePages());
  }

  goLastPage(): void {
    this.pageChange.emit(this.collectionSize);
    this.pageChange.subscribe(p => this.buildActivePages());
  }

  goToPage(n: number): void {
    console.log('go to page', n);
    this.pageChange.emit(n);
    this.pageChange.subscribe(p => this.buildActivePages());
  }

  private buildActivePages(): void {
    // if current page is first
    // if current page is last
    // if current page is in the middle
    // if number of pages to show is less than the collection size
    if (this.maxSize > this.collectionSize) {
      this.activePages = this.pages;
      return;
    }
    this.activePages = [];
    let size = this.maxSize;
    const currentPage = this.page;
    this.activePages.push(currentPage);
    size--;
    let prev = (currentPage > 1) ? currentPage - 1 : null;
    let next = (currentPage < this.collectionSize) ? currentPage + 1 : null;
    while (size !== 0) {
      if (prev) {
        this.activePages.push(prev);
        prev = (prev > 1) ? prev - 1 : null;
        size--;
      }
      if (next) {
        this.activePages.push(next);
        next = (next < this.collectionSize) ? next + 1 : null;
        size--;
      }
    }
    this.activePages.sort((a, b) => a - b);
    console.log('active pages', this.activePages);
  }
}
