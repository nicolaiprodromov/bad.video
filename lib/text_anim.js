
const mix_arrays = (list1, list2, threshold) => {
    let list3 = list1.slice(0,Math.round(scale(threshold,[0,1],[0,list1.length]))).concat(list2.slice(Math.round(scale(threshold,[0,1],[0,list2.length], list2.length))))
    return list3
}
class TextAnim{
    constructor(element, id = 0){
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz'
        this.element = element
        this.id = id
        element.dataset.text_id = this.id
        this.text = this.element.innerHTML
        this.chars = []
        for (var char of this.text){
            this.chars.push(char);
        }
        this.length = this.chars.length
        this.chars_v = []
        this.chars_u = []
        this.chars_d = []
        this.setup();
        this.prev_e = 0;
        this.debug = false;
        if (this.debug){
            console.log(`[TA] : ${this.id} | ${this.element.id}`)
        }
    }
    randomChoice(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }
    update(text){
        this.text = text
        this.chars = []
        for (var char of this.text){
            this.chars.push(char);
        }
        this.length = this.chars.length
        this.chars_v = []
        this.chars_u = []
        this.chars_d = []
        this.setup();
        this.prev_e = 0;
    }
    setup(){
        this.element.childNodes.forEach((e) =>{
            e.remove();
        });
        this.element.innerHTML = ''
        this.element.classList.add('chars_parent')
        for (var char of this.chars){
            var char_div = document.createElement('div');
            char_div.classList.add('chars');
            this.chars_u.push(char_div)
            var char_div1 = document.createElement('div');
            char_div1.classList.add('chars');
            this.chars_d.push(char_div1)
            var chars_v = document.createElement('div');
            chars_v.classList.add('chars_v');
            chars_v.appendChild(char_div);
            chars_v.appendChild(char_div1);
            this.chars_v.push(chars_v)
            this.element.appendChild(chars_v);
            char = char.replace(' ', '\u00A0')
            char_div.innerHTML = char;
            char_div1.innerHTML = char;
        }
    }
    animate_chars_v(range, time, easing, delay, autoplay = true, loop = false){
        let anim = anime({
            targets: this.chars_v,
            translateY: range,
            duration:time,
            easing: easing,
            delay:anime.stagger(delay),
            autoplay:autoplay,
            loop:loop
        })
        return anim
    }
    nr_vo_in(time, easing, delay, autoplay = true, loop = false){
        let anim = this.animate_chars_v(
            ["-100%","0%"],
            time, easing, delay, autoplay, loop
        )
        return anim
    }
    nr_vo_out(time, easing, delay, autoplay = true, loop = false){
        let anim = this.animate_chars_v(
            ["0%", "-100%"],
            time, easing, delay, autoplay, loop
        )
        return anim
    }
    cycle_random(duration, step = 3){
        var startTime = new Date().getTime();
        var self = this;
        this.cr_id = setInterval(() => {
            for (var char_v of self.chars_v){
                char_v.childNodes.forEach(element => {
                    element.innerHTML =  self.randomChoice(self.alphabet)
                });
            }
            if(new Date().getTime() - startTime > duration){
                for (var char of self.chars_u){
                    char.innerHTML =  self.text[self.chars_u.indexOf(char)].replace(' ', '\u00A0')
                }
                for (var char of self.chars_d){
                    char.innerHTML =  self.text[self.chars_d.indexOf(char)].replace(' ', '\u00A0')
                }
                clearInterval(self.cr_id);
                return;
            }
        }, step, this.INTERVAL)

    }
    mouse_rotate(e, duration, easing = 'easeInOutSine'){
        var index = Math.round(scale(e.x, [this.element.getBoundingClientRect().x, this.element.getBoundingClientRect().x + this.element.getBoundingClientRect().width], [0,this.chars_u.length-1]))
        var divy = this.chars_u[index]
        var divy1 = this.chars_d[index]
        anime({
            targets : [divy, divy1],
            rotateZ  : [0,15],
            duration: duration,
            easing  : easing
        })
    }
    mouse_scale_u(e){
        var index = Math.round(scale(e.x, [this.element.getBoundingClientRect().x, this.element.getBoundingClientRect().x + this.element.getBoundingClientRect().width], [0,this.chars_u.length-1]))
        var divy = this.chars_u[index]
        var divy1 = this.chars_d[index]
        anime({
            targets : [divy, divy1],
            scaleX  : ["100%", "110%", "100%"],
            duration: 300,
            easing  : 'easeInOutCirc'
        })
    }
    mouse_mix_text(e, padding = 20, texty = ''){
        var factor = Math.max(scale(e.clientX, [this.element.getBoundingClientRect().x + padding, this.element.getBoundingClientRect().x + this.element.getBoundingClientRect().width - padding], [0,1]),0)
        for (var char of this.chars_u){
            char.innerHTML = mix_arrays(this.text, texty, factor)[this.chars_u.indexOf(char)].replace(' ', '\u00A0')
            char.innerHTML = mix_arrays(this.text, texty, factor)[this.chars_u.indexOf(char)].replace(' ', '\u00A0')
        }
        for (var char of this.chars_d){
            char.innerHTML = mix_arrays(this.text, texty, factor)[this.chars_d.indexOf(char)].replace(' ', '\u00A0')
            char.innerHTML = mix_arrays(this.text, texty, factor)[this.chars_d.indexOf(char)].replace(' ', '\u00A0')
        }
        this.prev_e = lerp(this.prev_e, e.x, .5);
        
    }
    simCharacters(){
        var over = {
            u:1
        }
        var mouseX = -9999; var mouseY = -9999;
        this.element.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY
        })
        this.element.addEventListener('mouseleave', (e) => {
            mouseX = -9999;
            mouseY = -9999;
            anime({
                targets: over,
                u:[0],
                duration:200,
                easing:'linear'
            })
        })
        this.element.addEventListener('mouseenter', (e) => {
            over.u=1
        })
        this.particles = []
        for (var char of this.chars_u){
            let p = new Particle(this.chars_u.indexOf(char))
            p.pos = {x:char.parentNode.getBoundingClientRect().x, y:char.parentNode.getBoundingClientRect().y}
            p.initial_pos = {x:char.parentNode.getBoundingClientRect().x, y:char.parentNode.getBoundingClientRect().y}
            p.element = char
            this.particles.push(p)
        }
        this.sim = new Verlet(this.particles);
        var sim = this.sim;
        var particless = this.particles;
        sim.loop(() => {
            var force = {x:0, y:0};
            var mousePosition = {x:mouseX, y:mouseY}
            sim.simulate(particless, (p) => {
                // var ppos = {
                //     x : (p.pos.x - parseFloat(sim.chars_u[p.id].getBoundingClientRect().width/2)),
                //     y : (p.pos.y - parseFloat(sim.chars_u[p.id].getBoundingClientRect().height/2)),
                // }
                var mouseForce = subVector(mousePosition, p.pos)
                var mouseDistance = distVector(p.pos, mousePosition)
                var originForce = subVector(p.initial_pos, p.pos)
                var originDistance = distVector(p.initial_pos, p.pos)
                if (mouseDistance < 200){
                    force = scaleVector(mouseForce, -scale(mouseDistance, [200, 0], [0, 50]))
                } else {
                    force = scaleVector(originForce, scale(originDistance, [200, 0], [230, 330]))
                }
                return force
            }, null)
            sim.forEach(particless, (p) => {
                p.renderElement(p.element)
            });
        });
        
        
    }
}

export {
    TextAnim
}