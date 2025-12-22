const cds = require('@sap/cds');

class ProcessorService extends cds.ApplicationService {
    async init () {
        this.before("UPDATE", "Incidents", (req) => this.onUpdate(req))
        this.before("CREATE", "Incidents", (req) => this.changeUrgencyDueToSubject(req.data))
        this.on("CloseIncident", "Incidents", async (req) => await this.closeIncident(req))

        return await super.init();
    }

    changeUrgencyDueToSubject(data) { 
        if (data) {
            const incidents = Array.isArray(data) ? data : [data];

            incidents.forEach(incident => {
                if (incident.title?.toLowerCase().includes('urgent')) {
                    incident.urgency = {code: 'H', descr: 'High' };
                }
            })
        }
    }


    async onUpdate (req) {
        const { status_code } = await SELECT.one(req.subject, i => i.status_code).where({ ID: req.data.ID });

        if (status_code === 'C') {
            return req.error(400, `Can't modify a closed incident.`);
        }
    }

    async closeIncident (req) {
        const { ID } = req.params[0];
        await UPDATE(req.subject).set({ status_code: 'C' }).where({ ID })
        return SELECT.one.from(req.subject).where({ ID });
    }
}

module.exports = {ProcessorService}