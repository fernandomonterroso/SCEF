import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface PeriodicElement {
  descripcion: string;
  codigo: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'Hydrogen'},
  {codigo: 2, descripcion: 'Helium'},
  {codigo: 3, descripcion: 'Lithium'},
  {codigo: 4, descripcion: 'Beryllium'},
  {codigo: 5, descripcion: 'Boron'},
];


@Component({
  selector: 'app-motivos-ajustes',
  templateUrl: './motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css']
})
export class MotivosAjustesComponent implements OnInit {
  timeLeft: number;
  interval;
  mostrar: Boolean;
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
    

  animal: string;
  names: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAgregarMotivoAjuste, {
      width: '500px', 
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(DialogActualizarMotivoAjuste, {
      width: '500px', 
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogEliminarMotivoAjuste, {
      width: '500px', 
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}
//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 

export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css']
})
export class DialogAgregarMotivoAjuste {

  constructor(
    public dialogRef: MatDialogRef<DialogAgregarMotivoAjuste>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css']
})
export class DialogActualizarMotivoAjuste {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarMotivoAjuste>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css']
})
export class DialogEliminarMotivoAjuste {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarMotivoAjuste>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
