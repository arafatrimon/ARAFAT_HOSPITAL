import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { NoticeBoardModel } from 'src/app/model/notice-board.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit {

  formValue!: FormGroup;
  noticeBoardModelObj: NoticeBoardModel = new NoticeBoardModel();
  noticeBoardData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllNoticeBoard();

    this.formValue = this.formBuilder.group({
      title: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      assignBy: ['']
    })
  }

  clickAddNoticeBoard(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postNoticeBoardDetails() {
    this.noticeBoardModelObj.title = this.formValue.value.title;
    this.noticeBoardModelObj.description = this.formValue.value.description;
    this.noticeBoardModelObj.startDate = this.formValue.value.startDate;
    this.noticeBoardModelObj.endDate = this.formValue.value.endDate;
    this.noticeBoardModelObj.assignBy = this.formValue.value.assignBy;
   

    this.api.post(this.noticeBoardModelObj,"notice-board")
      .subscribe(res => {
        console.log(res);
        alert("NoticeBoard Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllNoticeBoard();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllNoticeBoard() {
    this.api.get("notice-board")
      .subscribe(res => {
        this.noticeBoardData = res;
        this.noticeBoardData.image=this.convertToBase64(this.noticeBoardData.image);
      })
  }
  deleteNoticeBoard(row: any) {
    this.api.delete(row.id,"notice-board")
      .subscribe((res: any) => {
        alert("NoticeBoard Deleted")
        this.getAllNoticeBoard();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.noticeBoardModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateNoticeBoardDetails() {

    // this.noticeBoardModelObj.firstName = this.formValue.value.firstName;
    // this.noticeBoardModelObj.lastName = this.formValue.value.lastName;
    // this.noticeBoardModelObj.email = this.formValue.value.email;
    // this.noticeBoardModelObj.mobile = this.formValue.value.mobile;
    // this.noticeBoardModelObj.salary = this.formValue.value.salary;
    
    // this.noticeBoardModelObj.image=this.base64code;

    this.api.update(this.noticeBoardModelObj, this.noticeBoardModelObj.id,"notice-board")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllNoticeBoard();
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
    this.getAllNoticeBoard();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllNoticeBoard();
  }

  }

