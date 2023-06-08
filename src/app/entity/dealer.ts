import { AuditAllocation } from "./AuditAllocation"
import { Address } from "./address"
import { Audit } from "./audit"

export class Dealer{

    dealerCode!:number;
    dealerName!:string;
    businessCenter!:number;
	saleGroupSize!:number;
    auditAllocation!:AuditAllocation[];
    audit!:Audit[];
    address!:Address;

   

}