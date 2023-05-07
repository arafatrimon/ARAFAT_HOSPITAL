import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DiagnosticBillCollectionModel } from 'src/app/model/diagnostic-bill-collection';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-diagnostic-bill-collection',
  templateUrl: './diagnostic-bill-collection.component.html',
  styleUrls: ['./diagnostic-bill-collection.component.css']
})
export class DiagnosticBillCollectionComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: DiagnosticBillCollectionModel = new DiagnosticBillCollectionModel();
  employeeData !: any;

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    

    this.formValue = this.formBuilder.group({
      patientId: [''],
      payable: [0],
      paid: [0],
      due: [0],
      status: false
      
    })
  }

  postEmployeeDetails() {
    this.employeeModelObj.patientId = this.formValue.value.patientId;
    this.employeeModelObj.payable = this.formValue.value.payable;
    this.employeeModelObj.paid = this.formValue.value.paid;
    this.employeeModelObj.due = this.formValue.value.due;
    this.employeeModelObj.status = this.formValue.value.status;

    this.api.post(this.employeeModelObj,"diagnosticBillCollection")
      .subscribe((res: any) => {
        console.log(res);
        alert("Employee Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
      }, err => {
        alert("Something went worng")
      }
      )
  
  
  }
}
