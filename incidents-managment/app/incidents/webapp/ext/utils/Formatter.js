sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function (DateFormat) {
    "use strict";

    return {

        /**
         * Formats the given date string.
         * @param {string} sDate Date String
         * @returns {Date} Formatted Date
         */
        formatDate: function (sDate) {
            if (!sDate) {
                return "N/A";
            }

            const oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "MMM dd, yyyy, HH:mm"
            });
            
            return oDateFormat.format(new Date(sDate));
        }
    };
});