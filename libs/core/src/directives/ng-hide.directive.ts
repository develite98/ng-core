import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({ selector: '[ngHide]' })
export class NgHideDirective<T = unknown> {
  /**
   * The Boolean expression to evaluate as the condition for setting the display style.
   */
  @Input()
  public set ngHide(condition: T) {
    const element: HTMLElement = this.elementRef.nativeElement as HTMLElement;

    if (condition) {
      this.renderer.setStyle(element, 'display', 'none');
    } else {
      this.renderer.removeStyle(element, 'display');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
