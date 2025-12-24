sap.ui.define([], function() {
	"use strict";
	return  {
        STATUS: {
            NEW: { code: "N", percent: 0 },
            ASSIGNED: { code:  "A", percent: 15 },
            IN_PROCESS: { code: "I", percent: 50 },
            ON_HOLD: { code: "H", percent: 50 },
            RESOLVED: { code: "R", percent: 80 },
            CLOSED: { code: "C", percent: 100 },
            DEFAULT: {code: '', percent: 0 }
        },

        VALUESTATE: {
           WARNING: "Warning",
           INFORMATION: "Information",
           SUCCESS: "Success",
           ERROR: "Error",
           NONE: "None"
        }
	};
});