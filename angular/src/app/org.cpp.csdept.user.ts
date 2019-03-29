import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.cpp.csdept.user{
   export abstract class User extends Participant {
      cpp_email: string;
      name: string;
      bronco_id: number;
      balance: number;
      department: string;
   }
   export class Admin extends User {
   }
   export class Student extends User {
   }
   export class Add_Money extends Transaction {
      amount: number;
      cpp_email: string;
   }
   export class Money_Added extends Event {
   }
// }
