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

  constructor() {
  }

  ngOnInit(): void {
    console.log('pages', this.totalPageCount);
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
  }

  getPagesToDisplay(): number[] {
    // if number of pages to show is less than the collection size
    if (this.totalPageCount < this.visiblePageCount)
    {
      return Array(this.totalPageCount).fill(0).map((_, i) => i + 1);
    }
    const start = this.currentPage <= this.visiblePageCount
      ? 0
      : Math.min(
        this.currentPage - this.visiblePageCount,
        this.totalPageCount - 2 * this.visiblePageCount
      ) - 1;
    return Array(2 * this.visiblePageCount + 1).fill(0).map((_, i) => i + start + 1);
  }
}
