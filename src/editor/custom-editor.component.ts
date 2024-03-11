import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-custom-editor',
  standalone: true,
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.css'],
})
export class CustomEditorComponent {
  @ViewChild('editorContent') editorContent!: ElementRef;

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
}
