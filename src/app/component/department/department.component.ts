import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { DepartmentModel } from 'src/app/model/department.model';
import { EmplooyeeModel } from 'src/app/model/employee.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

 
  formValue!: FormGroup;
  departmentModelObj: DepartmentModel = new DepartmentModel();
  departmentData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllDepartment();

    this.formValue = this.formBuilder.group({
      departmentId: [''],
      departmentName: [''],
      departmentDetails: ['']
    })
  }

  clickAddDepartment(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postDepartmentDetails() {
    this.departmentModelObj.departmentId = this.formValue.value.departmentId;
    this.departmentModelObj.departmentName = this.formValue.value.departmentName;
    this.departmentModelObj.departmentDetails = this.formValue.value.departmentDetails;

    this.api.post(this.departmentModelObj,"department")
      .subscribe(res => {
        console.log(res);
        alert("Department Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDepartment();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllDepartment() {
    this.api.get("department")
      .subscribe(res => {
        this.departmentData = res;
        this.departmentData.image=this.convertToBase64(this.departmentData.image);
      })
  }
  deleteDepartment(row: any) {
    this.api.delete(row.id,"department")
      .subscribe((res: any) => {
        alert("Department Deleted")
        this.getAllDepartment();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.departmentModelObj.id = row.id;
    this.formValue.controls['departmentId'].setValue(row.departmentId);
    this.formValue.controls['departmentName'].setValue(row.departmentName);
    this.formValue.controls['departmentDetails'].setValue(row.departmentDetails);
  
  }
  updateDepartmentDetails() {

    this.departmentModelObj.departmentId = this.formValue.value.departmentId;
    this.departmentModelObj.departmentName = this.formValue.value.departmentName;
    this.departmentModelObj.departmentDetails = this.formValue.value.departmentDetails;
    this.api.update(this.departmentModelObj, this.departmentModelObj.id,"department")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDepartment();
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
    this.getAllDepartment();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllDepartment();
  }

  }

