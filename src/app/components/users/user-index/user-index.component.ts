import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import {UserService} from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  public usuarios;
  public url;
  public p;
  public identity;
  constructor(
    private _userService :UserService,
    private _router:Router,
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {

  if( this.identity.role == 'ADM'){
    this._userService.get_users().subscribe(
      response=>{
           this.usuarios= response.usuarios;
      },
      error=>{

      }
    );
  }else{
    this._router.navigate(['dashboard']);
  }

  }


  eliminar(id){

  }

}
