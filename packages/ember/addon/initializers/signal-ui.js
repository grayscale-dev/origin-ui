import { applyPolyfills, defineCustomElements } from "@signal-ui/core/loader";

let didDefine = false;

export function initialize() {
  if (didDefine) return;
  didDefine = true;
  applyPolyfills().then(() => defineCustomElements());
}

const initializer = {
  initialize
};

export default initializer;
