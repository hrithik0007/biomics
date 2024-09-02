import { Pane } from 'https://cdn.skypack.dev/tweakpane'
import Splitting from 'https://cdn.skypack.dev/splitting'









document.querySelector('.menu').addEventListener('click', function() {
  document.querySelector('.header__nav').classList.toggle('active');
});




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
    start: "top center",
    end: "center center",  // Animation ends before the `.products` section starts
   
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
        //  scale: 2,
        autoAlpha: 0,

        transformOrigin: 'center',
        ease: "elastic(2.5, 1)",
      }
    })
    .from(".text01", { autoAlpha: 1, duration: 1, ease: "none" , x: -1800,  }, 0)
    .from(".cardimage", { autoAlpha: 1, duration: 1, ease: "none" , x: 1200,  }, 0) // Initial fade-in of text01
  .to(".ball02", { autoAlpha: 1, duration: 0.5 ,scale: 2}, 0.93) // ball02 and text01 appear

  // Text01 fades out as pro fades in when ball03 appears
  .to(".ball03", { autoAlpha: 1, duration: 0.5, scale: 2 }, 1.93) // ball03 appears
  .fromTo(".text01, .cardimage", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 }, 1.93) // text01 fades out
  .fromTo(".pro , .cardimage2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.93) // pro fades in

  // pro fades out as proo fades in when ball04 appears
  .to(".ball04", { autoAlpha: 1, duration: 0.5 , scale: 2}, 3.01) // ball04 appears
  .fromTo(".pro , .cardimage2", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 }, 3.01) // pro fades out
  .fromTo(".proo  , .cardimage3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 3.01); // proo fades in
  
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
        pinSpacing: true,
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












    gsap.from(".doctor", {
      x: 800,
      scrollTrigger: {
        trigger: ".contactus-card2",
        start: "top bottom",
        end: "bottom 70%",
        scrub: true,
        //markers: true,
      }
    });
    











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
          start: "top 50%",
          end: "center 30%",
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
    
      // // Scale animation
      // gsap.from(".smooth-sec-two", {
      //   scale: 0.25,
      //   scrollTrigger: {
      //     trigger: ".smooth-sec-two",
      //     scrub: true,
      //     start: "top bottom",
      //     end: "top top",
      //     // markers: true,
      //   }
      // });
    
    //  
    




    gsap.to(".wcard-flip", {
      scrollTrigger: {
        trigger: ".wcard-flip",
        start: "top center",
        end: "bottom center",
        scrub: true,
        onEnter: () => {
          // Add the class to trigger the flip
          document.querySelector(".wcard-flip").classList.add("flip-active");
        },
        onLeaveBack: () => {
          // Remove the class to reverse the flip
          document.querySelector(".wcard-flip").classList.remove("flip-active");
        }
      }
    });
    
    

gsap.fromTo(".contactus-card", 
  { opacity: 0 ,scale: 0.1, rotate: 0, y: 50}, // Start with full visibility
{
opacity: 1, // Fade out to 0 opacity
duration: 1,
scale: 1,
scrollTrigger: {
  trigger: ".contactus-card",
  start: "top bottom",
  end: "center 75%",
  scrub: true, // Enables smooth transition based on scroll position
 // markers: true,
  
}
}
);









let ball1 = gsap.timeline({ repeat: -1})
let ball2 = gsap.timeline({ repeat: -1})
let ball3 = gsap.timeline({ repeat: -1})
ball1.to('#bola1', { x: 157, duration: 0.9, ease: "none"  }  )
        .to('#bola1', { x:170,y: -80 , duration: 0.9, ease: "none" })
        .to('#bola1', { x: 355 , duration: 1, ease: "none" })
        .to('#bola1', { x: 360, y: -50 , duration: 0.5, ease: "none" })
        .to('#bola1', { x: 365, y:-47, duration: 0.2, ease: "none" })
        .to('#bola1', { x: 450, duration: 0.9, ease: "none" })


ball2.to('#bola2', { x: 150, duration: 0.7, ease: "none",  }  )
.to('#bola2', { x: 155, y:-30, duration: 0.5, ease: "none",  }  )
.to('#bola2', { x: 333, duration: 0.9, ease: "none",  }  )
.to('#bola2', { x: 350, y:-110, duration: 0.6, ease: "none",  }  )
.to('#bola2', { x: 450, y:-111, duration: 0.9, ease: "none",  }  )

ball3.to('#bola3', { x: 152, duration: 0.9, ease: "none",  }  ).to('#bola3', { x: 165,y:80, duration: 0.7, ease: "none",  }  ).to('#bola3', { x: 330, duration: 0.6, ease: "none",  }  )
.to('#bola3', { x: 350,y:165, duration: 0.7, ease: "none",  } ).to('#bola3', { x: 450, duration: 0.9, ease: "none",  }  )




// const tl3 = gsap.from('.box', {
//   duration: 1.5, 
//   stagger: 0.75,
//   yPercent: 100, 
//   opacity: 0
// })

// ScrollTrigger.create({
//   animation: tl3,
//   trigger: '.wrapper',
//    //markers: true,
//   start: 'top center',
//   end: "bottom bottom",
//   scrub: 1,
//   pin: '.wrapper',
//   // pinSpacing: false
// })


    const tl4 = gsap.fromTo(
      ".features-card-left",
      {
        // Initial state
        opacity: 0,
        scale: 0.5,
        xPercent: -100,
        yPercent: -100,
        rotateZ: 0,
      },
      {
        // Animated state
        opacity: 1,
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        
        duration: 2,
        ease: "power1.out",
        
      }
    )
    const tl5 = gsap.fromTo(
      ".features-card-right",
      {
        // Initial state
        opacity: 0,
        scale: 0.5,
        xPercent: 100,
        yPercent: 100,
        rotateZ: 0,
      },
      {
        // Animated state
        opacity: 1,
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        
        duration: 2,
        ease: "power1.out",
        
      }
    )
   // Create a master timeline
const masterTimeline = gsap.timeline();

// Add tl4 and tl5 to the master timeline
masterTimeline.add(tl4, 0).add(tl5, 0);

// Create ScrollTrigger for the master timeline
ScrollTrigger.create({
  animation: masterTimeline,
  trigger: ".features-container",
  start: "top 90%", // Animation starts when card enters 90% of the viewport
  end: "bottom 90%", // Animation ends when card leaves 90% of the viewport
  scrub: true, // Sync animation with the scrollbar
  // markers: true, // Uncomment to see markers in production
});
































document.querySelectorAll('.question-container').forEach(function(question) {
  question.addEventListener('click', function() {
    // Check if the clicked question is already active
    const isActive = this.classList.contains('active');

    // Remove active class and reset icons from all questions
    document.querySelectorAll('.question-container').forEach(function(q) {
      q.classList.remove('active');
      var icon = q.querySelector('.question-icon');
      icon.src = q.getAttribute('data-icon'); // Reset to default icon
    });

    // Hide all answers
    document.querySelectorAll('.right-innerr-container').forEach(function(answer) {
      answer.classList.remove('active');
    });

    if (!isActive) {  // Only proceed to show if the clicked question wasn't already active
      // Get the corresponding answer element
      var answerId = this.getAttribute('data-answer');
      var answerElement = document.getElementById(answerId);

      // Show the corresponding answer
      if (answerElement) {
        answerElement.classList.add('active');
      }

      // Activate the clicked question and update its icon
      this.classList.add('active');
      var icon = this.querySelector('.question-icon');
      icon.src = this.getAttribute('data-active-icon'); // Set to active icon
    }
  });
});







const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 200;
    if (count < target) {
      counter.innerText = `${Math.ceil(count + increment)}`;
      setTimeout(updateCounter, 1);
    } else counter.innerText = target;
  };
  updateCounter();
});








