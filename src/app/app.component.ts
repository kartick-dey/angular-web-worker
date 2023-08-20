import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-web-worker';

  public loader: boolean = false;
  public result: string = '';
  public sliderTranslate = 'translateX(0px)';
  private animation = {
    translate: 0,
    rightDirection: true,
  };

  public worker;

  constructor() {
    this.worker = new Worker(new URL('./app-worker.worker', import.meta.url));
  }
  ngOnInit(): void {
    this.worker.onmessage = ({ data }) => {
      this.result = data;
    };
  }

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

    this.sliderTranslate = `translateX(${this.animation.translate}px)`;
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  public enable() {
    // this.result = longOps(2500);
    this.worker.postMessage(2500)
  }
}
