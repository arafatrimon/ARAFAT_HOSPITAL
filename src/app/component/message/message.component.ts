import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { MessageModel } from 'src/app/model/message.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  formValue!: FormGroup;
  messageModelObj: MessageModel = new MessageModel();
  messageData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllMessage();

    this.formValue = this.formBuilder.group({
      sendTo: [''],
      subject: [''],
      message: ['']
    })
  }

  clickAddMessage(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postMessageDetails() {
    this.messageModelObj.sendTo = this.formValue.value.sendTo;
    this.messageModelObj.subject = this.formValue.value.subject;
    this.messageModelObj.message = this.formValue.value.message;
   

    this.api.post(this.messageModelObj,"message")
      .subscribe(res => {
        console.log(res);
        alert("Message Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllMessage();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllMessage() {
    this.api.get("message")
      .subscribe(res => {
        this.messageData = res;
        this.messageData.image=this.convertToBase64(this.messageData.image);
      })
  }
  deleteMessage(row: any) {
    this.api.delete(row.id,"message")
      .subscribe((res: any) => {
        alert("Message Deleted")
        this.getAllMessage();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.messageModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateMessageDetails() {

    // this.messageModelObj.firstName = this.formValue.value.firstName;
    // this.messageModelObj.lastName = this.formValue.value.lastName;
    // this.messageModelObj.email = this.formValue.value.email;
    // this.messageModelObj.mobile = this.formValue.value.mobile;
    // this.messageModelObj.salary = this.formValue.value.salary;
    
    // this.messageModelObj.image=this.base64code;

    this.api.update(this.messageModelObj, this.messageModelObj.id,"message")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllMessage();
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
    this.getAllMessage();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllMessage();
  }

  }

