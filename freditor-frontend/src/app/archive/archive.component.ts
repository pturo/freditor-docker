import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArchiveService } from '../services/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  getTaskArch: any[] = [];
  getNoteArch: any[] = [];
  archiveSub = new Subscription();

  constructor(private archiveService: ArchiveService) { }

  ngOnInit(): void {
    this.getTaskArchives();
    this.getNoteArchives();
  }

  getTaskArchives() {
    this.archiveSub = this.archiveService.getTaskArchives().subscribe((res: any) => {
      this.getTaskArch = res.getTaskArchives;
    });
  }

  getNoteArchives() {
    this.archiveSub = this.archiveService.getNoteArchives().subscribe((res: any) => {
      this.getNoteArch = res.getNoteArchives;
    });
  }

  ngOnDestroy() {
    this.archiveSub.unsubscribe();
  }
}
