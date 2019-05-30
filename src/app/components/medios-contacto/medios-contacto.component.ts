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
  selector: 'app-medios-contacto',
  templateUrl: './medios-contacto.component.html',
  styleUrls: ['./medios-contacto.component.css']
})
export class MediosContactoComponent implements OnInit {


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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContacto, {
      width: '400px',
      height:'700px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogEliminarContacto, {
      width: '400px',
      height:'700px',      
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
  selector: 'Dialog-Contacto',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./medios-contacto.component.css']
})
export class DialogContacto {
  

  constructor(
    public dialogRef: MatDialogRef<DialogContacto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'Dialog-Contacto',
  templateUrl: 'Dialog-eliminar-medios-coontacto.component.html',
  styleUrls: ['./medios-contacto.component.css']
})
export class DialogEliminarContacto {
  

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarContacto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}