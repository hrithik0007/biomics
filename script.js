import { Pane } from 'https://cdn.skypack.dev/tweakpane'
import Splitting from 'https://cdn.skypack.dev/splitting'

const result = Splitting()
document.documentElement.style.setProperty(
  '--char-total',
  result[0].chars.length
)
document.documentElement.style.setProperty(
  '--word-total',
  result[0].words.length
)
// Insert Zzz after last word if you can...


const CTRL = new Pane({
  title: 'Config',
  expanded: true,
})

const CONFIG = {
  pixels: 80,
  padding: 100,
  delay: 0.25,
  blur: 6,
  x: 0,
  y: -75,
  theme: 'system',
  entity: 'character',
}

CTRL.addBinding(CONFIG, 'pixels', {
  min: 1,
  max: 500,
  step: 1,
  label: 'Pixels per Character',
})
CTRL.addBinding(CONFIG, 'padding', {
  min: 0,
  max: 500,
  step: 1,
  label: 'Scroll Padding',
})
CTRL.addBinding(CONFIG, 'entity', {
  options: {
    Character: 'character',
    Word: 'word',
  },
  label: 'Entity',
})
CTRL.addBinding(CONFIG, 'delay', {
  min: 0,
  max: 1,
  step: 0.01,
  label: 'Delay Multiplier',
})
CTRL.addBinding(CONFIG, 'blur', {
  min: 0,
  max: 50,
  step: 1,
  label: 'Blur (px)',
})
CTRL.addBinding(CONFIG, 'x', {
  min: -250,
  max: 250,
  step: 1,
  label: 'X (%)',
})
CTRL.addBinding(CONFIG, 'y', {
  min: -250,
  max: 250,
  step: 1,
  label: 'Y (%)',
})
CTRL.addBinding(CONFIG, 'theme', {
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
  },
  label: 'Theme',
})

const sync = () => {
  document.documentElement.dataset.theme = CONFIG.theme
  document.documentElement.style.setProperty(
    '--pixels-per-character',
    CONFIG.pixels
  )
  document.documentElement.dataset.entity = CONFIG.entity
  document.documentElement.style.setProperty('--delay-multiplier', CONFIG.delay)
  document.documentElement.style.setProperty('--scroll-padding', CONFIG.padding)
  document.documentElement.style.setProperty('--blur', CONFIG.blur)
  document.documentElement.style.setProperty('--x', CONFIG.x)
  document.documentElement.style.setProperty('--y', CONFIG.y)
}

const handle = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'Theme'
  )
    return sync()
  document.startViewTransition(() => sync())
}

CTRL.on('change', handle)
sync()
















gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize" });

gsap.defaults({ease: "none"});

  



const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".what", // The section that triggers the animation
    scrub: true,
    start: "top 10%",
    end: "bottom top",  // Animation ends before the `.products` section starts
    pin: true,          // Pin the `.what` section during the animation
    pinSpacing: true,  // Avoid additional spacing after pinning
    //markers: true, 
  },
});


tl.fromTo(
    " .whatcard", // Target another element
    {
      opacity: 0, // Start with hidden opacity
      y: -200, // Start from the left
    },
    {
      opacity: 1, // Fade in
      y: 0, // Move to the final position
      duration: 1.5, // Duration of the animation
      ease: "power1.out", // Easing function
    },
    "<" // Sync with the start of the previous animation
  )









    // GSAP Timeline for Pulses
    const pulses = gsap.timeline({
      defaults: {
        scale: 2,
        autoAlpha: 1,
        transformOrigin: 'center',
        ease: "elastic(2.5, 1)",
      }
    })
    .from(".text01", { autoAlpha: 0, duration: 1, ease: "none" }, 0)
    .to(".ball02, .text01", { autoAlpha: 1, duration: 0.5 }, 0.93)
    .to(".ball03, .text02", { autoAlpha: 1, duration: 0.5 }, 1.93)
    .to(".ball04, .text03", { autoAlpha: 1, duration: 0.5 }, 3.01)
  
    ;

    const svgPath = document.querySelector(".theLine");
    const pathLength = svgPath.getTotalLength();
    
    // Initialize the dash array for drawing the path
    gsap.set(svgPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    // Main GSAP Timeline
    const main = gsap.timeline({
      scrollTrigger: {
        trigger: ".products",
        scrub: true,
        start: "top top",
        end: () => "+=" + window.innerHeight * 0.7,
        markers: false,
        pin: true,
        pinSpacing: false,
      }
    })
    .to(svgPath, { strokeDashoffset: 0, duration: 4 }, 0) // Draw the path
    .to(".ball01", {
      duration: 4,
      onUpdate: function () {
        const progress = this.progress();
        const point = svgPath.getPointAtLength(pathLength * progress);
        console.log(`Progress: ${progress}, X: ${point.x}, Y: ${point.y}`); // Log path points
       gsap.set(".ball01", { x: point.x - 300, y: point.y -186 }); // Temporarily remove offsets for debugging
        
      }
    }, 0)
    .add(pulses, 0);






















    // Initially position `ball01` at the start of the path
    const startPos = svgPath.getPointAtLength(0);
     //gsap.set(".ball01", { x: startPos.x - 24, y: startPos.y - 24 });
     gsap.set(".ball01", { x: 300 -300, y: 50 -150 });

     console.log(`Initial Point: X: ${startPos.x}, Y: ${startPos.y}`);
























     

    
      // Grid animation
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pub-grid",
          scrub: true,
          start: "top 80%",
          end: "center 60%",
          // markers: true,
          onUpdate: (self) => {
            // Manually update the progress of the animation
            if (self.progress === 1) {
              gridTl.progress(1);
            }
          }
        },
        defaults: {
          ease: "power1.inOut"
        }
      });
    
      gridTl.add("start")
        .from(".pub-grid-container", {
          ease: "power1",
          scale: 3
        }, "start")
        .from(".gridview .gridcard", {
          duration: 0.6,
          xPercent: (_, i) => -((i + 1) * 40 + i * 100),
          yPercent: (_, i) => (i + 1) * 40 + i * 100
        }, "start")
        .from(".gridview3 .gridcard", {
          duration: 0.6,
          xPercent: (_, i) => (i + 1) * 40 + i * 100,
          yPercent: (_, i) => (i + 1) * 40 + i * 100
        }, "start");
    
      // Scale animation
      gsap.from(".smooth-sec-two", {
        scale: 0.25,
        scrollTrigger: {
          trigger: ".smooth-sec-two",
          scrub: true,
          start: "top bottom",
          end: "top top",
          // markers: true,
        }
      });
    
    //  
    



