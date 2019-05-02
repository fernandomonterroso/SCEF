import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  codigo: number;
  descripcion: string;
}

export interface PeriodicElement {
  codigo: number;
  descripcion: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'estado 1'},
  {codigo: 2, descripcion: 'estado 2'},
  {codigo: 3, descripcion: 'estado 3'},
  {codigo: 4, descripcion: 'estado 4'},
  {codigo: 5, descripcion: 'estado 5'},
];
@Component({
  selector: 'app-estatus-avaluos',
  templateUrl: './estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css']
})
export class EstatusAvaluosComponent implements OnInit {

  codigo: number;
  descripcion: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DailogAgregarEstatusAvaluos, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarEstatusAvaluos, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarEstatusAvaluos, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo','descripcion'];
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css']
})
export class DailogAgregarEstatusAvaluos {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarEstatusAvaluos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css']
})
export class DailogEditarEstatusAvaluos {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarEstatusAvaluos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css']
})
export class DailogEliminarEstatusAvaluos {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarEstatusAvaluos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}