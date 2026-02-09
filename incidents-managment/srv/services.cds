using { sap.capire.incidents as incidents } from '../db/schema';

service ProcessorService {
    entity Incidents as projection on incidents.Incidents actions {
        action AssignToAgent(agentId: String) returns Incidents;        
        action PutOnHold(reason: String) returns Incidents;

        @Core.OperationAvailable : { 
            $edmJson: { 
                $And: [
                    { $Eq: [ { $Path: 'IsActiveEntity' }, true ] },
                    { $Ne: [ { $Path: 'status_code' }, 'C' ] }
                ] 
            }
        }
        action CloseIncident(reason: String @Common.Label : 'Closer Reason') returns Incidents;
    };

    @readonly
    entity Customers as projection on incidents.Customers;

    @readonly
    entity SupportAgents as projection on incidents.SupportAgents;
}
annotate ProcessorService.Incidents with @odata.draft.enabled;
annotate ProcessorService with @(requires: 'support');

service AdminService {
    entity Incidents as projection on incidents.Incidents;
    entity Customers as projection on incidents.Customers;
}
annotate AdminService with @(requires: 'admin')