import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'angular-web-worker';

  public loader: boolean = false;
  public result: string = '';
  public sliderTranslate = 'translateX(0px)';
  private animation = {
    translate: 0,
    rightDirection: true,
  };

  ngAfterViewInit(): void {
    // implementated animations
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  private animateFrame() {
    const divSec = document.getElementById(
      'containerSliderSection'
    ) as HTMLElement;
    this.animation.translate = this.animation.rightDirection
      ? this.animation.translate + 5
      : this.animation.translate - 5;
    if (this.animation.translate > divSec?.clientWidth - 40) {
      this.animation.rightDirection = false;
    } else if (this.animation.translate < 0) {
      this.animation.rightDirection = true;
    }
    console.log('this.animation.translate:', this.animation);

    this.sliderTranslate = `translateX(${this.animation.translate}px)`;
    console.log('this.sliderTranslate:', this.sliderTranslate);
    requestAnimationFrame(this.animateFrame.bind(this));
  }
}
