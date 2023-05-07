import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { BirthReportModel } from 'src/app/model/birth-report.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-birth-report',
  templateUrl: './birth-report.component.html',
  styleUrls: ['./birth-report.component.css']
})
export class BirthReportComponent implements OnInit {

  formValue!: FormGroup;
  birthReportModelObj: BirthReportModel = new BirthReportModel();
  birthReportData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllBirthReport();

    this.formValue = this.formBuilder.group({
      patientId: [''],
      date: [''],
      title: [''],
      description: [''],
      status: [''],
    })
  }

  clickAddBirthReport(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postBirthReportDetails() {
const obj = this.birthReportModelObj;
const formVal =  this.formValue.value;

    obj.patientId = formVal.patientId;
    obj.date = formVal.date;
    obj.title = formVal.title;
    obj.description = formVal.description;
    obj.status = formVal.status;
    this.api.post(this.birthReportModelObj,"birth-report")
      .subscribe(res => {
        console.log(res);
        alert("BirthReport Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBirthReport();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllBirthReport() {
    this.api.get("birth-report")
      .subscribe(res => {
        this.birthReportData = res;
        this.birthReportData.image=this.convertToBase64(this.birthReportData.image);
      })
  }
  deleteBirthReport(row: any) {
    this.api.delete(row.id,"birth-report")
      .subscribe((res: any) => {
        alert("BirthReport Deleted")
        this.getAllBirthReport();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.birthReportModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateBirthReportDetails() {

    // this.birthReportModelObj.firstName = this.formValue.value.firstName;
    // this.birthReportModelObj.lastName = this.formValue.value.lastName;
    // this.birthReportModelObj.email = this.formValue.value.email;
    // this.birthReportModelObj.mobile = this.formValue.value.mobile;
    // this.birthReportModelObj.salary = this.formValue.value.salary;
    
    // this.birthReportModelObj.image=this.base64code;

    this.api.update(this.birthReportModelObj, this.birthReportModelObj.id,"birth-report")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBirthReport();
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
    this.getAllBirthReport();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllBirthReport();
  }

  }

