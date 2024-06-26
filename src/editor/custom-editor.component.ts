import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { EditorOptions } from './editor-options.interface';

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.css'],
})
export class CustomEditorComponent {
  @ViewChild('editorContent') editorContent!: ElementRef;

  defaultEditorOptions: EditorOptions = {
    bold: true,
    italic: true,
    underline: true,
    paragraph: true,
    heading: true,
    bulletedList: true,
    textSize: true,
    textColor: true,
    numberedList: true,
  };
  @Input() editorOptions: EditorOptions = this.defaultEditorOptions;

  @Output() textChange = new EventEmitter<string>();

  mergedEditorOptions: EditorOptions = this.defaultEditorOptions;

  constructor(){
    this.mergedEditorOptions = { ...this.defaultEditorOptions, ...this.editorOptions };

  }
  ngOnChanges(): void {
    // Merge default options with custom options whenever editorOptions input changes
    this.mergedEditorOptions = { ...this.defaultEditorOptions, ...this.editorOptions };
  }

  
  applyStyle(style: string): void {
    document.execCommand(style, false, undefined);
    this.updateActiveButtons();
  }

  applyParagraphStyle(tag: string): void {
    document.execCommand('formatBlock', false, tag);
    this.updateActiveButtons();
  }

  applyHeadingStyle(tag: string): void {
    document.execCommand('formatBlock', false, tag);
    this.updateActiveButtons();
  }

  updateContent(event: any): void {
    // You can add additional functionalities here
    // For example, you can save the content to a variable for further processing.
    this.textChange.emit(event.target.innerHTML);
  }
  toggleActive(button: HTMLElement): void {
    button.classList.toggle('active');
    this.updateActiveButtons();
  }

  updateActiveButtons(): void {
    const buttons = document.querySelectorAll('.editor-toolbar button');
    buttons.forEach((button) => {
      const command = button.getAttribute('data-command');
      if (command) {
        const isActive = document.queryCommandState(command);
        if (isActive) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      }
    });
  }

  applyListStyle(command: string): void {
    document.execCommand(command, false, undefined);
    this.updateActiveButtons();
  }
  changeTextSize(size: string): void {
    document.execCommand('fontSize', false, size);
    this.updateActiveButtons();
  }

  changeTextColor(event: any = ''): void {
    document.execCommand('foreColor', false, event.target.value);
    this.updateActiveButtons();
  }
  applyNumberedListStyle(): void {
    document.execCommand('insertOrderedList', false, undefined);
    this.updateActiveButtons();
  }

  rollback(): void {
    document.execCommand('undo', false, undefined);
  }

}
