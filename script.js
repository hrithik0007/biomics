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
    .to(".ball04, .text03", { autoAlpha: 1, duration: 0.5 }, 3.01);

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
        end: () => "+=" + window.innerHeight * 2,
        markers: false,
        pin: true,
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
























     

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector('#smooth-content'),
    smooth: false,
    multiplier: 1.5,
    lerp: 0.1
  });


  // Set up ScrollTrigger proxy for Locomotive Scroll
  ScrollTrigger.scrollerProxy("#smooth-content", {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector("#smooth-content").style.transform ? "transform" : "fixed"
  });


  // Grid animation
  const gridTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".svg2-container",
      scroller: "#smooth-content",
      scrub: true,
      start: "top 80%",
      end: "center 60%",
      markers: false,
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
    scale: 1/4,
    scrollTrigger: {
      trigger: ".smooth-sec-two",
      scroller: "#smooth-content",
      scrub: true
    }
  });

  // Horizontal scroll animation
  const pinSection = document.querySelector(".smooth-sec-three");
  const pinContent1 = document.querySelector(".carousel-one");
  const pinContent2 = document.querySelector(".carousel-two");

  const pinTl = gsap.timeline({
    scrollTrigger: {
      trigger: pinSection,
      scroller: "#smooth-content",
      pin: true,
      start: "top top",
      end: () => `+=${pinContent1.offsetWidth - window.innerWidth}`,
      scrub: true,
      invalidateOnRefresh: true,
      pinSpacing: false
    }
  });

  pinTl.to(".carousel-one", {
    x: () => -(pinContent1.offsetWidth - window.innerWidth),
    ease: "none"
  }, 0);

  pinTl.to(".carousel-two", {
    x: () => pinContent2.offsetWidth - window.innerWidth,
    ease: "none"
  }, 0);

  // Update ScrollTrigger when Locomotive Scroll updates
  scroll.on("scroll", ScrollTrigger.update);

  // Update Locomotive Scroll when window resizes
  ScrollTrigger.addEventListener("refresh", () => scroll.update());

  // Refresh ScrollTrigger after everything is set up
  ScrollTrigger.refresh();

  // Handle window resize
  window.addEventListener('resize', () => {
    // Debounce the resize event
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(() => {
      scroll.update();
      ScrollTrigger.refresh();
    }, 250);
  });
});

// Optionally, refresh ScrollTrigger after all content is loaded
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});






