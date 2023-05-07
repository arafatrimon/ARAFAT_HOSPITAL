import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {
  trueStatusData !: any;
  constructor( private api: ApiService) { }

  ngOnInit(): void {
    this.getTrueStatus();
  }

  
  searchText='';

  //pagination

  POSTS:any;
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];

  onTableDataChange(event:any){
    this.page=event;
    this.getTrueStatus();
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.getTrueStatus();
  }


  getTrueStatus(){
    this.api.getTrueStatus("appointment")
    .subscribe(res=>{
      this.trueStatusData=res;
      console.log("trueStatusHireData "+ JSON.stringify(this.trueStatusData) );
      
    })
  }

   

}
