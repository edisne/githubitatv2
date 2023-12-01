export class User{
    constructor(public id?:string, public userName:string='', public name:string='', public lastName:string='', public email:string='', 
                private _token?:string, public _tokenExpirationDate?:Date, public password:string='', public uid?:string){
    }

    get token(){
        // if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
        //     return '';
        return this._token;
    }
}