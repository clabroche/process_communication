import { Subject } from 'rxjs';

export default class Channel {
  channelName: string;
  onConnectSubject = new Subject();
  methods: Map<string, Subject<Function>> = new Map();
  constructor(channelName: string) {
    this.channelName = channelName;
  }

  onConnect(callback: ChannelCallback) {
    this.onConnectSubject.subscribe(callback);
  }
  on(methodName: string, callback: Function) {
    const method = this.methods.get(methodName);
    if (!method) {
      const method = new Subject<Function>();
      method.subscribe((values: Function) => callback(values));
      this.methods.set(methodName, method);
    } else {
      method.subscribe((values: Function) => callback(values));
    }

    return this;
  }
}

interface ChannelCallback {
  (port: browser.runtime.Port): any;
}
