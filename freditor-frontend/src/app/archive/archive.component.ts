import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  archives: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getArchives();
  }

  getArchives() { }

}
