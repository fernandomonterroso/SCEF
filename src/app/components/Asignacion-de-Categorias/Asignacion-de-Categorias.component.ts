import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  
];

@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './Asignacion-de-Categorias.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class AsignacionCategoriasComponent implements OnInit {


  animal: string;
  names: string;
  mostrar: Boolean;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  

  timeLeft: number;
  interval;

  constructor(public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
startTimer() {
  this.timeLeft = 2;
    this.interval = setInterval(() => {
      if(this.timeLeft >0 && this.timeLeft < 10){
        this.mostrar = true;
        this.timeLeft--;
      }
      else if( this.timeLeft > 0) {
        this.timeLeft--;
        
      } else if (this.timeLeft == 0) {
        this.mostrar = false;
        this.openDialog();
        
        this.timeLeft = 10000;
      }
    },1000)
  }

  startTimerV() {
    this.timeLeft = 2;
      this.interval = setInterval(() => {
        if(this.timeLeft >0 && this.timeLeft < 10){
          this.mostrar = true;
          this.timeLeft--;
        }
        else if( this.timeLeft > 0) {
          this.timeLeft--;
          
        } else if (this.timeLeft == 0) {
          this.mostrar = false;
          this.openDialogV();
          this.timeLeft = 10000;
        }
      },1000)
    }

    startTimerT() {
      this.timeLeft = 2;
        this.interval = setInterval(() => {
          if(this.timeLeft >0 && this.timeLeft < 10){
            this.mostrar = true;
            this.timeLeft--;
          }
          else if( this.timeLeft > 0) {
            this.timeLeft--;
            
          } else if (this.timeLeft == 0) {
            this.mostrar = false;
            this.openDialogT();
            this.timeLeft = 10000;
          }
        },1000)
      }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAsignacionCategorias, {
      width: '700px',
      height: '800px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogV(): void {
    const dialogRef = this.dialog.open(DialogAsignacionCategoriasV, {
      width: '700px',
      height: '800px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogT(): void {
    const dialogRef = this.dialog.open(DialogAsignacionCategoriasT, {
      width: '700px',
      height: '800px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}


export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './DialogAsignacionCategorias.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogAsignacionCategorias {

  constructor(
    public dialogRef: MatDialogRef<DialogAsignacionCategorias>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './DialogAsignacionCategoriasV.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogAsignacionCategoriasV{

  constructor(
    public dialogRef: MatDialogRef<DialogAsignacionCategoriasV>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './DialogAsignacionCategoriasT.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogAsignacionCategoriasT{

  constructor(
    public dialogRef: MatDialogRef<DialogAsignacionCategoriasT>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}