import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
    gsap.registerPlugin(ScrollTrigger);
  }

  createLuffyAnimation(): void {
    const timeline = gsap.timeline();
    timeline.to(SELECTORS.luffyJump, { y: -100, x: 100, delay: 1.5, duration: 1 });
    timeline.to(SELECTORS.luffyJump, { x: 300, rotation: 360, duration: 1 });
    timeline.to(SELECTORS.luffyJump, { x: 600, rotation: 720, duration: 2 });
    timeline.to(SELECTORS.luffyJump, {
      y: 0, x: 700, rotation: 1080, duration: 1,
      onUpdate: () => {
        this.updateImageSelector(SELECTORS.luffyJump, './assets/images/luffy_gear5_png1.gif');
      },
      transform: "scale(3)",
      onComplete: () => {
        this.updateStyleSelector(SELECTORS.luffyJump, 'display: none !important;');
        this.addClassSelector(SELECTORS.home, 'bg-[url("../../../../../assets/images/luffy_gear5.gif")]');
        this.updateStyleSelector(SELECTORS.home, 'background-size: cover;');
        this.setupScrollAnimation(timeline);
      },
    });
  }

  private setupScrollAnimation(timeline: GSAPTimeline): void {
    ScrollTrigger.create({
      trigger: SELECTORS.home,
      start: "100px top",
      end: "-300px bottom",
      endTrigger: SELECTORS.homeSection,
      once: true,
      scrub: false,
      onUpdate: () => {
        this.updateImageSelector(SELECTORS.luffyJump, './assets/images/luffy_gear5_png2.gif');
        this.updateStyleSelector(SELECTORS.luffyJump, 'display: block !important;');
        timeline.to(SELECTORS.luffyJump,
          { y: 250, x: 700, duration: 1, yoyo: true, repeat: 2, }
        );
        timeline.to(SELECTORS.luffyJump, {
          y: 350, x: 450, duration: 1, transform: "scale(1.5)",
          onComplete: () => {
            this.updateStyleSelector(SELECTORS.luffyJump, 'display: none !important;');
            this.addClassSelector(SELECTORS.homeSection, 'bg-[url("../../../../../assets/images/luffy_gear5.gif")]');
            this.updateStyleSelector(SELECTORS.homeSection, 'background-size: cover;');
          }
        })
      },
    });
  }

  updateImageSelector(selector: string, value: string): void {
    const element = document.querySelector(selector);
    if (element) {
      this.renderer.setAttribute(element, 'src', value);
    }
  }

  updateStyleSelector(selector: string, value: string): void {
    const element = document.querySelector(selector);
    if (element) {
      this.renderer.setAttribute(element, 'style', value);
    }
  }

  addClassSelector(selector: string, value: string): void {
    const element = document.querySelector(selector);
    if (element) {
      this.renderer.addClass(element, value);
    }
  }
}

const SELECTORS = {
  luffyJump: '.luffy-jump',
  home: '.home',
  homeSection: '.home-section',
};
