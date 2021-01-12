import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {
  public clientes;
  public p = 1;
  constructor(
    private _clienteService:ClienteService,
  ) { }

  ngOnInit(): void {
       this._clienteService.get_clientes().subscribe(
         response=>{
              this.clientes=response.clientes;
         },
         error=>{

         }
       )

  }
  eliminar(id){
    console.log('id',id);
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        )

        this._clienteService.delete_cliente(id).subscribe(
          resposen=>{
            this._clienteService.get_clientes().subscribe(
              response=>{
                this.clientes = response.clientes;
              },
              error=>{

              }
            );
          },
          erro=>{

          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se cancelo la solicitud :)',
          'error'
        )
      }
    })
  }

}
