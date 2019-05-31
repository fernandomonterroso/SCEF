import { Component, OnInit, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Almacenadora } from 'src/app/models/almacenadora.model';
import { AlmacenadoraService } from 'src/app/services/almacenadora.service';

@Component({
  selector: 'app-almacenadora',
  templateUrl: './almacenadora.component.html',
  styleUrls: ['./almacenadora.component.css'],
  providers: [AlmacenadoraService]
})
export class AlmacenadoraComponent implements OnInit {
  public almacenadoras: Almacenadora[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 7;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public almacenadoraModel: Almacenadora;
  public almacenadoraEditable: Almacenadora;

  public dataSource2;

  constructor(public dialog: MatDialog, private _almacenadoraService: AlmacenadoraService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAlma, {
      width: '500px',
      data: { codigo: this.almacenadoraModel.codigo, descripcion: this.almacenadoraModel.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.almacenadoraModel.codigo = result.codigo;
        this.almacenadoraModel.descripcion = result.descripcion;
        console.log(result);
        console.table(this.almacenadoraModel);
        this.agregar();
      }
    });
  }


  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarAlma, {
      width: '500px',
      data: { codigo: this.almacenadoraEditable.codigo, descripcion: this.almacenadoraEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.almacenadoraEditable.codigo = result.codigo;
        this.almacenadoraEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.almacenadoraEditable);
        this._almacenadoraService.actualizarAlmacenadora(this.almacenadoraEditable).subscribe(
          response => {
            console.log(response);
            this.listarAlmacenadorasParaTabla();
            if (response.code == 0) {
              this.status = 'ok';
            } else {
              alert(response.description);
            }
          }, error => {
            let errorMessage = <any>error;
            console.log(errorMessage);
            if (errorMessage != null) {
              alert(error.description);
              this.status = 'error';
            }
          }
        );
      }
    });
  }

  // openDialogDelete(): void {
  //   const dialogRef = this.dialog.open(DialogEliminarAlma, {
  //     width: '500px',
  //     data: {names: this.names, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  ngOnInit() {
    this.listarAlmacenadorasParaTabla();
  }

  limpiarVariables() {
    this.almacenadoraEditable = new Almacenadora(0, 0, '', '', '1', true);
    this.almacenadoraModel = new Almacenadora(0, 0, '', '', '1', true);
  }

  listarAlmacenadorasParaTabla() {
    this._almacenadoraService.listarPagina(this.numeroPagina, this.numeroItems).subscribe(
      response => {
        if (response.content) {
          this.almacenadoras = response.content;
          this.dataSource2 = new MatTableDataSource<Almacenadora>(this.almacenadoras);
          console.log(this.almacenadoras);
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.cantidadActual = response.numberOfElements;
          this.status = 'ok';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  setAlmacenadora(id) {
    this._almacenadoraService.listarAlmacenadora(id).subscribe(
      response => {
        if (response.content) {
          console.table(response)
          console.table(response.content)
          console.log(response)
          this.listarAlmacenadorasParaTabla();
          this.limpiarVariables();
          this.status = 'ok';
        } else {
          this.status = 'error';
          alert('error');
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  agregar() {
    this._almacenadoraService.crearAlmacenadora(this.almacenadoraModel).subscribe(
      response => {
        console.log(response)
        this.listarAlmacenadorasParaTabla();
        if (response.code == 0) {
          this.status = 'ok';
        } else {
          alert(response.description);
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          alert(error.description);
          this.status = 'error';
        }
      }
    );
  }

  editar() {
    
  }
  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<Almacenadora>(this.almacenadoras);
  selection = new SelectionModel<Almacenadora>(true, []);

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
  checkboxLabel(row?: Almacenadora): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}

//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agragar-almacenadoras.component.html',
  styleUrls: ['./almacenadora.component.css'],
  providers: [AlmacenadoraService]
})
export class DialogAlma {
  public almacenadoras: Almacenadora[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public almacenadoraModel: Almacenadora;
  public almacenadoraEditable: Almacenadora;
  constructor(
    public dialogRef: MatDialogRef<DialogAlma>,
    @Inject(MAT_DIALOG_DATA) public data: Almacenadora,
    private _almacenadoraService: AlmacenadoraService) {
    this.almacenadoraModel = new Almacenadora(0, 0, '', '', '1', true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  agregarAlmacenadora() {

  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-almacenadora.component.html',
  styleUrls: ['./almacenadora.component.css']
})
export class DialogActualizarAlma {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarAlma>,
    @Inject(MAT_DIALOG_DATA) public data: Almacenadora) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-almacenadora.component.html',
  styleUrls: ['./almacenadora.component.css']
})
export class DialogEliminarAlma {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarAlma>,
    @Inject(MAT_DIALOG_DATA) public data: Almacenadora) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}