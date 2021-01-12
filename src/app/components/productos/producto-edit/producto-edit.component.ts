import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

interface HtmlImputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {


    public producto;
    public id;
    public categorias;
    public url=GLOBAL.url;
    public error_message;
    public success_message;
    public file:File;
    public imgSelect :String|ArrayBuffer;


  constructor(
    private _route:ActivatedRoute,
    private _serviceProducto :ProductoService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.id = params['id'];
      this._serviceProducto.get_producto(this.id).subscribe(
        response=>{
          console.log(response);
            this.producto=response.producto;
            this._serviceProducto.get_categorias('').subscribe(
              response=>{
                    this.categorias = response.categoria;

              },
              error=>{

              }
            );
          },
        error=>{

        }
      )
    });
  }

success_alert(){
  this.success_message='';
}
error_alert(){
 this.error_message='';
}
onSubmit(productoForm){
  if(productoForm.valid){
     this._serviceProducto.update_producto(
      {
          _id:this.id,
          titulo:productoForm.value.titulo,
          descripcion: productoForm.value.descripcion,

          imagen:this.file,
          precio_compra:productoForm.value.precio_compra,
          precio_venta:productoForm.value.precio_venta,

          idcategoria:productoForm.value.idcategoria,
          puntos :productoForm.value.puntos,
          img_name:this.producto.imagen,

     }
     ).subscribe(
       response=>{
            console.log(response);
            this.success_message='Se actualizo correctamente';
      },
       error=>{

       }
     );
  }else{
    this.error_message='Complete correctamente el formulario';
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
