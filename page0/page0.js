
const PAGE0_BUILDER = new Page(0);
PAGE0_BUILDER.pd             = {
    holder  : document.querySelector('#i0'),
    includer: document.querySelector('#page0include'),

    intro_title: document.querySelector("#intro_title"),
    name_title : document.querySelector('#name_title'),
    name_title1: document.querySelector('#name_title1'),
    nt_draw1   : document.querySelector('#nt_draw1'),
    nt_draw2   : document.querySelector('#nt_draw2'),

    nm_anim : null,
    nm_anim1: null,

    paper1: null,
    paper2: null,
    paper3: null,
    paper4: null,
    paper5: null,
    paper6: null,

    nt_path1: 'nt_path1',
    nt_path2: 'nt_path2',

    particle_intro0: document.querySelector('#particle_intro0'),
    particle_intro1: document.querySelector('#particle_intro1'),
    particle_intro2: document.querySelector('#particle_intro2'),
    particles_p_div: document.querySelector("#particles_intro"),
    particles_div  : document.querySelectorAll(".particle_intro"),

    pi0_anim: null,
    pi1_anim: null,
    pi2_anim: null,

    bg_sim: null,
    dot_sim : null,

    scroll_down_intro: document.querySelector('#scroll_down_intro'),
    scroll_div       : document.querySelector("#scroll_down_sect"),
    sc_anim          : null,

    reel_sect_intro: document.querySelector('#reel_sect_intro'),
    reel_div       : document.querySelector("#reel_sect"),
    reel_anim      : null,

    intro_bg_arrow1: document.querySelector("#intro_bg_arrow1"),
    random_nr      : document.querySelector('#random_nr'),
    bg_rand_text   : null,
    intro_bg_pth1  : 'intro_bg_pth1',

    particlebg : document.querySelector("#particlebg"),
    particlebg1: document.querySelector("#particlebg1"),
    particlebg2: document.querySelector("#particlebg2"),

    intro_bg_arrow11 : document.querySelector("#intro_bg_svg"),

    parent_bb : null,

}
PAGE0_BUILDER.load_handler   = [
    (p0d) => {
        console.log("WIDTH SCREEN: ", window.innerWidth, " HEIGHT SCREEN: ", window.innerHeight)
    },
    (p0d) => {
        p0d.nm_anim     = new TextAnim(p0d.name_title);
        p0d.nm_anim1    = new TextAnim(p0d.name_title1);
        p0d.nm_anim.nr_vo_in(333, 'easeInOutExpo', 25);
        p0d.nm_anim1.nr_vo_in(333, 'easeInOutExpo', 25);
        // setTimeout(() => {p0d.nm_anim.simCharacters()}, 1111);
        // setTimeout(() => {p0d.nm_anim1.simCharacters()}, 1111);

        p0d.paper1 = new Paper(p0d.nt_draw1)
        p0d.paper2 = new Paper(p0d.nt_draw2)

        
    
        p0d.paper1.makePath(0, asset1)
        p0d.paper1.paths[0].attr('class', p0d.nt_path1)
        p0d.paper1.makeRelative(0)
        p0d.paper1_path0_bb  = p0d.paper1.paths[0].getBBox()
        p0d.paper1.samplePath(0, 10);
        p0d.paper1.pop(0);
    
        p0d.paper2.makePath(0, asset2)
        p0d.paper2.paths[0].attr('class', p0d.nt_path2)
        p0d.paper2.makeRelative(0)
        p0d.paper2_path0_bb  = p0d.paper2.paths[0].getBBox()
        p0d.paper2.pop(0);
        p0d.paper2.samplePath(0, 10);


        var scale_p1p0 = 350
        p0d.paper1.paths[0].svg_parent.setAttribute('width', scale_p1p0)
        p0d.paper1.paths[0].svg_parent.setAttribute('height', scale_p1p0)
        p0d.paper2.paths[0].svg_parent.setAttribute('width', scale_p1p0)
        p0d.paper2.paths[0].svg_parent.setAttribute('height', scale_p1p0)
    
        // INTRO PARTICLES TITLE
        var particles1 = []
        var particles = []
        particles.push(new Particle(0))
        particles.push(new Particle(1))
        particles1.push(p0d.paper1)
        particles1.push(p0d.paper2)
        p0d.parent_bb = p0d.intro_title.getBoundingClientRect()
        particles[0].pos = {x:p0d.parent_bb.width/2, y:p0d.parent_bb.height/2}
        particles[1].pos = {x:p0d.parent_bb.width/2, y:p0d.parent_bb.height/2}
        const intro_sim = new Verlet(particles)
        var mouseX_IS = 0; var mouseY_IS = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX_IS = e.clientX;
            mouseY_IS = e.clientY
        })
        intro_sim.loop(()=>{
            var force = {x:0, y:0}
            var force1 = {x:0, y:0}
            var mousePosition = {x:mouseX_IS, y:mouseY_IS}
            var pos1_p = []
            pos1_p.push({x:p0d.parent_bb.width/2, y:p0d.parent_bb.height/2})
            pos1_p.push({x:p0d.parent_bb.width/2, y:p0d.parent_bb.height/2})
            intro_sim.simulate(particles, (p) => {
                var mouseForce    = subVector(mousePosition, p.pos)
                var mouseDistance = distVector(p.pos, mousePosition)
                var pos1_p_force  = subVector(pos1_p[p.id], p.pos)
                var pos1_p_dist   = distVector(pos1_p[p.id], p.pos)
                force  = scaleVector(mouseForce, -scale(mouseDistance, [p0d.parent_bb.width, 0], [10, 100]))
                force1 = scaleVector(pos1_p_force, scale(pos1_p_dist, [300, 0], [230, 330]))
                var forces = intro_sim.sumForces([force, force1])
                return forces
            }, null)
            intro_sim.forEach(particles, (p) => {
                //particles1[p.id].moveRel(0, p.pos, true)
                particles1[p.id].moveParent1(0, p.pos, true)
            })
        })
    },
    (p0d) => {


        p0d.particle_intro0 = document.querySelector('#particle_intro0')
        p0d.particle_intro1 = document.querySelector('#particle_intro1')
        p0d.particle_intro2 = document.querySelector('#particle_intro2')
        p0d.particles_p_div = document.querySelector("#particles_intro");
        p0d.particles_div   = document.querySelectorAll(".particle_intro");
    
        p0d.pi0_anim = new TextAnim(p0d.particle_intro0);
        p0d.pi1_anim = new TextAnim(p0d.particle_intro1);
        p0d.pi2_anim = new TextAnim(p0d.particle_intro2);
    
        p0d.pi0_anim.nr_vo_out(700, 'easeInOutExpo', 15);
        setInterval(() => {p0d.pi0_anim.cycle_random(600, 35)}, 8000);
        p0d.pi1_anim.nr_vo_out(700, 'easeInOutExpo', 15);
        setInterval(() => {p0d.pi1_anim.cycle_random(600, 35)}, 12000);
        p0d.pi2_anim.nr_vo_out(700, 'easeInOutExpo', 15);
        setInterval(() => {p0d.pi2_anim.cycle_random(600, 35)}, 10000);
    
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
    },
    (p0d) => {
        p0d.scroll_down_intro = document.querySelector('#scroll_down_intro');
        p0d.scroll_div = document.querySelector("#scroll_down_sect");

        p0d.sc_anim = new TextAnim(p0d.scroll_down_intro);
    
        p0d.scroll_down_intro.addEventListener("mouseenter", () => {
            p0d.sc_anim.nr_vo_out(300, 'easeInOutSine', 25);
        })
        
        p0d.paper3 = new Paper(p0d.scroll_div);
    
        p0d.paper3.makePath(0, asset5)
        p0d.paper3.paths[0].attr('class', 'scrl_pth1')
        p0d.paper3.makeRelative(0)
        p0d.paper3.scalePath(0, 1.25)
        p0d.paper3.moveRel(0, {x:20, y:5})
        p0d.paper3.samplePath(0, 15);
        
        p0d.paper3.makePath(1, asset4)
        p0d.paper3.paths[1].attr('class', 'scrl_pth2')
        p0d.paper3.makeRelative(1)
        p0d.paper3.scalePath(1, 1.25)
        p0d.paper3.moveRel(1, {x:50, y:30})
        p0d.paper3.samplePath(1, 15);
    },
    (p0d) => {
        p0d.reel_anim = new TextAnim(p0d.reel_sect_intro);
        p0d.reel_sect_intro.addEventListener("mouseenter", () => {
            p0d.reel_anim.nr_vo_out(300, 'easeInOutSine', 25);
        })
        
        p0d.paper4 = new Paper(p0d.reel_div);
    
        p0d.paper4.makePath(0, asset5)
        p0d.paper4.paths[0].attr('class', 'scrl_pth1')
        p0d.paper4.makeRelative(0)
        p0d.paper4.scalePath(0, 1.25)
        p0d.paper4.moveRel(0, {x:60, y:5})
        p0d.paper4.samplePath(0, 15);
    
        p0d.paper4.makePath(1, asset4)
        p0d.paper4.paths[1].attr('class', 'scrl_pth2')
        p0d.paper4.makeRelative(1)
        p0d.paper4.scalePath(1, 1.25)
        p0d.paper4.moveRel(1, {x:80, y:30})
        p0d.paper4.samplePath(1, 15);
    },
    (p0d) => {
        p0d.bg_rand_text    = new TextAnim(p0d.random_nr);

        var reel_div_bb      = p0d.reel_div.getBoundingClientRect()
        var scroll_div_bb    = p0d.scroll_div.getBoundingClientRect()
        var includer_bb      = p0d.includer.getBoundingClientRect()
    
        p0d.paper5 = new Paper(p0d.intro_bg_arrow1)
    
        var pthy1 = [
            {cmd: "Move", x:0, y:0},
            {cmd: "Move", x:reel_div_bb.x + reel_div_bb.width/2, y:reel_div_bb.y + reel_div_bb.height/2},
            {cmd: "CubicBezier",
                x:includer_bb.width,
                y:scroll_div_bb.y + scroll_div_bb.height/2,
                c1x:reel_div_bb.x, c1y:scroll_div_bb.y + scroll_div_bb.height/2,
                c2x:includer_bb.width, c2y:scroll_div_bb.y + scroll_div_bb.height/2
            },
        ]
        p0d.paper5.makePath(0, pthy1)
        p0d.paper5.paths[0].attr('class', p0d.intro_bg_pth1)
        p0d.paper5.samplePath(0, 15);
        
    
        var pthy2 = [
            {cmd: "Move", x:0, y:0},
            {cmd: "Move", x:scroll_div_bb.x + scroll_div_bb.width/2, y:scroll_div_bb.y + scroll_div_bb.height/2},
            {cmd: "CubicBezier",
                x:0,
                y:reel_div_bb.y + reel_div_bb.height/2,
                c1x:scroll_div_bb.x+ scroll_div_bb.width, c1y:0,
                c2x:reel_div_bb.x, c2y:reel_div_bb.y + reel_div_bb.height/2
            },
        ]
        p0d.paper5.makePath(1, pthy2)
        p0d.paper5.paths[1].attr('class', p0d.intro_bg_pth1)
        p0d.paper5.samplePath(1, 15);
        
    
        p0d.paper5.makePath(2, asset3)
        p0d.paper5.makeRelative(2)
        p0d.paper5.paths[2].attr('class', p0d.intro_bg_pth1)
        var x1 = includer_bb.width/2 - p0d.paper5.paths[2].getBBox().width/2 + 25;
        var y1 = (includer_bb.height/2 - p0d.paper5.paths[2].getBBox().height/2) -25;
        p0d.paper5.moveRel(2, {x: x1, y: y1})
        p0d.paper5.samplePath(2, 15);
    



        var mouseX = 0; var mouseY = 0
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        })
    
        p0d.particlebg = document.querySelector("#particlebg")
        p0d.particlebg1 = document.querySelector("#particlebg1")
        p0d.particlebg2 = document.querySelector("#particlebg2")
        var particles = []
        particles.push(new Particle(0));
        particles[0].element = p0d.particlebg
        particles.push(new Particle(1));
        particles[1].element = p0d.particlebg1
        particles.push(new Particle(2));
        particles[2].element = p0d.particlebg2
    
        p0d.dot_sim = new Verlet(particles)
        p0d.dot_sim.lock_to_path[0] = 1
        p0d.dot_sim.lock_to_path[1] = 1
        p0d.dot_sim.lock_to_path[2] = 1
    
        p0d.dot_sim.loop(() => {
            var force = {x: 0, y:0}
            var mousePosition = {x:mouseX, y:mouseY}
    
            var lockData = {
                paper : p0d.paper5,
                id : -1,
                callback: () => {}
            }
    
            p0d.dot_sim.simulate(particles, (p) => {
                var mouseForce = subVector(mousePosition, p.pos)
                //var mouseDistance = distVector(p.pos, mousePosition)
                force = scaleVector(mouseForce, 55)
                return force
            }, lockData)
    
            p0d.dot_sim.forEach(particles, (p, id) => {
                p.renderElementClean(p.element)
            });
    
    
        });
    },
    (p0d) => {
        if (PAGE0_BUILDER.device == 0){
            p0d.paper6 = new Paper(p0d.intro_bg_arrow11);
            p0d.paper6.makePath(0, asset8);
            p0d.paper6.makePath(1, asset7);
            p0d.paper6.makePath(2, asset6);
            p0d.paper6.paths[0].attr('class', 'intro_bg_pth2');
            p0d.paper6.paths[1].attr('class', 'intro_bg_pth5');
            p0d.paper6.paths[2].attr('class', 'intro_bg_pth3');
            p0d.paper6.pop(0, p0d.paper6.paths[0].getBBox().width, p0d.paper6.paths[0].getBBox().height);
            p0d.paper6.pop(1, p0d.paper6.paths[0].getBBox().width, p0d.paper6.paths[0].getBBox().height);
            p0d.paper6.pop(2, p0d.paper6.paths[0].getBBox().width, p0d.paper6.paths[0].getBBox().height);
            var scale = 300;
            p0d.paper6.paths[0].svg_parent.setAttribute('width', scale);
            p0d.paper6.paths[0].svg_parent.setAttribute('height', scale);
            p0d.paper6.paths[1].svg_parent.setAttribute('width', scale);
            p0d.paper6.paths[1].svg_parent.setAttribute('height', scale);
            p0d.paper6.paths[2].svg_parent.setAttribute('width', scale);
            p0d.paper6.paths[2].svg_parent.setAttribute('height', scale);
            // var middle_x = (window.innerWidth/2 - p0d.paper6.paths[0].getBBox().width/2);
            // var middle_y = (window.innerHeight/2 - p0d.paper6.paths[0].getBBox().height/2);
            p0d.paper6.moveParent1(0, {x:(-6)*(scale/100) + 50,   y:(2.5)*(scale/100)}, false);
            p0d.paper6.moveParent1(1, {x:(0.75)*(scale/100) + 50, y:0},                 false);
            p0d.paper6.moveParent1(2, {x:0 + 50,                  y:0},                 false);
        }
        
    },
]
PAGE0_BUILDER.scroll_handler = (p0d, ss, delta_ss) => {
    var scroll_amount_st = ss[0];
        if (scroll_amount_st == 0 && delta_ss[0] != 0 && delta_ss[0] != undefined){

            p0d.nm_anim.nr_vo_out(800, 'easeInOutExpo', 25);
            p0d.nm_anim.cycle_random(200, 55);

            p0d.nm_anim1.nr_vo_out(800, 'easeInOutExpo', 25);
            p0d.nm_anim1.cycle_random(200, 55);
    
            p0d.paper2.animPath2(p0d.paper2, 0, [0,1], 1400, 'easeInOutCirc')
    
            p0d.pi0_anim.nr_vo_out(700, 'easeInOutExpo', 15);
            p0d.pi1_anim.nr_vo_out(700, 'easeInOutExpo', 15);
            p0d.pi2_anim.nr_vo_out(700, 'easeInOutExpo', 15);
    
            p0d.sc_anim.nr_vo_out(600, 'easeInOutExpo', 35);
            p0d.sc_anim.cycle_random(200, 35);
    
            p0d.paper3.animPath2(p0d.paper3, 0, [0,1], 1600, 'easeInOutCirc')
            p0d.paper3.animPath2(p0d.paper3, 1, [0,1], 1800, 'easeInOutCirc')
    
            p0d.reel_anim.nr_vo_out(600, 'easeInOutExpo', 35);
            p0d.reel_anim.cycle_random(200, 35);
            
            p0d.paper4.animPath2(p0d.paper4, 0, [0,1], 1600, 'easeInOutCirc')
            p0d.paper4.animPath2(p0d.paper4, 1, [0,1], 1800, 'easeInOutCirc')
    
            p0d.bg_rand_text.nr_vo_out(2000, 'easeInOutExpo', 25);
            p0d.bg_rand_text.cycle_random(100, 35);
    
            p0d.paper5.animPath2(p0d.paper5, 0, [0,1], 2000, 'easeInOutCirc')
            p0d.paper5.animPath2(p0d.paper5, 1, [0,1], 2000, 'easeInOutCirc')
            p0d.paper5.animPath2(p0d.paper5, 2, [0,1], 2000, 'easeInOutCirc')
        }
}
PAGE0_BUILDER.resize_handler = (p0d) => {

    var bg_arrows_bgg    = p0d.intro_bg_arrow1.getBoundingClientRect()
    var reel_div_bb      = p0d.reel_div.getBoundingClientRect()
    var scroll_div_bb    = p0d.scroll_div.getBoundingClientRect()
    var includer_bb      = p0d.includer.getBoundingClientRect()

    p0d.paper5.moveRel(2, {x: bg_arrows_bgg.width/2, y: bg_arrows_bgg.height/2}, true)
    p0d.paper5.paper.setSize(bg_arrows_bgg.width, bg_arrows_bgg.height)
    var pthy1 = [
        {cmd: "Move", x:0, y:0},
        {cmd: "Move", x:reel_div_bb.x + reel_div_bb.width/2, y:reel_div_bb.y + reel_div_bb.height/2},
        {cmd: "CubicBezier",
            x:includer_bb.width,
            y:scroll_div_bb.y + scroll_div_bb.height/2,
            c1x:reel_div_bb.x, c1y:scroll_div_bb.y + scroll_div_bb.height/2,
            c2x:includer_bb.width, c2y:scroll_div_bb.y + scroll_div_bb.height/2
        },
    ]
    var pthy2 = [
        {cmd: "Move", x:0, y:0},
        {cmd: "Move", x:scroll_div_bb.x + scroll_div_bb.width/2, y:scroll_div_bb.y + scroll_div_bb.height/2},
        {cmd: "CubicBezier",
            x:0,
            y:reel_div_bb.y + reel_div_bb.height/2,
            c1x:scroll_div_bb.x+ scroll_div_bb.width, c1y:0,
            c2x:reel_div_bb.x, c2y:reel_div_bb.y + reel_div_bb.height/2
        },
    ]
    var sample_resolution = 15;
    p0d.paper5.updatePath(0, pthy1)
    p0d.paper5.updatePath(1, pthy2)
    p0d.paper5.samplePath(0, sample_resolution);
    p0d.paper5.samplePath(1, sample_resolution);
    p0d.paper5.samplePath(2, sample_resolution);

    p0d.parent_bb = p0d.intro_title.getBoundingClientRect()

    
    var nt_bb = p0d.nt_draw1.getBoundingClientRect();
    var nt1_bb = p0d.nt_draw2.getBoundingClientRect();
    p0d.paper1.paper.setSize(nt_bb.width, nt_bb.height);
    p0d.paper2.paper.setSize(nt1_bb.width, nt1_bb.height);

    PAGE0_BUILDER.deviceCheck();
    console.log(PAGE0_BUILDER.deviceMap[PAGE0_BUILDER.device])
}