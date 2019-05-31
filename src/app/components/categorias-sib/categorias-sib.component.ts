import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CategoriaSibService } from 'src/app/services/categoria-sib.service';
import { CategoriaSib } from 'src/app/models/categoriaSib.model';

@Component({
  selector: 'app-categorias-sib',
  templateUrl: './categorias-sib.component.html',
  styleUrls: ['./categorias-sib.component.css'],
  providers: [CategoriaSibService]
})
export class CategoriasSIBComponent implements OnInit {
  public categorias: CategoriaSib[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 7;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public categoriaModel: CategoriaSib;
  public categoriaEditable: CategoriaSib;
  public dataSource2;

  constructor(public dialog: MatDialog, private _categoriaService: CategoriaSibService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase(); 
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DailogAgregarCategoriaSIB, {
      width: '500px',
      data: {codigo: this.categoriaModel.codigo, descripcion: this.categoriaModel.descripcion},      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.categoriaModel.codigo = result.codigo;
      this.categoriaModel.descripcion = result.descripcion;
      console.log(result);
      console.table(this.categoriaModel);
      this.agregar();
      this.limpiarVariables()
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarCategoriaSIB, {
      width: '500px',
      data: {codigo: this.categoriaModel.codigo, descripcion: this.categoriaModel.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.categoriaModel.descripcion = result.descripcion;
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarCategoriaSIB, {
      width: '500px',
      data: {codigo: this.categoriaModel.codigo, descripcion: this.categoriaModel.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.categoriaEditable.descripcion = result.descripcion;
    });
  }

  ngOnInit() {
    this.listarCategoriasParaTabla()
  }

  limpiarVariables(){
    this.categoriaModel = new CategoriaSib(0,'','','','1',true)
    this.categoriaEditable = new CategoriaSib(0,'','','','1',true)
  }

  agregar() {
    this._categoriaService.crearCategoria(this.categoriaModel).subscribe(
      response => {
        console.log(response)
        this.listarCategoriasParaTabla();
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

  listarCategoriasParaTabla() {
    this._categoriaService.listarPagina(this.numeroPagina, this.numeroItems).subscribe(
      response => {
        if (response.content) {
          this.categorias = response.content;
          this.dataSource2 = new MatTableDataSource<CategoriaSib>(this.categorias);
          console.log(this.categorias);
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

  displayedColumns: string[] = ['select', 'codigo','descripcion'];
  dataSource = new MatTableDataSource<CategoriaSib>(this.categorias);
  selection = new SelectionModel<CategoriaSib>(true, []);

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
  checkboxLabel(row?: CategoriaSib): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-categoria-sib.component.html',
  styleUrls: ['./categorias-sib.component.css']
})
export class DailogAgregarCategoriaSIB {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarCategoriaSIB>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaSib) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-categoria-sib.component.html',
  styleUrls: ['./categorias-sib.component.css']
})
export class DailogEliminarCategoriaSIB {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarCategoriaSIB>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaSib) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-categoria-sib.component.html',
  styleUrls: ['./categorias-sib.component.css']
})
export class DailogEditarCategoriaSIB {
  public categoriaModel: CategoriaSib;

  constructor(
    public dialogRef: MatDialogRef<DailogEditarCategoriaSIB>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaSib) {
      this.categoriaModel = new CategoriaSib(0,'','','','1',true)
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}