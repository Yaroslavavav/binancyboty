import { action, observable, makeObservable } from 'mobx';
// import api from '../../api_auth';
import jwtDecode from 'jwt-decode';
import { agentsApi } from '../../api';

class AgentStore {
  agents: any = [];
  singleAgent: any = { configuration: { setId: {} } };

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
      this.agents = [...data.data].sort(
        (a: any, b: any) => b.agentId - a.agentId
      );
    }
  };

  getAgent = async (agentId: string) => {
    const data = await agentsApi.getAgent(agentId);
    const binanceInfo = await agentsApi.getRefreshedAgentPriceInfo(agentId);

    this.setSingleAgent({ ...data?.data, binanceInfo });
  };

  refreshAgentPriceInfo = async (agentId: string) => {
    const data = await agentsApi.getRefreshedAgentPriceInfo(agentId);

    if (this.singleAgent) {
      this.setSingleAgent({ ...this.singleAgent, binanceInfo: { ...data } });
    }
  };

  createAgent = async (newAgent: string) => {
    const data = await agentsApi.createAgent(newAgent);
    return data;
  };

  deleteAgent = async (agentId: string) => {
    await agentsApi.deleteAgent(agentId);
  };
}

export default new AgentStore();
