import { CommonModule } from "@angular/common";
import { CustomEditorComponent } from "./custom-editor.component";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [CustomEditorComponent],
    imports:   [CommonModule],
    exports: [CustomEditorComponent]
  })
  export class CustomEditorModule { }