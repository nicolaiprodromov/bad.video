
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

}
PAGE0_BUILDER.load_handler   = [
    (p0d) => {
        console.log("WIDTH SCREEN: ", window.innerWidth, " HEIGHT SCREEN: ", window.innerHeight)
        document.querySelector("#particle_intro0").innerHTML="scroll down"
        document.querySelector("#particle_intro1").innerHTML="watch my"
        document.querySelector("#particle_intro2").innerHTML="animation reel"
    },
    (p0d) => {
        p0d.bg_rand_text    = new TextAnim(p0d.random_nr);
        p0d.nm_anim     = new TextAnim(p0d.name_title);
        p0d.nm_anim1    = new TextAnim(p0d.name_title1);
        p0d.nm_anim.nr_vo_in(333, 'easeInOutExpo', 25);
        p0d.nm_anim1.nr_vo_in(333, 'easeInOutExpo', 25);
        setTimeout(() => {p0d.nm_anim.simCharacters()}, 1111);
        setTimeout(() => {p0d.nm_anim1.simCharacters()}, 1111);

        var particles = []
        var ind = 0;
        for (var particle of p0d.particles_div){
            let p = new Particle(ind)
            p.element = particle
            particles.push(p)
            ind++;
        }
        var mouseX_BS = p0d.includer.getBoundingClientRect().width/2; var mouseY_BS = p0d.includer.getBoundingClientRect().height/2;
        window.addEventListener('mousemove', (e) => {
            mouseX_BS = e.clientX;
            mouseY_BS = e.clientY
        })
        var middleeee = {x:p0d.includer.getBoundingClientRect().width/2,y:p0d.includer.getBoundingClientRect().height*2}
        p0d.bg_sim = new Verlet(particles)
        p0d.bg_sim.loop(() => {
            var force = {x: 0, y:0}
            var mousePosition = {x:mouseX_BS, y:mouseY_BS}
            p0d.bg_sim.simulate(particles, (p) => {
                var mouseForce = subVector(mousePosition, p.pos)
                var midForce = scaleVector(subVector(middleeee, p.pos), 10)
                //var mouseDistance = distVector(p.pos, mousePosition)
                force = scaleVector(mouseForce, (p.id+10)*3)
                if (p0d.bg_sim.frame < 100){
                    force = addVector(force, midForce)
                }
                return force
            }, null)
            p0d.bg_sim.forEach(particles, (p) => {
                p.renderElement(p.element)
            });
        });
        
    }
]
PAGE0_BUILDER.scroll_handler = (p0d, ss, delta_ss) => {
    var scroll_amount_st = ss[0];
        if (scroll_amount_st == 0 && delta_ss[0] != 0 && delta_ss[0] != undefined){
            document.querySelector("#particle_intro0").innerHTML="scroll down"
            document.querySelector("#particle_intro1").innerHTML="watch my"
            document.querySelector("#particle_intro2").innerHTML="animation reel"
            p0d.nm_anim.cycle_random(500, 55);
            p0d.nm_anim1.cycle_random(500, 55);
            p0d.bg_rand_text.nr_vo_out(2000, 'easeInOutExpo', 25);
            p0d.bg_rand_text.cycle_random(100, 35);
        }
}
PAGE0_BUILDER.resize_handler = (p0d) => {
    PAGE0_BUILDER.deviceCheck();
    console.log(PAGE0_BUILDER.deviceMap[PAGE0_BUILDER.device])
}