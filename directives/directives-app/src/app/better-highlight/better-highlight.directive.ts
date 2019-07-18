import { ElementRef, HostListener, HostBinding, Directive, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue'; //O mesmo nome do selector é o nome do componente então você pode usar ele inserindo valores default

  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    //this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'transparent'); Pode ser feito dessa maneira

    this.backgroundColor = this.defaultColor; //Ou dessa maneira
  }
}
