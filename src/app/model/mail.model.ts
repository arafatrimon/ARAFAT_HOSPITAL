export class MailModel{
    id:number=0;
    to:string='';
    subject:string='';
    message:string='';
    file!: Blob;
    
}