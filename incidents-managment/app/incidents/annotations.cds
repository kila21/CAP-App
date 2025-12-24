using ProcessorService as service from '../../srv/services';
using from '../../db/schema';

annotate service.Incidents with @(
    
);
annotate service.Incidents with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : title,
            Label : '{i18n>Title}',
        },
        {
            $Type : 'UI.DataField',
            Value : customer.firstName,
            Label : '{i18n>Customer}',
        },
        {
            $Type : 'UI.DataField',
            Value : urgency_code,
            Label : '{i18n>Urgency}',
            Criticality : urgency.criticality,
            CriticalityRepresentation : #WithoutIcon,
            @UI.Importance : #Medium,
        },
    ],
    UI.SelectionFields : [
        status_code,
        urgency_code,
        customer.firstName,
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : title,
        },
        TypeName : 'Incidents',
        TypeNamePlural : '{i18n>IncidentsTableTitle}',
        Description : {
            $Type : 'UI.DataField',
            Value : customer.firstName,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : '{i18n>Overview}',
            ID : 'i18nOverview',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>GeneralInformation}',
                    ID : 'GeneralInformation',
                    Target : '@UI.FieldGroup#GeneralInformation',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Details',
                    ID : 'Details',
                    Target : '@UI.FieldGroup#Details',
                },
            ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Conversation}',
            ID : 'i18nConversation',
            Target : 'conversation/@UI.LineItem#i18nConversation',
        },
    ],
    UI.FieldGroup #Details : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : urgency_code,
                Criticality : urgency.criticality,
            },
        ],
    },
    UI.FieldGroup #i18nGeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
        ],
    },
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : title,
                Label : '{i18n>Title}',
            },
            {
                $Type : 'UI.DataField',
                Value : customer_ID,
                Label : '{i18n>Customer}',
            },
        ],
    },
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'ProcessorService.CloseIncident',
            Label : '{i18n>CloseIncident}',
        },
    ]
);


annotate service.Incidents with {
    status @(
        Common.Label : '{i18n>Status}',
        Common.ValueListWithFixedValues : true,
        Common.Text : status.descr,
        )
};

annotate service.Incidents with {
    urgency @(
        Common.Label : '{i18n>Urgency}',
        Common.ValueListWithFixedValues : true,
        Common.Text : urgency.descr,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.Customers with {
    firstName @(
        Common.Label : '{i18n>Firstnamecustomer}',
        )
};

annotate service.Urgency with {
    code @(
        Common.Text : descr,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Conversations with @(
    UI.LineItem #Conversation : [
    ],
    UI.LineItem #i18nConversation : [
        {
            $Type : 'UI.DataField',
            Value : author,
            Label : '{i18n>Author}',
        },
        {
            $Type : 'UI.DataField',
            Value : message,
            Label : 'message',
        },
    ],
);

annotate service.Status with {
    code @Common.Text : descr
};

annotate service.Incidents with {
    customer @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Customers',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : customer_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'firstName',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'email',
                },
            ],
        },
        Common.ValueListWithFixedValues : false,
        Common.Text : customer.firstName,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Incidents actions {
    CloseIncident @(
        Common.SideEffects: {
            TargetProperties: [ 'status_code', 'status' ],
        }
    );
}


