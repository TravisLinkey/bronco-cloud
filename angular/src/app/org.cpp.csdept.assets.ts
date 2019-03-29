import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {User,Student} from './org.cpp.csdept.user';
// export namespace org.cpp.csdept.assets{
   export class Department_Asset extends Asset {
      asset_Id: string;
      asset_name: string;
      in_use: boolean;
      renter: User;
   }
   export class Rental extends Asset {
      checkout_ID: string;
      due_by: number;
      department_asset: Asset;
      renter: Student;
   }
   export class Create_Asset extends Transaction {
      asset_name: string;
   }
   export class Delete_Asset extends Transaction {
      department_asset: Asset;
   }
   export class Item_Checked_Out extends Event {
      checkout_ID: string;
   }
   export class Item_Returned extends Event {
      checkin_ID: string;
   }
   export abstract class Item_Event extends Transaction {
      renter: Student;
      department_asset: Asset;
   }
   export class Checkout_Item extends Item_Event {
   }
   export class Return_Item extends Item_Event {
   }
// }
