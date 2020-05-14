import Channel from '../channel';
import {MasterProcess} from '../interfaces/MasterProcess'
export default class MasterBrowser implements MasterProcess {
  private channels: Map<string, Channel> = new Map();

  constructor() {
    if(!browser) {
      throw new Error('It seems you\'r not in browser environnement')
    }
    browser.runtime.onConnect.addListener((port: browser.runtime.Port) => this.connected(port));
  }

  private connected(port: browser.runtime.Port) {
    const channel = this.channels.get(port.name);
    channel?.onConnectSubject.next(port);
    port.onMessage.addListener((message: { type: string; values: any[] }) => {
      const method = channel?.methods.get(message.type);
      console.log(method, message.type);
      method?.next(...message.values);
    });
  }

  send(port: browser.runtime.Port, methodName: string, ...values: any) {
    port.postMessage({
      type: methodName,
      values,
    });
  }
  createChannel(channelName: string) {
    const channel = new Channel(channelName);
    this.channels.set(channelName, channel);
    return channel;
  }
}
