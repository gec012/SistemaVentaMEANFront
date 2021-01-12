export class Producto{
  constructor(
    public _id:string,
    public titulo: string,
    public descripcion: string,
    public imagen: string,
    // tslint:disable-next-line: variable-name
    public precio_compra: number,
    // tslint:disable-next-line: variable-name
    public precio_venta: number,
    public stock: number,
    public idcategoria: string,
    public puntos: number,
  ){

  }
}
