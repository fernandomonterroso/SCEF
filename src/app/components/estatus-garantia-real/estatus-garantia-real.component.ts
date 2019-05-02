import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  estatus: string;
  descripcion: string;
}


export interface PeriodicElement {
  codigo: number;
  estatus: string;
  descripcion: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, estatus: 'cancelado', descripcion: 'estado 1'},
  {codigo: 2, estatus: 'cancelado', descripcion: 'estado 2'},
  {codigo: 3, estatus: 'nulo', descripcion: 'estado 3'},
  {codigo: 4, estatus: 'cancelado', descripcion: 'estado 4'},
  {codigo: 5, estatus: 'cancelado', descripcion: 'estado 5'},
];

@Component({
  selector: 'app-estatus-garantia-real',
  templateUrl: './estatus-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css']
})
export class EstatusGarantiaRealComponent implements OnInit {
  estatus: string;
  descripcion: string;

  constructor(public dialog: MatDialog) {}

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DailogAgregarEstatusGarantiaReal, {
      width: '500px',
      data: {estatus: this.estatus, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.estatus = result;
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarEstatusGarantiaReal, {
      width: '500px',
      data: {estatus: this.estatus, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.estatus = result;
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarEstatusGarantiaReal, {
      width: '500px',
      data: {estatus: this.estatus, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.estatus = result;
    });
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo', 'estatus', 'descripcion'];
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
  templateUrl: './agregar-estado-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css']
})
export class DailogAgregarEstatusGarantiaReal {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarEstatusGarantiaReal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-estado-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css']
})
export class DailogEditarEstatusGarantiaReal {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarEstatusGarantiaReal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-estado-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css']
})
export class DailogEliminarEstatusGarantiaReal {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarEstatusGarantiaReal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}