using { sap.capire.incidents as incidents } from '../db/schema';

service ProcessorService {
    entity Incidents as projection on incidents.Incidents;

    @readonly
    entity Customers as projection on incidents.Customers;
}

annotate ProcessorService.Incidents with @odata.draft.enabled;


service AdminService {
    entity Incidents as projection on incidents.Incidents;
    entity Customers as projection on incidents.Customers;
}