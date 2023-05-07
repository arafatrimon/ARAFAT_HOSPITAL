export class AppointmentModel{
    id:number=0;
    patientId:string='';
    patientName:string='';
    department:Object={"id":0};
    doctor:Object={"id":0};
    appointmentDate!:Date;
    serialNo:string='';
    problem: string='';
    status: boolean=false;

}