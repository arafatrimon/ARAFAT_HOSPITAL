import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { BloodBankReportModel } from 'src/app/model/blood-bank-report.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-blood-bank-report',
  templateUrl: './blood-bank-report.component.html',
  styleUrls: ['./blood-bank-report.component.css']
})
export class BloodBankReportComponent implements OnInit {

  formValue!: FormGroup;
  bloodBankReportModelObj: BloodBankReportModel = new BloodBankReportModel();
  bloodBankReportData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllBloodBankReport();

    this.formValue = this.formBuilder.group({
      patientId: [''],
      name: [''],
      bloodGroup: [''],
      disease: [''],
      date: [''],
      results: [''],
    })
  }

  clickAddBloodBankReport(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postBloodBankReportDetails() {
    this.bloodBankReportModelObj.patientId = this.formValue.value.patientId;
    this.bloodBankReportModelObj.name = this.formValue.value.name;
    this.bloodBankReportModelObj.bloodGroup = this.formValue.value.bloodGroup;
    this.bloodBankReportModelObj.disease = this.formValue.value.disease;
    this.bloodBankReportModelObj.date = this.formValue.value.date;
    this.bloodBankReportModelObj.results = this.formValue.value.results;
   

    this.api.post(this.bloodBankReportModelObj,"blood-bank-report")
      .subscribe(res => {
        console.log(res);
        alert("BloodBankReport Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodBankReport();

      }, _err => {
        alert("Something went worng")
      }
      )
  }
  getAllBloodBankReport() {
    this.api.get("blood-bank-report")
      .subscribe(res => {
        this.bloodBankReportData = res;
        this.bloodBankReportData.image=this.convertToBase64(this.bloodBankReportData.image);
      })
  }
  deleteBloodBankReport(row: any) {
    this.api.delete(row.id,"blood-bank-report")
      .subscribe((res: any) => {
        alert("BloodBankReport Deleted")
        this.getAllBloodBankReport();
      })
  }
  onEdit(row: any) {
this.showAdd=false;
this.showUpdate=true;

    this.bloodBankReportModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }
  updateBloodBankReportDetails() {

    // this.bloodBankReportModelObj.firstName = this.formValue.value.firstName;
    // this.bloodBankReportModelObj.lastName = this.formValue.value.lastName;
    // this.bloodBankReportModelObj.email = this.formValue.value.email;
    // this.bloodBankReportModelObj.mobile = this.formValue.value.mobile;
    // this.bloodBankReportModelObj.salary = this.formValue.value.salary;
    
    // this.bloodBankReportModelObj.image=this.base64code;

    this.api.update(this.bloodBankReportModelObj, this.bloodBankReportModelObj.id,"blood-bank-report")
      .subscribe((res: any)=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBloodBankReport();
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
    this.getAllBloodBankReport();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getAllBloodBankReport();
  }

  }

