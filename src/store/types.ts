import authorizationStore from './auth';
import agentsStore from './agents';

export interface Stores {
  auth: typeof authorizationStore;
  agentsStore: typeof agentsStore;
}
