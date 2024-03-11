import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { CustomEditorComponent } from './editor/custom-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomEditorComponent],
  template: `
    <h1>Text Editor example</h1>
    <app-custom-editor />
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
