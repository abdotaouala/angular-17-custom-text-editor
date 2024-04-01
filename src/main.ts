import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { CustomEditorModule } from './editor/custom-editor.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomEditorModule],
  template: `
    <app-custom-editor (textChange)="text=$event"/>
  `,
})
export class App {
  text = '';
}

bootstrapApplication(App);
