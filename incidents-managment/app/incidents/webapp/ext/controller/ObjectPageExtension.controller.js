sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	"sap/m/MessageBox",
    "sap/m/MessageToast"
], function (
	ControllerExtension,
	MessageBox,
	MessageToast
) {
	'use strict';

	return ControllerExtension.extend('ns.incidents.ext.controller.ObjectPageExtension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf ns.incidents.ext.controller.ObjectPageExtension
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}
		},

		/**
         * Closes an incident after user confirmation via a message box.
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         */
        closeIncidentWithExtension: function(oContext) {
            const oModel = oContext.getModel();
            const sStatusCode = oContext.getObject().status_code;

            if (sStatusCode === 'C') {
                MessageBox.information("This incident is already closed.");
                return;
            }
            MessageBox.confirm("Are you sure you want to close this incident?", {
                title: "Close Incident",
                onClose: async (oAction) => {
                    if (oAction === MessageBox.Action.OK) {
                        const oOperation = oModel.bindContext("ProcessorService.CloseIncident(...)", oContext);
                        try {
                            await oOperation.execute()
                            MessageToast.show("Incident closed successfully.");
                            this.base.getExtensionAPI().refresh();
                        } catch (error) {
                            MessageBox.error("Error closing incident:", error.message || error);
                        }
                    }
                }
            })
        }
	});
});
