import { action, observable, makeObservable } from 'mobx';
// import api from '../../api_auth';
import jwtDecode from 'jwt-decode';
import { agentsApi } from '../../api';

class AgentStore {
  agents: any = [];
  singleAgent: any = null;

  constructor() {
    makeObservable(this, {
      agents: observable,
      singleAgent: observable,
      getAgentsList: action,
      getAgent: action,

      setSingleAgent: action,

      createAgent: action,
      deleteAgent: action,
    });
  }

  setSingleAgent = (newAgent: any) => {
    this.singleAgent = newAgent;
  };

  getAgentsList = async () => {
    const data = await agentsApi.getAgentsList();

    if (data) {
      this.agents = [...data.data];
    }
  };

  getAgent = async (agentId: string) => {
    const data = await agentsApi.getAgent(agentId);

    this.setSingleAgent(data?.data);
  };

  createAgent = async (agentId: string) => {
    await agentsApi.createAgent(agentId);
  };

  deleteAgent = async (agentId: string) => {
    await agentsApi.deleteAgent(agentId);
  };
}

export default new AgentStore();
