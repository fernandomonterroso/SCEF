
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit ,OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  ngOnInit() {
  }
  private _mobileQueryListener: () => void;

  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
