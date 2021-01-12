import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';

@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styleUrls: ['./venta-index.component.css']
})
export class VentaIndexComponent implements OnInit {

  public identity;
  public ventas;

  constructor(
  private _userService:UserService,
  private _ventaService:VentaService,
  private _router:Router,
  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
// usuario autenticado
this._ventaService.get_ventas().subscribe(
  response=>{
    console.log(response);
      this.ventas = response.ventas;
  },
  error=>{

  }
);
    }else{
      this._router.navigate(['']);
    }
  }

}
