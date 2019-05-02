import { Subject } from "rxjs/Subject";

export class DepartmentAdminPageService {
    assetCreated = new Subject();
    rentalCreated = new Subject();
    rentalReturned = new Subject();
}