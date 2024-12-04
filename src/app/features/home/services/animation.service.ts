import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    gsap.registerPlugin(ScrollTrigger);
  }

  createLuffyAnimation(): void {
    const timeline = this.animateLuffyJump();
    timeline.to(SELECTORS.luffyJump, {
      y: 0,
      x: 700,
      rotation: 1080,
      duration: 1,
      onUpdate: () => {
        this.updateElementAttribute(SELECTORS.luffyJump + ' img', 'src', IMAGE_PATHS.luffyJump1);
      },
      transform: 'scale(3)',
      onComplete: () => {
        this.updateElementStyle(SELECTORS.luffyJump, 'display: none !important;');
        this.toggleClass(SELECTORS.home, IMAGE_PATHS.gear6);
        this.updateElementStyle(SELECTORS.home, 'background-size: cover;');
        this.setupScrollAnimation();
      },
    });
  }

  private setupScrollAnimation(): void {
    this.createScrollTrigger(SELECTORS.home, {
      start: '100px top',
      end: '-300px bottom',
      once: true,
      onUpdate: () => {
        this.updateElementAttribute(SELECTORS.luffyJump + ' img', 'src', IMAGE_PATHS.luffyJump2);
        this.updateElementStyle(SELECTORS.luffyJump, 'display: block !important;');
        const timeline = gsap.timeline();
        timeline
          .to(SELECTORS.luffyJump, { y: 250, x: 700, duration: 1, yoyo: true, repeat: 2 })
          .to(SELECTORS.luffyJump, {
            y: 350,
            x: 450,
            duration: 1,
            transform: 'scale(1.5)',
            onComplete: () => {
              this.updateElementStyle(SELECTORS.luffyJump, 'display: none !important;');
              this.toggleClass(SELECTORS.homeSection, IMAGE_PATHS.gear5);
              this.updateElementStyle(SELECTORS.homeSection, 'background-size: cover;');
            },
          });
      },
    });
  }

  private animateLuffyJump(): GSAPTimeline {
    return gsap.timeline()
      .to(SELECTORS.luffyJump, { y: -100, x: 100, delay: 1.5, duration: 1 })
      .to(SELECTORS.luffyJump, { x: 300, rotation: 360, duration: 1 })
      .to(SELECTORS.luffyJump, { x: 600, rotation: 720, duration: 2 });
  }

  private createScrollTrigger(trigger: string, config: Partial<ScrollTrigger.Vars>): void {
    ScrollTrigger.create({
      trigger,
      scrub: true,
      ...config,
    });
  }

  private getElement(selector: string): HTMLElement | null {
    return document.querySelector(selector);
  }

  private updateElementAttribute(selector: string, attribute: string, value: string): void {
    const element = this.getElement(selector);
    if (element) {
      this.renderer.setAttribute(element, attribute, value);
    }
  }

  private updateElementStyle(selector: string, style: string): void {
    const element = this.getElement(selector);
    if (element) {
      this.renderer.setAttribute(element, 'style', style);
    }
  }

  private toggleClass(selector: string, className: string, add: boolean = true): void {
    const element = this.getElement(selector);
    if (element) {
      add ? this.renderer.addClass(element, className) : this.renderer.removeClass(element, className);
    }
  }
}

const SELECTORS = {
  luffyJump: '.luffy-jump',
  home: '.home',
  homeSection: '.home-section',
} as const;

const IMAGE_PATHS = {
  luffyJump1: './assets/images/luffy_gear5_png3.gif',
  luffyJump2: './assets/images/luffy_gear5_png2.gif',
  gear6: 'bg-[url("../../../../../assets/images/luffy_gear6.gif")]',
  gear5: 'bg-[url("../../../../../assets/images/luffy_gear5.gif")]',
} as const;
//bg-[url("../../../../../assets/images/luffy_gear6.gif")]