import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { OperationReportModel } from 'src/app/model/operation-report.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-operation-report',
  templateUrl: './operation-report.component.html',
  styleUrls: ['./operation-report.component.css']
})
export class OperationReportComponent implements OnInit {
  formValue!: FormGroup;
  operationReportModelObj: OperationReportModel = new OperationReportModel();
  operationReportData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllOperationReport();

    this.formValue = this.formBuilder.group({
      patientId: [''],
      patientName: [''],
      gurdianName: [''],
      consultantName: [''],
      disease: [''],
      description: [''],
      roomNo: [''],
      bedNo: [''],
      totalCost: [''],
      status: [''],

    })
  }

  clickAddOperationReport(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postOperationReportDetails() {
    this.operationReportModelObj.patientId = this.formValue.value.patientId;
    this.operationReportModelObj.patientName = this.formValue.value.patientName;
    this.operationReportModelObj.gurdianName = this.formValue.value.gurdianName;
    this.operationReportModelObj.consultantName = this.formValue.value.consultantName;
    this.operationReportModelObj.disease = this.formValue.value.disease;
    this.operationReportModelObj.description = this.formValue.value.description;
    this.operationReportModelObj.roomNo = this.formValue.value.roomNo;
    this.operationReportModelObj.bedNo = this.formValue.value.bedNo;
    this.operationReportModelObj.totalCost = this.formValue.value.totalCost;
    this.operationReportModelObj.status = this.formValue.value.status;
 

    this.api.post(this.operationReportModelObj,"operation-report")
      .subscribe(res => {
        console.log(res);
        alert("OperationReport Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllOperationReport();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllOperationReport() {
    this.api.get("operation-report")
      .subscribe(res => {
        this.operationReportData = res;
        this.operationReportData.image=this.convertToBase64(this.operationReportData.image);
      })
  }
  deleteOperationReport(row: any) {
    this.api.delete(row.id,"operation-report")
      .subscribe((res: any) => {
        alert("OperationReport Deleted")
        this.getAllOperationReport();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.operationReportModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateOperationReportDetails() {

    // this.operationReportModelObj.firstName = this.formValue.value.firstName;
    // this.operationReportModelObj.lastName = this.formValue.value.lastName;
    // this.operationReportModelObj.email = this.formValue.value.email;
    // this.operationReportModelObj.mobile = this.formValue.value.mobile;
    // this.operationReportModelObj.salary = this.formValue.value.salary;
    
    // this.operationReportModelObj.image=this.base64code;

    this.api.update(this.operationReportModelObj, this.operationReportModelObj.id,"operation-report")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllOperationReport();
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
    this.getAllOperationReport();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllOperationReport();
  }

  }

