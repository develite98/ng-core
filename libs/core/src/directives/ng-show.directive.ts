import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({ selector: '[ngShow]' })
export class NgShowDirective<T = unknown> {
  /**
   * The Boolean expression to evaluate as the condition for setting the display style.
   */
  @Input()
  public set ngShow(condition: T) {
    const element: HTMLElement = this.elementRef.nativeElement as HTMLElement;

    if (condition) {
      this.renderer.removeStyle(element, 'display');
    } else {
      this.renderer.setStyle(element, 'display', 'none');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
