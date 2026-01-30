import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | signal-button", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders and registers custom elements", async function (assert) {
    assert.ok(window.customElements.get("signal-button"), "custom element is defined");

    await render(hbs`<SignalButton>Hi</SignalButton>`);
    assert.dom("signal-button").exists();
  });
});
