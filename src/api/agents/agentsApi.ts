import type { AxiosResponse } from 'axios';

import { agents } from './agentsHttpClient';

class AgentsApi {
  async getAgentsList() {
    try {
      const response = await agents.get<any[]>('/agent');

      console.log(response);

      return response || [];
    } catch (error) {
      console.error(error);
    }
  }
  async getAgent(id: string) {
    try {
      const response = await agents.get<any[]>(`/agent/${id}`);
      return response || {};
    } catch (error) {
      console.error(error);
    }
  }

  async getRefreshedAgentPriceInfo(id: string) {
    try {
      const response = await agents.get<any>(`/agent/live/${id}`);
      return response.data || {};
    } catch (error) {
      console.error(error);
    }
  }

  async createAgent(agent: any) {
    try {
      const response = await agents.post<any>('/agent/spawn', agent);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAgent(agentId: string) {
    const response = await agents.post<any>(`/agent/kill/${agentId}`);
    return response;
  }
}

export const agentsApi = new AgentsApi();
