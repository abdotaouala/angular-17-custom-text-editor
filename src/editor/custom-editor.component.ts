import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { EditorOptions } from './editor-options.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-editor',
  standalone: true,
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.css'],
  imports: [CommonModule]
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
    this.emitText();
  }

  applyParagraphStyle(tag: string): void {
    document.execCommand('formatBlock', false, tag);
    this.updateActiveButtons();
    this.emitText();
  }

  applyHeadingStyle(tag: string): void {
    document.execCommand('formatBlock', false, tag);
    this.updateActiveButtons();
    this.emitText();
  }

  updateContent(event: any): void {
    // You can add additional functionalities here
    // For example, you can save the content to a variable for further processing.
    this.emitText();
  }
  toggleActive(button: HTMLElement): void {
    button.classList.toggle('active');
    this.updateActiveButtons();
    this.emitText();
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
    this.emitText();
  }
  changeTextSize(size: string): void {
    document.execCommand('fontSize', false, size);
    this.updateActiveButtons();
    this.emitText();
  }

  changeTextColor(event: any = ''): void {
    document.execCommand('foreColor', false, event.target.value);
    this.updateActiveButtons();
    this.emitText();
  }
  applyNumberedListStyle(): void {
    document.execCommand('insertOrderedList', false, undefined);
    this.updateActiveButtons();
    this.emitText();
  }

  rollback(): void {
    document.execCommand('undo', false, undefined);
    this.emitText();
  }

  emitText(): void {
    console.log(this.editorContent)
    const text = this.editorContent?.nativeElement?.innerText;
    
    if (text) {
        alert(text);
        this.textChange.emit(text);
    }
  }
}
