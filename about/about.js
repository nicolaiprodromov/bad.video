

function TESTPARTII(){
    var grid = []
    var gsize = 80;
    var grid_noise = []
    var strength = 100;
    var grid_els = []

    var testy = 1.3;
    var testy2 = 1.3

    var trail_length = 90;

    var r = Raphael("holder", window.innerWidth, window.innerHeight), pos = [0, 0];
    var r2 = Raphael("holder2", window.innerWidth, window.innerHeight), pos = [0, 0];

    var path_svg = []
    var path_svg1 = []
    var path_svg2 = []
    var path_str = [];
    var pathfl = []

    var clicked = false;

    var mouse_pos = 0;

    let particle;
    let particles = [];

    const canvas_div    = 'testCanvas';
    const particles_div = 'Particles';
    const particle_div  = 'testParticle';

    let children;
    let radius = [];
    let mass   = 1.3;

    let frame = 0;

    var sound_particles = []

    function preload() {
    for (var i=0; i < 4; i++){
        sound_particles.push(loadSound('ball' + (i+1) + '.wav'));
    }
    }

    var collision_hit = [];
    var prev_collision_hit = [];


    function setup() {
    
        // Add reverb to collision sounds
        reverb = new p5.Reverb();
        for (var i=0; i < 4; i++){
            reverb.process(sound_particles[i], .5, 1);
            sound_particles[i].setVolume(0.01);  
        }
        
        // Set frame rate to 60 FPS
        frameRate(60);
        
        // Make canvas
        let canvas = makeCanvas(canvas_div );
        
        pg = createGraphics(window.innerWidth, window.innerWidth);
        
        // Get particles parent and all particles
        const particles_elem = document.getElementById(particles_div);  
        children = particles_elem.children;
        
        for (let it = 0; it < children.length; it++){
            // Set particles radius
            radius.push(window.getComputedStyle(children[it]).width.replace("px",""))

            // Particle object
            particle = new Particle(it, radius[it], mass/(radius[it]*150));

            // Set random position of particle
            let range = 1000;
            let init_pos = createVector(random(0,width), random(0,height));

            // Particle setup
            particle.pos = init_pos;
            particle.old_pos = init_pos;

            // Append particle to the list
            particles.push(particle)
            
            collision_hit[it] = 0
            prev_collision_hit[it] = 0
            
            path_str.push('')
            pathfl.push([])

            path_svg.push(r.path('').attr(
            {opacity:0.25,
            fill: "#005BFF",
            stroke: "#FF00D2",
            "stroke-width": 8,
            "stroke-linecap": "round"}
            ))
            path_svg2.push(r2.path('').attr(
            {opacity:0.5,
            fill: "#FF00002D",
            stroke: "#FF0000",
            "stroke-width": 0.5,
            "stroke-linecap": "round",
            }
            ))
        }
    }
    function draw() {
    0
    
    let index = 0;
    
    mouse_pos = createVector(mouseX, mouseY);
    
    // Iterate over all particles
    for (let p of particles){
        
        for (var i=0; i < 4; i++){
        sound_particles[i].setVolume(Math.abs(p.vel.x)/100);  
        }
        
        p.radius = window.getComputedStyle(children[index]).width.replace("px","")
        
        // Compute forces in ~/forces.js~
        var forces = forces_sim(p, frame);
        
        // ------------------------------------------
        // Render particle
        //p.render(false);
        p.renderElement(particle_div, forces);
        
        // Simulate particle
        p.simulate(16/100, particles, forces);
        // ------------------------------------------

        draw_heatmap(p);
        
        index++;
        
    }
        
    for (let it = 0; it < children.length; it++){
        
        var p__ = document.createElement("p");
        p__.className = "particle_vel_text"
        p__.fontSize = "6px"
        p__.innerText = forces.x.toFixed(2) + ',' + forces.y.toFixed(2);
        
        if (frame > 0 ){
        children[it].removeChild(children[it].lastChild);
        }
        children[it].appendChild(p__) 
        
        var poss = getElPos(children[it])
        
        const angle = Math.atan2(mouseY, mouseX);
        
        //children[it].style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;

        // 
        pathfl[it].push({x:poss[0],y:poss[1]})
        
        if (frame > trail_length){
            for (var u = 0; u < pathfl[it].length; u++){
            path_str[it] += 'L' + pathfl[it][u].x + ',' + pathfl[it][u].y
            }
            path_svg[it].attr('path', path_str[it])
            path_svg2[it].attr('path', path_str[it])
            
        }

        if (pathfl[it].length > trail_length){
        pathfl[it].shift();
        path_str[it] = 'M' + pathfl[it][0].x + ',' + pathfl[it][0].y
        }
        
        
    }

    
    
    // Print FPS
    const timer = document.getElementById('fpsTimer'); 
    if (frame % 5 == 0){
        timer.innerHTML = str("FPS: " + int(1000/deltaTime) + " | FRAME: " + frame + " | " + particles[0].pos.x.toFixed(2));
    }
    
    frame ++ ;
    
    }
    function windowResized(){
        getCanvasParent('testCanvas', resize = true);
    }

    class Particle {
    
        constructor(id, radius, mass) {
        
        this.pos = createVector(0,0);
        this.old_pos = createVector(0,0);
        this.vel = createVector(0,0);
        
        this.id = id;
        this.radius = radius;
        this.mass = mass;
        
        this.surface_response = 5;
        
        this.friction = 0.96;
        this.collision_friction = 0.85;
        this.collision_force = 0.5;
        
        this.color = color(0,0,0,0);
        
        this.iterations = 8;
        
        this.padding = 0;
        
        this.pinned = false;
        
        }
        
        render(sr){
        
        if (sr == true){
            push();
            
            // Make stroke
            strokeWeight(1);
            stroke(0);
            
            // Clear fill
            fill(0,0,0,0);
            
            // Draw surface response radius
            circle(this.pos.x, this.pos.y, this.radius+ this.surface_response);
            
            pop();
            
            push();
            // Clear stroke
            strokeWeight(1);
    
            // Color particle
            //fill(230,0,this.vel.mag() * 130);
            fill(this.color);
    
            // Draw particle
            circle(this.pos.x, this.pos.y, this.radius);
            
            pop();
            
        }
        else {
            push();
            // Clear stroke
            strokeWeight(1);
    
            // Color particle
            //fill(230,this.vel.mag() * 130,0);
            stroke(0);
            fill(this.color);
    
            // Draw particle
            circle(this.pos.x, this.pos.y, this.radius);
            pop();
    
        }
        
        }
        
        renderElement(elementID, forces){
        elementSetPosition(elementID + str(this.id), createVector(this.pos.x, this.pos.y));
        //ementSetRadius(elementID + str(this.id), this.radius);
        //elementSetColor(elementID + str(this.id), color(Math.abs(forces.y)*10,0,Math.abs(forces.x)*10));
        }
        
        simulate(dt, particles, forces){
        
        if (this.pinned == false){
            // Get position and last position
            let pos = this.pos;
            let old_pos = this.old_pos;
    
            // Compute velocity as the vector between the last position and current position
            let vel = p5.Vector.sub(pos, old_pos);
            vel = vel.setMag(vel.mag() * this.friction);
            
            if (pos.dist(old_pos) < 2){
            vel = vel.setMag(vel.mag() * (this.friction/testy));
            testy += .001
            }
            if (pos.dist(old_pos) > 2){
            testy = 1.3
            }
    
            // Bound to domain and retrieve velocity after collision friction
            vel = this.domain(createVector(width, height), vel);
            //vel = this.domain_sphere(150, vel);
    
            // Compute self collisions in iterations and retrieve velocity after collision friction
            for ( let i = 0; i < this.iterations; i++){
            vel = this.selfCollisions(particles, vel);
            }
            
            if (frame%2==0){
            if (collision_hit[this.id] > prev_collision_hit[this.id]){
                sound_particles[Math.floor(Math.random() * sound_particles.length)].play()
                prev_collision_hit[this.id] = 1
            }
    
            if (collision_hit[this.id] < prev_collision_hit[this.id]){
                prev_collision_hit[this.id] = 0
            }
            
            if (collision_hit[this.id] == prev_collision_hit[this.id]){
                collision_hit[this.id] = 0
            }
            }
            
    
            
    
            // Store vel
            this.vel = vel;
    
            // Set last position as current position for next frame
            old_pos = pos;
    
            // Compute acceleration from F = ma
            var acc = p5.Vector.div(forces, this.mass);
            
            if (testy > 2){
            this.vel = createVector(0,0)
            acc = createVector(0,0)
            testy = 1.3
            
            }
    
            // Add velocity + accelleration to current position
            pos = p5.Vector.add(pos, p5.Vector.add(vel, p5.Vector.mult(acc, createVector(dt*dt, dt*dt))));
            
            
            // Store current position and last position
            this.pos = pos;
            this.old_pos = old_pos;
            
            
            
        }
        
        }
        
        domain(size, vel){
        
        let velocity = vel
        
        if (this.pinned == false){
            
            // Check if particle is outside domain
            // Project particle back to surface
            // Add collision friction
    
            // Surface response
            let sr = (this.radius / 2) + this.surface_response + this.padding;
    
            if (this.pos.x >= size.x - sr){
            this.pos.x = size.x - sr;
            velocity = velocity.setMag(vel.mag() * this.collision_friction);
            }
            else if (this.pos.x < sr){
            this.pos.x = sr;
            velocity = velocity.setMag(vel.mag() * this.collision_friction);
            }
            else if (this.pos.y >= size.y - sr){
            this.pos.y = size.y - sr;
            velocity = velocity.setMag(vel.mag() * this.collision_friction);
            }
            else if (this.pos.y < sr){
            this.pos.y = sr;
            velocity = velocity.setMag(vel.mag() * this.collision_friction);
            }
        }
        
        return velocity
        }
        
        domain_sphere(radius, vel){
        
        let velocity = vel
        
        if (this.pinned == false){
            let npos = p5.Vector.normalize(p5.Vector.sub(createVector(width/2,height/2), this.pos));
    
            let radius_response = radius - this.radius / 2 + this.surface_response;
            if (p5.Vector.dist(this.pos, createVector(width/2,height/2)) > radius_response){
            this.color = color(255);
            velocity = velocity.setMag(-3);
            //this.old_pos = npos.setMag(radius_response);
            //velocity = velocity.setMag(vel.mag() * this.collision_friction);
            }
            else{
            this.color = color(100);
            }
        }
        
        return velocity
        }
        
        selfCollisions(particles, vel){
        
        let velocity = vel;
        
        if (this.pinned == false){
            let i = 0;
    
            // Go over each particle
            for (let particle of particles){
    
            // Don't compare to self
            if (i != this.id){
    
                // Check if particle is overlapping this particle
                let v_p1_p2 = p5.Vector.sub(particle.pos, this.pos);
                let v_p2_p1 = p5.Vector.sub(this.pos, particle.pos);
    
                if (v_p1_p2.mag() < (this.radius / 2 + particle.radius / 2) + this.surface_response){
    
                // Push both particles by their radius
                this.pos     = p5.Vector.add(this.pos,     v_p2_p1.setMag(this.collision_force));
                particle.pos = p5.Vector.add(particle.pos, v_p1_p2.setMag(this.collision_force));
    
                // Add collision friction
                velocity = velocity.setMag(vel.mag() * this.collision_friction);
                
                if (this.pos.dist(this.old_pos) < 5){
                    velocity = velocity.setMag(vel.mag() * (this.collision_friction)/testy2);
                    collision_hit[particle.id] = 1
                    testy2 += .1
                }
                if (this.pos.dist(this.old_pos) > 5){
                    testy2 = 1.3
                }
                
                if (testy2 > 2){
                    velocity = createVector(0,0)
                }
                
                //break;
    
                }
            }
            i++;
            }
        }
        return velocity;
        }
    }

    var clicked = false;

    var empty = {
    x : 0
    }

    const sum_forces = (forces_list) => {
        let forces = forces_list;
        let sum = forces[0];
        for (let i = 1; i < forces.length; i++){
        sum = p5.Vector.add(sum, forces[i]);
        }
        return sum;
    }
    const forces_sim = (particle, frame) => {
        
        mouse_pos = createVector(mouseX, mouseY);
        var origin = createVector(width/2, height/2); 
        
        var magnitude = 0.0002;
        var mouse_force_mag = 0;
        var origin_force_mag = magnitude*10
        var noise_field_mag = magnitude*2
        
        if (mouseX != pmouseX || mouseY != pmouseY){
        mouse_force_mag = magnitude*30
        } else {
        mouse_force_mag = 0
        }
        
        var mouse_force = p5.Vector.sub(particle.pos, mouse_pos).setMag((mouse_force_mag/10)/(particle.pos.dist(mouse_pos)/100))
        var mouse_force1 = p5.Vector.sub(particle.pos, mouse_pos).setMag((mouse_force_mag*3)/(particle.pos.dist(mouse_pos)/100)*empty.x)
        var origin_force = p5.Vector.sub(origin, particle.pos).setMag((origin_force_mag))
        
        // COMPUTE NOISE FIELD
        //-------------------------------------------------------------
        var grid_dif = []
        // Compute distance from particles to grid cells  
        for (var cell of grid){
        var vec_dif = createVector(cell.x, cell.y)
        grid_dif.push(particle.pos.dist(vec_dif))
        }
        var ff = createVector(0,0)
        var noise_field_force = createVector(0,0)
        var _d = 0;
        for (var diff of grid_noise){
        if (grid_dif[_d] == Math.min.apply(Math, grid_dif)){
            noise_field_force.x = diff.x
            noise_field_force.y = diff.y
            noise_field_force = noise_field_force.setMag(noise_field_mag)
    
        }
        _d++
        }
        //------------------------------------------------------------
        
        var ff_list = [];
        // if (particle.id == 2){
        //   ff_list = [origin_force]
        // } else {
        //   ff_list = [origin_force, mouse_force1]
        // }
        
        var posarb = createVector(width,250)
        pos_force = p5.Vector.sub(particle.pos, posarb).setMag((magnitude)*(particle.pos.dist(posarb)/100))
        ff_list = [origin_force, mouse_force, mouse_force1, noise_field_force]
        
        final_force = sum_forces(ff_list)
        return final_force;
    
    }
    function mouseClicked (){
        clicked = !clicked;
        console.log(clicked)
        
        anime({
        targets : empty,
        x : [1,0],
        duration: 100,
        easing : 'easeInOutCirc',
        
        })
    }


    const getElPos = (el) => {
        let posX = parseInt(el.style.left.replace("px", ""))
        let posY = parseInt(el.style.top.replace("px", ""))
        return [posX, posY]
    }
    const getCanvasParent = (parentID, resize = false) => {

        const CANVAS = document.getElementById(parentID);
        const WIDTH = CANVAS.offsetWidth;
        const HEIGHT = CANVAS.offsetHeight;

        if (resize == true){
        
            resizeCanvas(WIDTH, HEIGHT);
        
        }

        return createVector(WIDTH, HEIGHT);

    }
    const makeCanvas = (elementID) => {
    
    const WIDTH = getCanvasParent(elementID).x;
    const HEIGHT = getCanvasParent(elementID).y;
    const CANVAS = createCanvas(WIDTH, HEIGHT,P2D);
    CANVAS.parent(elementID);
    
    return CANVAS;
    
    }
    const edgeDistanceFromVector = (vector, padding = 0) => {
        // X positive
        //line(vector.x, vector.y, padding, vector.y);
        let x_pos = p5.Vector.dist(vector, createVector(width - padding, vector.y));
        // X negative
        //line(vector.x, vector.y, width - padding, vector.y);
        let x_neg = p5.Vector.dist(vector, createVector(padding, vector.y));
        // Y positive
        //line(vector.x, vector.y, vector.x, padding);
        let y_pos = p5.Vector.dist(vector, createVector(vector.x, height - padding));
        // Y negative
        //line(vector.x, vector.y, vector.x, height - padding);
        let y_neg = p5.Vector.dist(vector, createVector(vector.x, padding));

        return {xp : x_pos, xn: x_neg, yp: y_pos, yn: y_neg};
    }
    const elementSetPosition = (elementID, pos) => {
    
        const ELEMENT = document.getElementById(elementID);

        let boundingBox = edgeDistanceFromVector(pos);

        ELEMENT.style.left = boundingBox.xn + 'px';
        ELEMENT.style.top  = boundingBox.yn + 'px';
    
    }
    const elementSetRadius = (elementID, radius) => {
    
    const ELEMENT = document.getElementById(elementID);

    ELEMENT.style.width        = radius + 'px';
    ELEMENT.style.height       = radius + 'px';
    //ELEMENT.style.borderRadius = radius + 'px';
    
    
    }
    const elementSetColor = (elementID, colorBg) => {

    const ELEMENT = document.getElementById(elementID);
    
    ELEMENT.style.backgroundColor = colorBg;
    
    }
    const elementGetPosition = (elementID) => {
    
    const ELEMENT = document.getElementById(elementID);

    return createVector(ELEMENT.offsetWidth, ELEMENT.offsetHeight);

    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const draw_noise_field = (update = false) => {
        var div = document.createElement("div");
        document.querySelector("body").appendChild(div);
        div.className = "noise_field_cell"
        div.style.backgroundColor = 'rgb(0,0,55,' + Math.abs(rand1)/100 + ")"
        div.innerHTML = 'vec(' + rand1 + "," + rand2 +")"
        div.style.left = x1 + "px"
        div.style.top = y1 + "px"
        grid_els.push(div)
    }
    for (var x1 = 0 ; x1 < window.innerWidth; x1+=gsize){
        for (var y1 = 0 ; y1 < window.innerHeight; y1+=gsize){
        
        var rand1 = getRandomInt(-strength, strength)
        var rand2 = getRandomInt(-strength, strength)
        
        grid.push({x:x1 + gsize/2,y:y1 + gsize/2})
        grid_noise.push({x:rand1,y:rand2})
        
        //draw_noise_field();
        }
    }

    const draw_heatmap = (p) =>{

        push()
        strokeWeight(0)
    
        
        fill(random(155,255),17)
        ellipse(p.pos.x, p.pos.y, random(1,3), random(1,3))
    
        fill(22,22)
        ellipse(p.pos.x + random(-7,7), p.pos.y + random(-7,7), 1, 1)
    
        if (frame % 1 == 0){
        fill(random(22,155),3)
        drawingContext.filter = 'blur(0px)'
        ellipse(p.pos.x+ random(-7,7), p.pos.y+ random(-7,7), random(-30,30), random(-30,30))
        }
    
        if (frame % 50 == 0){
        fill(random(155,255), 6)
        ellipse(p.pos.x + random(-11,11), p.pos.y + random(-11,11), random(1,10), random(1,10))
        }
        
        
        // if(frame % 9000 == 0){
        //    clear()
        // }
        
        pop()
        
    }
}

TESTPARTII();