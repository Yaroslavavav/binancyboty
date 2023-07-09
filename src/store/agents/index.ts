import { action, observable, makeObservable } from 'mobx';
// import api from '../../api_auth';
import jwtDecode from 'jwt-decode';
import { agentsApi } from '../../api';

class AgentStore {
  agents: any = [];

  constructor() {
    makeObservable(this, {
      agents: observable,
      getAgents: action,
      createAgent: action,
      deleteAgent: action,
    });
  }

  getAgents = async () => {
    const data = await agentsApi.getAgents();

    if (data) {
      this.agents = [...data.data];
    }
  };

  createAgent = async (agentId: string) => {
    await agentsApi.createAgent(agentId);
  };

  deleteAgent = async (agentId: string) => {
    await agentsApi.deleteAgent(agentId);
  };
}

export default new AgentStore();
