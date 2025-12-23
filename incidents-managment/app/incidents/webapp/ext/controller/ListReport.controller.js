sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'../utils/Formatter',
	'../utils/constants'
], function (
	ControllerExtension,
	Formatter,
	Constants
) {
	'use strict';

	return ControllerExtension.extend('ns.incidents.ext.controller.ListReport', {
		formatter: Formatter,

		/**
         * Formats the given status to a Percent Value for Progress Indicator.
         * @param {string} sStatus Status String
         */
        formatStatusToPercent: function (sStatus) {
            switch (sStatus) {
                case Constants.STATUS.NEW:
                    return 0;
                case Constants.STATUS.ASSIGNED:
                    return 15;
                case Constants.STATUS.IN_PROCESS:
                    return 50;
                case Constants.STATUS.ON_HOLD:
                    return 50
                case Constants.STATUS.RESOLVED:
                    return 80;
                case Constants.STATUS.CLOSED:
                    return 100;
                default:
                    return 0;
            }
        },

		/**
		 * Formats The given Status to a State
		 */
		formatStatusToState: function(sStatus) {
			switch (sStatus) {
				case Constants.STATUS.ON_HOLD:
					return 'Warning'
				case Constants.STATUS.CLOSED:
					return 'Success'
				default: 
					return 'None'
			}
		},

		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf ns.incidents.ext.controller.ListReport
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				console.log("List Report Extension Initialized");
			}
		}
	});
});
