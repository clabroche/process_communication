import {MasterProcess} from "./interfaces/MasterProcess"
import MasterBrowser from "./Browser/MasterBrowser";
import ChildProcess from "./Browser/ChildBrowser";

class Dispatcher {  
  getMaster(): MasterProcess {
    if (this.getEnvironment() === ENVIRONMENT.BROWSER) {
      return new MasterBrowser();
    }
    throw new Error('Cannot \'t get an implementation for this platform')
  }
  getChild(): ChildProcess {
    if (this.getEnvironment() === ENVIRONMENT.BROWSER) {
      return new ChildProcess();
    }
    throw new Error("Cannot 't get an implementation for this platform");
  }
  private getEnvironment() {
    if(browser) return ENVIRONMENT.BROWSER
    return ENVIRONMENT.UNKNOWN
  }
};
export default Dispatcher;
export const dispatcher = new Dispatcher();

export enum ENVIRONMENT {
  BROWSER = "browser",
  UNKNOWN = "unknown",
}
