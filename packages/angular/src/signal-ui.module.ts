import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DIRECTIVES } from "./directives";

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignalUiModule {}
