// import { observable, action, makeObservable, runInAction } from 'mobx';
// import { createBrowserHistory as createHistory, History, Path } from 'history';

// export const history = createHistory();

// type LocationDescriptorObject = any;

// class Location {
//   hash: string;
//   key: string;
//   pathname: string;
//   search: string;
//   state: { [key: string]: any };

//   constructor() {
//     makeObservable(this, {
//       hash: observable,
//       key: observable,
//       pathname: observable,
//       search: observable,
//       state: observable,
//     });
//   }
// }

// class HistoryStore {
//   declare history: History;
//   actions: Omit<History, 'location'>;
//   location = new Location();

//   constructor(hist: History) {
//     makeObservable(this, {
//       actions: observable,
//       location: observable,
//       push: action,
//       replace: action,
//     });

//     const { location, ...actions } = hist;
//     this.history = hist;
//     this.actions = actions;

//     Object.assign(this.location, location);

//     hist.listen((newLocation) => {
//       runInAction(() => {
//         Object.assign(this.location, newLocation);
//       });
//     });
//   }

//   push = (url: LocationDescriptorObject | Path): void => {
//     this.actions.push(url as string);
//   };

//   replace = (url: LocationDescriptorObject | Path): void => {
//     this.actions.replace(url as string);
//   };
// }

// export default new HistoryStore(history);
