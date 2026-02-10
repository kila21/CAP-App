const cds = require('@sap/cds');

class ProcessorService extends cds.ApplicationService {
    async init () {
        const { Incidents, Conversations } = this.entities;
        this.Incidents = Incidents;
        this.Conversations = Conversations;

        this.before("UPDATE", "Incidents", (req) => this.onUpdate(req));
        this.before("CREATE", "Incidents", (req) => this.changeUrgencyDueToSubject(req.data));
        this.on("CloseIncident", "Incidents", async (req) => await this.closeIncident(req));
        this.on("PutOnHold", "Incidents", async (req) => await this.putOnHold(req));
        this.on("AssignToAgent", "Incidents", async (req) => await this.assignToAgent(req));

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
        const { reason } = req.data;

        await INSERT.into(this.Conversations).entries({
            incident_ID: ID,
            author: req.user.id,
            message: `Incident Closed By ${req.user.id}. Reason: ${reason}`,
            timestamp: new Date().toISOString()
        })
        await UPDATE(req.subject).set({ status_code: 'C' }).where({ ID });
        return SELECT.one.from(req.subject).where({ ID });
    }

    async putOnHold (req) {
        const { ID } = req.params[0];
        const { reason } = req.data;

        await INSERT.into(this.Conversations).entries({
            incident_ID: ID,
            author: req.user.id,
            message: reason,
            timestamp: new Date().toISOString()
        });

        await UPDATE(this.Incidents).set({ status_code: 'H'}).where({ ID });

        return SELECT.one.from(this.Incidents).where({ ID });
    }

    async assignToAgent (req) {
        const { ID } = req.params[0];
        const { agentId } = req.data;

        if (!agentId) {
            return req.error(400, 'Support agent must be selected');
        }

        const agent = await SELECT.one.from('sap.capire.incidents.SupportAgents')
            .where({ ID: agentId, active: true });

        if (!agent) {
            return req.error(404, `Support agent not found or inactive`);
        }

        const currentUser = req.user.id || 'anonymous';

        await INSERT.into(this.Conversations).entries({
            incident_ID: ID,
            author: currentUser,
            message: `Incident assigned to agent: ${agent.firstName} ${agent.lastName} by ${currentUser}`,
            timestamp: new Date().toISOString()
        })

        await UPDATE(this.Incidents).set({assignedTo_ID: agentId, status_code: 'A'}).where({ ID });

        return SELECT.one.from(this.Incidents).where({ ID });
    }
}

module.exports = {ProcessorService}