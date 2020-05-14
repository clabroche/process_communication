export interface MasterProcess {
  send(port: browser.runtime.Port, methodName: string, ...values: any): any;
  createChannel(channelName: string): any;
}
