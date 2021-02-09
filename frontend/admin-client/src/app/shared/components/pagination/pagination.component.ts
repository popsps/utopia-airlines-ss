import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPageCount: number;
  @Input() visiblePageCount: number;
  @Input() boundaryLinks: boolean;
  @Output() pageChange = new EventEmitter<number>(true);

  pages: number[];
  activePages: number[];

  constructor() {
  }

  ngOnInit(): void {
    this.pages = Array(this.totalPageCount).fill(0).map((v, i) => i + 1);
    this.buildActivePages();
    console.log('pages', this.totalPageCount);
    this.pageChange.subscribe(p => this.buildActivePages());
  }

  goNextPage(): void {
    this.pageChange.emit(this.currentPage + 1);
  }

  goPrevPage(): void {
    this.pageChange.emit(this.currentPage - 1);
  }

  goFirstPage(): void {
    this.pageChange.emit(1);
  }

  goLastPage(): void {
    this.pageChange.emit(this.totalPageCount);
  }

  goToPage(n: number): void {
    this.pageChange.emit(n);
    console.log(n);
  }

  private buildActivePages(): void {
    // if number of pages to show is less than the collection size
    if (this.visiblePageCount > this.totalPageCount)
    {
      this.activePages = this.pages;
      return;
    }
    this.activePages = [];
    let size = this.visiblePageCount;
    const currentPage = this.currentPage;
    this.activePages.push(currentPage);
    size--;
    let prev = (currentPage > 1) ? currentPage - 1 : null;
    let next = (currentPage < this.totalPageCount) ? currentPage + 1 : null;
    while (size !== 0)
    {
      if (prev)
      {
        this.activePages.push(prev);
        prev = (prev > 1) ? prev - 1 : null;
        size--;
      }
      if (next)
      {
        this.activePages.push(next);
        next = (next < this.totalPageCount) ? next + 1 : null;
        size--;
      }
    }
    this.activePages.sort((a, b) => a - b);
  }
}
