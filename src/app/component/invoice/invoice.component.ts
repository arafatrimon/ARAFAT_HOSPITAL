import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InvoiceTest } from 'src/app/model/invoice-test.model';
import { ApiService } from 'src/app/shared/api.service';
import { SumPipe } from '../../pipe/sum.pipe';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
[x: string]: any;

  formValue!: FormGroup;
  employeeModelObj: InvoiceTest = new InvoiceTest();
  employeeData !: any;
  testDetailsData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  searchText = '';

  patients: any[] = [];

    // "Amniocentesis see Prenatal Testing", "Blood Pressure see Vital Signs", " Blood Tests see Laboratory Tests", " Breathing Rate see Vital Signs", "CT ScansDiagnostic Imaging", "EndoscopyFetal Ultrasound see", " Prenatal TestingGenetic TestingHeart Rate see Vital", " SignsHemoglobin A1c see ", "A1CKidney Biopsy see", " Kidney TestsKidney Function Tests see", " Kidney TestsKidney TestsLaboratory Tests"]

    

  patient = {
    testName: '',
    price: 0,
    referrerFee: ''
  }

  values: any = [];

  calculatedValue = {
    subtotal: 0,
    discount: 0,
    payableAmount: 0,
    pay: 0,
    due: 0
  }

  testData: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllTestDetails();
    

  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.api.post(this.values, "invoice")
      .subscribe((res: any) => {
        console.log(res);
        alert("Invoice  Adeded Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();

      }, (err: any) => {
        alert("Something went worng")
      }
      )
  }
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;
      })
  }

  addTest() {
    this.values.push({...this.patient});
    console.log(this.values);

    this.patient = {
      testName: '',
      price: 0,
      referrerFee: ''
    }
  }

  getSubTotal(): number {
    let sumPrice: number = this.values.reduce((a: number, b: { price: number; }) => Number(a) + Number(b.price), 0);
    this.calculatedValue.subtotal = sumPrice;

    return sumPrice;
  }

  getPayableAmount(): number {
    let payableAmount: number = this.calculatedValue.subtotal - (this.calculatedValue.subtotal * this.calculatedValue.discount / 100);
    this.calculatedValue.payableAmount = payableAmount;
    return payableAmount;
  }

  // sdfsdf(){
  //   this.fsdfs({...this.patient, ...this.calculatedValue});
  // }


  // fsdfs(data: any){}

  // test(data: any) { };

  // testObj() {

  // }

  createBill() {
    this.postEmployeeDetails()

    this.testData.push(JSON.parse(JSON.stringify(this.employeeModelObj)));

    console.log("TEst DATa  " + this.testData);
  }


  getAllTestDetails() {
    this.api.get("test-details")
      .subscribe(res => {
        this.testDetailsData = res;
      // console.log("getAllTestDetails "+JSON.stringify(this.testDetailsData));
        
      })
  }

}

