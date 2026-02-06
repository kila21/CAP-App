using { sap.capire.incidents as incidents } from '../db/schema';

service ProcessorService {
    entity Incidents as projection on incidents.Incidents actions {
        action AssignToMe() returns Incidents;
        action PutOnHold(reason: String) returns Incidents;



        @Core.OperationAvailable : { $edmJson: { $Ne: [{ $Path: 'status_code'}, 'C'] } }
        action CloseIncident(reason: String @Common.Label : 'Closer Reason') returns Incidents;
    };

    @readonly
    entity Customers as projection on incidents.Customers;
}
annotate ProcessorService.Incidents with @odata.draft.enabled;
// annotate ProcessorService with @(requires: 'support');

service AdminService {
    entity Incidents as projection on incidents.Incidents;
    entity Customers as projection on incidents.Customers;
}
annotate AdminService with @(requires: 'admin')