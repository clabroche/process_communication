export default class Content {
  private port: browser.runtime.Port;
  private methods: Map<string, Function[]> = new Map();
  register(channelName: string) {
    this.port = browser.runtime.connect(browser.runtime.id, { name: channelName });
    this.port.onMessage.addListener(this.listener.bind(this));
    this.port.onDisconnect.addListener(() => {
      this.port.onMessage.removeListener(this.listener.bind(this));
    });
    return this;
  }

  listener(message: { type: string; values: Array<number> }) {
    const callbacks = this.methods.get(message.type);
    callbacks?.forEach(callback => callback(...message.values));
  }

  on(methodName: string, callback: Function) {
    const callbacks = this.methods.get(methodName);
    if (callbacks) {
      this.methods.set(methodName, [...callbacks, callback]);
    } else {
      this.methods.set(methodName, [callback]);
    }
    return this;
  }

  send(methodName: string, ...values: any) {
    return this.port.postMessage({
      type: methodName,
      values: values,
    });
  }
}
