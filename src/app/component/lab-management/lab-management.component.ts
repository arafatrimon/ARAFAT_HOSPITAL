import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { EmplooyeeModel } from 'src/app/model/employee.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-lab-management',
  templateUrl: './lab-management.component.html',
  styleUrls: ['./lab-management.component.css']
})
export class LabManagementComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: EmplooyeeModel = new EmplooyeeModel();
  employeeData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllEmployee();

    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
      image:[]
    })
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.image=this.base64code;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
        this.employeeData.image=this.convertToBase64(this.employeeData.image);
      })
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe((res: any) => {
        alert("Employee Deleted")
        this.getAllEmployee();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateEmployeeDetails() {

    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    
    this.employeeModelObj.image=this.base64code;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
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
    this.getAllEmployee();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllEmployee();
  }

  }

