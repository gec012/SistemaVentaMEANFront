import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {


  public user;
  public success_message ='';
  public identity;
  constructor(
    private _userService:UserService,
    private _router :Router,
  ) {
    this.user = new User('','','','','','');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.role){

    }else{
      this._router.navigate(['dashboard']);
    }
  }

  success_alert(){
    this.success_message ='';
  }
  onSubmit(userForm){
    if (userForm.valid){

      this._userService.registrar({
         password: userForm.value.password,
         nombre: userForm.value.nombre,
         apellido:userForm.value.apellido,
         email: userForm.value.email,
         role: userForm.value.role,
      }).subscribe(
        response=>{
            this.user = new User('','','','','','');
            this.success_message="El usuario se registro correctamente!";
          console.log(response);
          },
        error=>{
             console.log(<any>error);
        }
      )
    }
  }

}
