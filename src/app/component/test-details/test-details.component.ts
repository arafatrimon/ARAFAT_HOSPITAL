import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { TestDetailsModel } from 'src/app/model/test-details.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  formValue!: FormGroup;
  testDetailsModelObj: TestDetailsModel = new TestDetailsModel();
  testDetailsData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllTestDetails();

    this.formValue = this.formBuilder.group({
      testId: [''],
      testName: [''],
      type: [''],
      price: ['']
    })
  }

  clickAddTestDetails(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postTestDetailsDetails() {
    this.testDetailsModelObj.testId = this.formValue.value.testId;
    this.testDetailsModelObj.testName = this.formValue.value.testName;
    this.testDetailsModelObj.type = this.formValue.value.type;
    this.testDetailsModelObj.price = this.formValue.value.price;


    this.api.post(this.testDetailsModelObj,"test-details")
      .subscribe(res => {
        console.log(res);
        alert("TestDetails Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllTestDetails();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllTestDetails() {
    this.api.get("test-details")
      .subscribe(res => {
        this.testDetailsData = res;
      })
  }
  deleteTestDetails(row: any) {
    this.api.delete(row.id,"test-details")
      .subscribe((res: any) => {
        alert("TestDetails Deleted")
        this.getAllTestDetails();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.testDetailsModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateTestDetailsDetails() {

    // this.testDetailsModelObj.firstName = this.formValue.value.firstName;
    // this.testDetailsModelObj.lastName = this.formValue.value.lastName;
    // this.testDetailsModelObj.email = this.formValue.value.email;
    // this.testDetailsModelObj.mobile = this.formValue.value.mobile;
    // this.testDetailsModelObj.salary = this.formValue.value.salary;
    
    // this.testDetailsModelObj.image=this.base64code;

    this.api.update(this.testDetailsModelObj, this.testDetailsModelObj.id,"test-details")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllTestDetails();
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
    this.getAllTestDetails();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllTestDetails();
  }

  }

