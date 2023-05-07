import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { HumanResourceModel } from 'src/app/model/human-resource.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-human-resource',
  templateUrl: './human-resource.component.html',
  styleUrls: ['./human-resource.component.css']
})
export class HumanResourceComponent implements OnInit {

  formValue!: FormGroup;
  humanResourceModelObj: HumanResourceModel = new HumanResourceModel();
  humanResourceData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllHumanResource();

    this.formValue = this.formBuilder.group({
      employeeId: [''],
      name: [''],
      age: [''],
      email: [''],
      mobile: [''],
      salary: [''],
      address: [''],
      designation: [''],
      department: [''],
      gurdianName: [''],
      gurdianPhone: [''],
      image:[]
    })
  }

  clickAddHumanResource(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postHumanResourceDetails() {
    this.humanResourceModelObj.employeeId = this.formValue.value.employeeId;
    this.humanResourceModelObj.name = this.formValue.value.name;
    this.humanResourceModelObj.age = this.formValue.value.age;
    this.humanResourceModelObj.email = this.formValue.value.email;
    this.humanResourceModelObj.mobile = this.formValue.value.mobile;
    this.humanResourceModelObj.salary = this.formValue.value.salary;
    this.humanResourceModelObj.address = this.formValue.value.address;
    this.humanResourceModelObj.designation = this.formValue.value.designation;
    this.humanResourceModelObj.department = this.formValue.value.department;
    this.humanResourceModelObj.gurdianName = this.formValue.value.gurdianName;
    this.humanResourceModelObj.gurdianPhone = this.formValue.value.gurdianPhone;
    
    this.humanResourceModelObj.image=this.base64code;

    this.api.post(this.humanResourceModelObj,"human-resource")
      .subscribe(res => {
        console.log(res);
        alert("HumanResource Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllHumanResource();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllHumanResource() {
    this.api.get("human-resource")
      .subscribe(res => {
        this.humanResourceData = res;
        this.humanResourceData.image=this.convertToBase64(this.humanResourceData.image);
      })
  }
  deleteHumanResource(row: any) {
    this.api.delete(row.id,"human-resource")
      .subscribe((res: any) => {
        alert("HumanResource Deleted")
        this.getAllHumanResource();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.humanResourceModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateHumanResourceDetails() {

    // this.humanResourceModelObj.firstName = this.formValue.value.firstName;
    // this.humanResourceModelObj.lastName = this.formValue.value.lastName;
    // this.humanResourceModelObj.email = this.formValue.value.email;
    // this.humanResourceModelObj.mobile = this.formValue.value.mobile;
    // this.humanResourceModelObj.salary = this.formValue.value.salary;
    
    // this.humanResourceModelObj.image=this.base64code;

    this.api.update(this.humanResourceModelObj, this.humanResourceModelObj.id,"human-resource")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllHumanResource();
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
    this.getAllHumanResource();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllHumanResource();
  }

  }

