namespace sap.capire.incidents;

using { cuid, managed, sap.common.CodeList } from '@sap/cds/common';

entity Incidents : cuid, managed {
  customer : Association to Customers;
  title    : String @title : 'Title';
  urgency  : Association to Urgency;
  status   : Association to Status;
  
  conversation : Composition of many Conversations on conversation.incident = $self;
}

entity Conversations : cuid {
    incident : Association to Incidents;
    author  : String;
    message : String;
    timestamp: DateTime;
}

entity Customers : cuid, managed {
  firstName : String;
  lastName  : String;
  email     : String;
  phone     : String;
  incidents : Association to many Incidents on incidents.customer = $self;
}

entity Status : CodeList {
  key code : String enum {
      new = 'N';
      assigned = 'A';
      in_process = 'I';
      on_hold = 'H';
      resolved = 'R';
      closed = 'C'; 
  };
  criticality : Integer;
}

entity Urgency : CodeList {
  key code : String enum {
      high = 'H';
      medium = 'M';
      low = 'L'; 
  };
}

type EmailAddress : String;
type PhoneNumber : String;