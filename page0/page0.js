
import { Page }     from '/lib/page_builder.js'
import { TextAnim } from '/lib/text_anim.js';
import { Particle, Verlet, Paper, subVector, scaleVector, addVector } from '/lib/svg.js';
import { DotLottie, DotLottieWorker  } from "https://esm.sh/@lottiefiles/dotlottie-web";

const PAGE0_BUILDER = new Page(0);
PAGE0_BUILDER.pd             = {
    holder  : document.querySelector('#i0'),
    includer: document.querySelector('#page0include'),
    intro_title: document.querySelector("#intro_title"),
    name_title : document.querySelector('#name_title'),
    name_title1: document.querySelector('#name_title1'),
    particle_intro0: document.querySelector('#particle_intro0'),
    particle_intro1: document.querySelector('#particle_intro1'),
    particle_intro2: document.querySelector('#particle_intro2'),
    particles_p_div: document.querySelector("#particles_intro"),
    particles_div  : document.querySelectorAll(".particle_intro"),
    random_nr      : document.querySelector('#random_nr'),
    random_nr1      : document.querySelector('#random_nr1'),
    lottie_anim     : null,

}
PAGE0_BUILDER.load_handler  = (pd) => {
    document.querySelector("#particle_intro0").innerHTML="scroll down"
    document.querySelector("#particle_intro1").innerHTML="watch my"
    document.querySelector("#particle_intro2").innerHTML="animation reel"
}
PAGE0_BUILDER.scroll_handler = (pd, ss, delta_ss) => {

    pd.lottie_anim.play();
    document.querySelector("#particle_intro0").innerHTML="scroll down"
    document.querySelector("#particle_intro1").innerHTML="watch my"
    document.querySelector("#particle_intro2").innerHTML="animation reel"

    pd.nm_anim.cycle_random(500, 55);
    pd.nm_anim1.cycle_random(500, 55);
    pd.nm_anim.nr_vo_in(1200, 'easeInOutExpo', 25);
    pd.nm_anim1.nr_vo_in(1200, 'easeInOutExpo', 25);
    pd.bg_rand_text.nr_vo_in(1000, 'easeInOutExpo', 25);
    pd.bg_rand_text.cycle_random(300, 35);
    pd.bg_rand_text1.nr_vo_in(1200, 'easeInOutExpo', 25);
    pd.bg_rand_text1.cycle_random(300, 35);
}
PAGE0_BUILDER.resize_handler = (pd) => {
}
PAGE0_BUILDER.first_scroll_handler = (pd) => {

    
    document.querySelector("#particle_intro0").innerHTML="scroll down"
    document.querySelector("#particle_intro1").innerHTML="watch my"
    document.querySelector("#particle_intro2").innerHTML="animation reel"

    var bg_canvas = document.querySelector("#bg_canvas");
    var bg_anim    = document.querySelector("#bg_anim");

    bg_anim.addEventListener("click", () => {
        window.open('https://youtu.be/PBgCgR220To', '_blank').focus(); 
    })

    pd.lottie_anim = "https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/0000.json";
    pd.lottie_anim = new DotLottieWorker({
        autoplay: false,
        loop: false,
        canvas : bg_canvas,
        src : pd.lottie_anim,
        workerId : 'worker-1'
    });
    pd.lottie_anim.addEventListener('play', () => {
    })
    pd.lottie_anim.addEventListener('complete', () => {
    })

    pd.bg_rand_text    = new TextAnim(pd.random_nr);
    pd.bg_rand_text1   = new TextAnim(pd.random_nr1);
    pd.nm_anim     = new TextAnim(pd.name_title);
    pd.nm_anim1    = new TextAnim(pd.name_title1);
    // setTimeout(() => {pd.nm_anim.simCharacters()}, 1111);
    // setTimeout(() => {pd.nm_anim1.simCharacters()}, 1111);

    var particles = []
    var ind = 0;
    for (var particle of pd.particles_div){
        let p = new Particle(ind)
        p.element = particle
        particles.push(p)
        ind++;
    }
    var mouseX_BS = pd.includer.getBoundingClientRect().width/2; var mouseY_BS = pd.includer.getBoundingClientRect().height/2;
    window.addEventListener('mousemove', (e) => {
        mouseX_BS = e.clientX;
        mouseY_BS = e.clientY
    })
    var middleeee = {x:pd.includer.getBoundingClientRect().width/2,y:pd.includer.getBoundingClientRect().height*2}
    pd.bg_sim = new Verlet(particles)
    pd.bg_sim.loop(() => {
        var force = {x: 0, y:0}
        var mousePosition = {x:mouseX_BS, y:mouseY_BS}
        pd.bg_sim.simulate(particles, (p) => {
            var mouseForce = subVector(mousePosition, p.pos)
            var midForce = scaleVector(subVector(middleeee, p.pos), 10)
            //var mouseDistance = distVector(p.pos, mousePosition)
            force = scaleVector(mouseForce, (p.id+10)*3)
            if (pd.bg_sim.frame < 100){
                force = addVector(force, midForce)
            }
            return force
        }, null)
        pd.bg_sim.forEach(particles, (p) => {
            p.renderElement(p.element)
        });
    });


    const animate_dragster = (e) => {

        var _e_ = e.type != "touchmove" ? e : e.touches[0]

        for (var child_el of pd.drag_grid.children){
            
            var bb = child_el.getBoundingClientRect()
            var epsilon = (window.innerWidth/7)/2;
            var fontySize = "20px";

            if (bb.x > (_e_.clientX-epsilon) && bb.x < (_e_.clientX+epsilon)){
                fontySize = "50px"
            }

            anime({
                targets : child_el,
                fontSize: [window.getComputedStyle(child_el).fontSize, fontySize],
                duration:200,
                easing:"linear"
            })
        }
    }
    pd.dragster1.addEventListener('mousedown', (e) => {
        pd.drag_grid.style.display = "flex";
    });
    pd.dragster1.addEventListener('touchstart', (e) => {
        pd.drag_grid.style.display = "flex";
    });
    pd.dragster1.addEventListener('mousemove', (e) => {
        animate_dragster(e);
    });
    pd.dragster1.addEventListener('touchmove', (e) => {
        animate_dragster(e);
    });
    pd.dragster2.addEventListener('mousedown', (e) => {
        pd.drag_grid.style.display = "flex";
    });
    pd.dragster2.addEventListener('touchstart', (e) => {
        pd.drag_grid.style.display = "flex";
    });
    pd.dragster2.addEventListener('mousemove', (e) => {
        animate_dragster(e);
    });
    pd.dragster2.addEventListener('touchmove', (e) => {
        animate_dragster(e);
    }); 
    window.addEventListener('mouseup', (e) => {
        pd.drag_grid.style.display = "none";
    });
    window.addEventListener('touchend', (e) => {
        pd.drag_grid.style.display = "none";
    });
    
}