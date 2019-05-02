import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  codigo: number;
  valorMinimo: number;
  valorMaximo: number;
  plazo: string;
  tasa: number;
}


export interface PeriodicElement {
  codigo: number;
  valorMinimo: number;
  valorMaximo: number;
  plazo: string;
  tasa: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 2, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 3, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 4, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 5, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
];

@Component({
  selector: 'app-montos-plazo',
  templateUrl: './montos-plazo.component.html',
  styleUrls: ['./montos-plazo.component.css']
})

export class MontosPlazoComponent implements OnInit {
  codigo: number;
  valorMinimo: number;
  valorMaximo: number;
  plazo: string;
  tasa: number;
  showSpinner = false;

  constructor(public dialog: MatDialog) {}

  cargar(){
    this.showSpinner = true;
    setTimeout(()=>{
      this.showSpinner = false;
    },2000)
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DailogAgregarMontosPlazo, {
      width: '500px',
      data: {codigo: this.codigo, valorMinimo: this.valorMinimo, valorMaximo: this.valorMaximo, plazo: this.plazo, tasa: this.tasa}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarMontosPlazo, {
      width: '400px',
      data: {codigo: this.codigo, valorMinimo: this.valorMinimo, valorMaximo: this.valorMaximo, plazo: this.plazo, tasa: this.tasa}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarMontosPlazo, {
      width: '500px',
      data: {codigo: this.codigo, valorMinimo: this.valorMinimo, valorMaximo: this.valorMaximo, plazo: this.plazo, tasa: this.tasa}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
    });
  }

  ngOnInit() {
  }
  displayedColumns: string[] = ['select', 'codigo','valorMaximo', 'valorMinimo', 'plazo', 'tasa'];
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
  templateUrl: './agregar-montos-plazo.component.html',
  styleUrls: ['./montos-plazo.component.css']
})

export class DailogAgregarMontosPlazo {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarMontosPlazo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-montos-plazo.component.html',
  styleUrls: ['./montos-plazo.component.css']
})

export class DailogEditarMontosPlazo {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarMontosPlazo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-montos-plazo.component.html',
  styleUrls: ['./montos-plazo.component.css']
})

export class DailogEliminarMontosPlazo {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarMontosPlazo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}
