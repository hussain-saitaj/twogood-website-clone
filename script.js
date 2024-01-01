
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


window.onload = function() { 
    gsap.fromTo("header", 
    {
        opacity: 0, 
        y: -25
    }, 
    {
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: "power2.out"
    });
    gsap.fromTo("h1", 
    {
        opacity: 0, 
        y: 200
    }, 
    {
        opacity: 1, 
        y: 0, 
        stagger:0.4,
        duration: 0.75, 
        ease: "power2.out"
    });
}

const circleText = new CircleType(document.getElementById('circle'));
gsap.fromTo("#circle", 
{
    scale:1,
}, 
{
    scale:0.5
});
var tl = new TimelineMax({repeat:-1});
tl.to("#circle",8, {rotation:360, ease:Linear.easeNone});

document.querySelectorAll('.container').forEach((container,index) => {
    container.addEventListener('mouseenter', () => {
       gsap.to('#hover',{
              scale: 0,
              opacity:1
         })
       });
    container.addEventListener('mouseleave', () => {
         gsap.to('#hover',{
                  scale: 0,
                  opacity:0
            })
         });
    container.addEventListener('mousemove', (dets) => {
        gsap.to('#hover',{
            scale:2,
            opacity:0.7,
            left: dets.x-70,
            top: dets.y+2200 + index*750,
        })
    });
});

var comments = {
    "cartier": "THANK YOU SO MUCH FOR THE BEAUTIFUL CATERING; IT MEANS A LOT WORKING WITH A COMPANY SUCH AS TWO GOOD CO.",
    "felicity": "THE HAMPERS WE ORDERED WERE LOVELY AND THE TEAM ARE WONDERFUL TO LIAISE WITH",
    "barbara": "MY PACKAGE JUST ARRIVED AND THE PRESENTATION IS SO BEAUTIFUL; ELEGANT, MAGICAL AND MEANINGFUL, WITH THE ITEMS WRAPPED IN DELICIOUS-SMELLING TISSUE PAPER. GORGEOUS; WILL BE BACK FOR MORE",
    "salesforce": "I THINK I SPEAK FOR EVERYONE WHEN I SAY WE ARE VERY GRATEFUL TO HAVE BEEN ABLE TO COME IN AND HELP OUT FOR THE DAY; THE WORK YOU DO IS AMAZING.",
    "benita": "EVERYONE AT TWO GOOD ARE LOVELY TO WORK WITH. CATERING WAS EXCELLENT AND WELL PRICED, ALL FOR A GOOD CAUSE... WHAT'S NOT TO LOVE?",
    "richard": "MY CEO ASKED ME WHO I HAD USED FOR THE CATERING; WHEN I EXPLAINED ABOUT TWO GOOD, SHE SAID \"OH, THAT’S WHY - THE FOOD IS MADE WITH LOVE.\"",
}


  
  function loadComment(key,index) {
    var commentContainer = document.getElementById("comment-content");
    document.querySelectorAll(".custom-radio").forEach((element) => {
      element.classList.remove("active");
    });
    var element = document.querySelectorAll(".custom-radio")[index];
    element.classList.add("active");
    commentContainer.innerHTML = "";
    var div = document.createElement("div");
    div.innerHTML = comments[key];
    commentContainer.appendChild(div);
      let childSplit = new SplitType(div);
      gsap.from(childSplit.lines, {
        duration: 0.9,
        yPercent: 100,
        ease: "power2.In",
        stagger: 0.1
      });
  }
  
  function translateContent(activeIndex) {
    Object.keys(comments).forEach((key, index) => {
      var item = document.getElementById(key);

      let position = index - activeIndex + 3;
      if (position < 1) position += 6;
      if (position > 6) position -= 6;
      
    gsap.to(item, { order: position, duration: 0.2,ease: "power4.In",
    stagger: 0.05 });
    });
  }
  

function loadComments() {

    Object.keys(comments).forEach((key,index) => {
        var element = document.getElementById(key);
        if (element) {
            element.addEventListener("click", () => {
                    translateContent(index);
                    loadComment(key,index);
            });
        }
    });
}
loadComments();
let observer = new IntersectionObserver((entries, observer) => { entries.forEach((entry) => { if (entry.isIntersecting) { Aos.refresh(); } }); }); 
document.querySelectorAll('[data-aos]').forEach((aosElem) => { observer.observe(aosElem); });

// gsap.registerPlugin(ScrollTrigger);
// gsap.fromTo(
//     ".logo",
//     {
//       opacity: 0,
//       y: -25
//     },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 0.2,
//       scrollTrigger: {
//         trigger: ".logo",
//         start: "bottom 10%", // Start the animation when the top of ".logo" is at the middle of the viewport
       
//         scrub: true // Optionally, make the animation smooth and based on scroll position
//       }
//     }
//   );
  







