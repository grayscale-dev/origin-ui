import type { Config } from "@stencil/core";
import { angularOutputTarget } from "@stencil/angular-output-target";
import { reactOutputTarget } from "@stencil/react-output-target";
import { vueOutputTarget } from "@stencil/vue-output-target";

export const config: Config = {
  namespace: "signal-ui",
  buildEs5: "prod",
  globalStyle: "src/global/app.css",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "dist-custom-elements",
      dir: "dist/custom-elements",
      externalRuntime: false
    },
    reactOutputTarget({
      stencilPackageName: "@signal-ui/core",
      outDir: "../react/src",
      esModules: true,
      customElementsDir: "dist/custom-elements"
    }),
    vueOutputTarget({
      componentCorePackage: "@signal-ui/core",
      proxiesFile: "../vue/src/components.ts",
      includeDefineCustomElements: true
    }),
    angularOutputTarget({
      componentCorePackage: "@signal-ui/core",
      directivesProxyFile: "../angular/src/directives/proxies.ts",
      directivesUtilsFile: "../angular/src/directives/utils.ts",
      directivesArrayFile: "../angular/src/directives/index.ts",
      customElementsDir: "dist/custom-elements"
    }),
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null
    }
  ],
  testing: {
    browserHeadless: true
  }
};
