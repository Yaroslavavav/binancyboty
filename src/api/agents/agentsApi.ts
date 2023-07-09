import type { AxiosResponse } from 'axios';

import { agents } from './agentsHttpClient';

class AgentsApi {
  async getAgents() {
    try {
      const response = await agents.get<any[]>('/agent');
      return response || [];
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
    try {
      const response = await agents.post<any>(`/agent/kill/${agentId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export const agentsApi = new AgentsApi();
