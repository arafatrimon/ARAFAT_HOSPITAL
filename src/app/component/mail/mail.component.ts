import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { MailModel } from 'src/app/model/mail.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  formValue!: FormGroup;
  emailModelObj: MailModel = new MailModel();
  emailData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllEmail();

    this.formValue = this.formBuilder.group({
      to: [''],
      subject: [''],
      message: [''],
      // file: ['']
    })
  }

  clickAddEmail(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmailDetails() {
    this.emailModelObj.to = this.formValue.value.to;
    this.emailModelObj.subject = this.formValue.value.subject;
    this.emailModelObj.message = this.formValue.value.message;
    // this.emailModelObj.file = this.formValue.value.file;
 
    // this.emailModelObj.image=this.base64code;

    this.api.postEmail(this.emailModelObj)
  .subscribe(res => {
        console.log(res);
      })
    this.api.post(this.emailModelObj,"mail")
      .subscribe(res => {
        console.log(res);
        alert("Email Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmail();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllEmail() {
    this.api.get("mail")
      .subscribe(res => {
        this.emailData = res;
        console.log(this.emailData);
        
        // this.emailData.image=this.convertToBase64(this.emailData.image);
      })
  }
  deleteEmail(row: any) {
    this.api.delete(row.id,"mail")
      .subscribe((res: any) => {
        alert("Email Deleted")
        this.getAllEmail();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.emailModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateEmailDetails() {

    // this.emailModelObj.firstName = this.formValue.value.firstName;
    // this.emailModelObj.lastName = this.formValue.value.lastName;
    // this.emailModelObj.email = this.formValue.value.email;
    // this.emailModelObj.mobile = this.formValue.value.mobile;
    // this.emailModelObj.salary = this.formValue.value.salary;
    
    // this.emailModelObj.image=this.base64code;

    this.api.update(this.emailModelObj, this.emailModelObj.id,"mail")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmail();
      })

    }


    onDetails(row:any) {
      
      this.onEdit(row);
      this.showAdd=false;
      this.showUpdate=false;
  }
  
  searchText='';

//convert image base 64 format


myimage!: Observable<any>;
  base64code!: any
 
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };
 
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
 
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
 
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  //pagination

  POSTS:any;
  page:number=1;
  count:number=0;
  tableSize:number=10;
  tableSizes:any=[5,10,15,20];

  onTableDataChange(event:any){
    this.page=event;
    this.getAllEmail();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllEmail();
  }

  }

