import { useSyncExternalStore } from "react";
import { CSS_RESET } from "./css-reset";

let listeners: any[] = [];

export type Head = {
  styles: Set<string>;
  title: string | undefined;
};

const head: Head = {
  styles: new Set([CSS_RESET]),
  title: undefined,
};

export const headStore = {
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return head;
  },
  addStyle(css: string) {
    if (!head.styles.has(css)) {
      head.styles.add(css);
      emitChange();
    }
  },
  getStyleString() {
    return Array.from(head.styles.values()).join("\n\n");
  },
  setTitle(title: string) {
    if (head.title != title) {
      head.title = title;
      emitChange();
    }
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export const useHead = () => {
  const state = useSyncExternalStore(
    headStore.subscribe,
    headStore.getSnapshot,
    headStore.getSnapshot
  );
  return [state, headStore] as const;
};
