import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderTitleService } from '../services/header-title.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuditTrailComponent } from '../audit-trail/audit-trail.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  initialTitle = 'Angular Template';
  @ViewChild(MatDrawer)
  sidenav!: MatDrawer;

  

  drawerMode: any = 'side';
  backDrop:any;
  centered: boolean = true;
  navLists: any[] = [
    // { title: 'Input Feild Types', link: 'input-types' },
    // { title: 'File Upload/Dialog/Forms', link: 'fileUpload-dialog-forms' },
    { title: 'Table', link: 'table' },
    { title: 'Tourist-Register', link: 'Tourist-Register' },
    { title: 'Tourist-Select', link: 'Tourist-Select' },
    {
  
    title: 'Camp-Booking',
      link: 'Camp-Booking',
    },
    { title: 'User-Details', link: 'User-Details' },
    { title: 'TreeView', link: 'TreeView' },
    { title: 'TreeView1', link: 'TreeView1' },
    { title: 'ClassAssign', link: 'ClassAssign' },
    { title: 'Tree_view', link: 'Tree_view' },
    { title: 'Tree_view2', link: 'Tree_view2' },
    { title: 'Task4', link: 'Task4' },
    // { title: 'FAQ-FrontEnd', link: 'faq-frontend' },
    // { title: 'FAQ-BackEnd', link: 'faq-backend' },
  ];
  title: any;
  router: any;
  navbar: any;
  
  constructor(
    private _headerTitle: HeaderTitleService,
    private _observer: BreakpointObserver,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.title="Angular Template";
    this._headerTitle.setTitle('Template');
    this.getTitle(this.title);
  }

  getTitle(header: any) {
    this.title = header;
  }
  ngAfterViewInit() {
    this.sideNav();
  }
  sideNav() {
    this._observer.observe(['(max-width: 768px)']).subscribe((res: any) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.backDrop=true;
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.backDrop=false;
        this.sidenav.open();
      }
    });
  }
  sideNavListClose(){
    if(this.sidenav.mode==='over'){
      this.sidenav.close()
    }  
    else{
      this.sidenav.open()

    }
  }

  open(){
const dialogconfig = new MatDialogConfig(); 
dialogconfig.width ='500px';
     this._dialog.open(AuditTrailComponent)
  }
  
  
  
}
