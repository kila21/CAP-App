sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function(
    MessageBox,
	MessageToast
    ) {
    'use strict';

    return {
        /**
         * Closes an incident after user confirmation via a message box.
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         */
        closeIncidentWithMessageBox: function(oContext) {
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
                            oContext.refresh();
                            oModel.refresh();
                        } catch (error) {
                            MessageBox.error("Error closing incident:", error);
                        }
                    }
                }
            })
        }
    };
});
