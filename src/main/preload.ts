/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'minimize' | 'maximize' | 'close';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    call(channel: Channels) {
      ipcRenderer.send(channel);
    },
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
