import { Dealer } from "./dealer";

export class Audit{
    auditCode!:number

    dealer!:Dealer;
	
    auditType!:string
	
    dateAssigned!:Date
	
	 reasonAuditSelected!:string
	
	noOfMonthsData!:number
	
    comments!:string
   
}