import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Payment } from './Payment';

@Component({
  selector: 'app-patient-bill-collection',
  templateUrl: './patient-bill-collection.component.html',
  styleUrls: ['./patient-bill-collection.component.css']
})
export class PatientBillCollectionComponent implements OnInit {

  payment: Payment = {
    patientId: '',
    name: '',
    price: 0,
    quantity: 1,
    total: 0
  };

  subtotal = 0;

  data: any = []

  values: Payment[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.values = [{...this.payment}];
  }
  //remove input field method
  removevalue(i: number) { this.values?.splice(i, 1); }

  //add input filed method
  addvalue() {
    this.values?.push({ ...this.payment });

  }
  onSubmit() {
    // this.values[0].patientId = this.payment.patientId;
    this.data = this.values;

    console.log("Data " + JSON.stringify(this.values));

    // const limit = this.values?.length || 0;
    // for (let i = 0; i < limit; i++) {
    //   const data: any = this.values ? this.values[i] : { price: 0 };
    //   this.subtotal += Number(data.price);
    // }
    // console.log(this.subtotal);

    this.api.post(this.data,"patient-bill-collection")
    .subscribe(res => {
      console.log("res "+res);
      alert("patient-bill-collection Adeded Successfully")
      this.getPdf();
    }, _err => {
      alert("Something went worng")
    }
    )


  }


  addProduct() {
    this.data = Array.from(this.values ?? []);
    console.log(this.data);
  }

  getTotal(payment: Payment): number {
    payment.total = payment.price * payment.quantity;
    return payment.total;
  }

  res:any;
  getPdf(){
    this.api.getPdf("patient-report")
    .subscribe(res=>{
     this.res=res;
     
    //   this.trueStatusData=res;
    //   console.log("trueStatusHireData "+ JSON.stringify(this.trueStatusData) );
      
    })
  }

}