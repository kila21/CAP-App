sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "ns/incidents/ext/utils/Constants"
], function (
    DateFormat,
    Constants
) {
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
        },

        /**
         * Formats the given status to a Percent Value for Progress Indicator.
         * @param {string} sStatus
         * @returns {number}
         */
        formatStatusToPercent: function (sStatus) {
            const oStatus = Constants.STATUS
            switch (sStatus) {
                case oStatus.NEW.code:
                    return oStatus.NEW.percent;
                case oStatus.ASSIGNED.code:
                    return oStatus.ASSIGNED.percent;
                case oStatus.IN_PROCESS.code:
                    return oStatus.IN_PROCESS.percent;
                case oStatus.ON_HOLD.code:
                    return oStatus.ON_HOLD.percent;
                case oStatus.RESOLVED.code:
                    return oStatus.RESOLVED.percent;
                case oStatus.CLOSED.code:
                    return oStatus.CLOSED.percent;
                default:
                    return oStatus.DEFAULT.percent;
            }
        },

        /**
		 * Formats The given Status to a State.
         * @param {string} sStatus
         * @returns {string}
		 */
		formatStatusToState: function(sStatus) {
			switch (sStatus) {
				case Constants.STATUS.ON_HOLD.code:
					return Constants.VALUESTATE.WARNING
				case Constants.STATUS.CLOSED.code:
					return Constants.VALUESTATE.SUCCESS
				default: 
					return Constants.VALUESTATE.NONE
			}
		},
    };
});