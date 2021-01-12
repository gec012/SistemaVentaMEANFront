import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

interface HtmlImputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto;
  public categorias;
  public file:File;
  public imgSelect :String|ArrayBuffer;
  public success_message;
  public error_message;

  constructor(
    private _serviceProducto : ProductoService,
  ) {
    this.producto= new Producto('','','','',1,1,1,'',1);
   }

  ngOnInit(): void {
    this._serviceProducto.get_categorias('').subscribe(
      response=>{
            this.categorias = response.categoria;

      },
      error=>{

      }
    );


  }
  success_alert(){
    this.success_message='';
  }
 error_alert(){
   this.error_message='';
 }

  onSubmit(productoForm){
     if(productoForm.valid){
        this._serviceProducto.insert_producto(
         { titulo:productoForm.value.titulo,
          descripcion: productoForm.value.descripcion,

          imagen:this.file,
          precio_compra:productoForm.value.precio_compra,
          precio_venta:productoForm.value.precio_venta,
          stock :productoForm.value.stock,
          idcategoria:productoForm.value.idcategoria,
          puntos :productoForm.value.puntos,
        }
        ).subscribe(
          response=>{
            
              this.success_message='Se registro correctamente!';
              this.producto= new Producto('','','','',1,1,1,'',1);
              this.imgSelect ='../../../../assets/img/default.png'
            },
          error=>{

          }
        );
     }else{
       this.error_message='Complete correctamente el formulario';
       console.log('error en el formulario');
     }
  }

  imgSelected(event:HtmlImputEvent){
      if(event.target.files && event.target.files[0]){
        this.file = <File> event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(this.file);

      }
  }
}
