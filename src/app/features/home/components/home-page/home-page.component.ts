import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline();
    timeline.to(".luffy-jump", { y: -100,  x: 100, delay:1.5, duration: 1});
    timeline.to(".luffy-jump", { x: 300, rotation: 360, duration: 1});
    timeline.to(".luffy-jump", { x: 600, rotation: 720, duration: 2});
    timeline.to(".luffy-jump", { y: 0,  x: 700, rotation: 1080, duration: 1,
      onUpdate: () => {
        document.querySelector('.luffy-jump img')?.setAttribute('src', './assets/images/luffy_gear5_png3.gif');
      },
      transform: "scale(3)",
      onComplete: () => {
        document.querySelector('.luffy-jump')?.setAttribute('style', 'display: none;');
        document.querySelector('.home')?.classList.add('bg-[url("../../../../../assets/images/luffy_gear6.gif")]');
        document.querySelector('.home')?.setAttribute('style', 'background-size: cover;');
        ScrollTrigger.create({
          trigger: ".home",
          start: "100px top",
          end: "-300px bottom",
          endTrigger: ".home-section",
          once: true,
          // pin: true,
          // markers: true,
          // animation: timeline,
          scrub: false,
          onUpdate: () => {
            document.querySelector('.luffy-jump img')?.setAttribute('src', './assets/images/luffy_gear5_png2.gif');
            document.querySelector('.luffy-jump')?.setAttribute('style', 'display: block;');
            timeline.to(".luffy-jump", 
              { y: 250, x: 700, duration: 1, yoyo:true, repeat: 2,}
            );
            // timeline.to(".luffy-jump", 
            //   { y: 100, x: 750, rotation: 360, duration: 1}
            // );
            timeline.to(".luffy-jump", {
              y: 350, x: 450, duration: 1, transform: "scale(1.5)",
              onComplete: () => {
                document.querySelector('.luffy-jump')?.setAttribute('style', 'display: none !important;');
                document.querySelector('.home-section')?.classList.add('bg-[url("../../../../../assets/images/luffy_gear5.gif")]');
                document.querySelector('.home-section')?.setAttribute('style', 'background-size: cover;');
              }
            })
          },
        });
      }
    });
  }

}
