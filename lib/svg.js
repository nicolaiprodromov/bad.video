
const lerp = (x, y, a) => {
    return x * (1 - a) + y * a
}
const scale = (value, r1, r2) => { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
const addVector = (vector1, vector2) => {
    return {x:vector1.x + vector2.x, y:vector1.y + vector2.y}
}
const subVector = (vector1, vector2) => {
    return {x:vector1.x - vector2.x, y:vector1.y - vector2.y}
}
const multVector = (vector1, vector2) => {
    return {x:vector1.x * vector2.x, y:vector1.y * vector2.y}
}
const scaleVector = (vector1, scalar) => {
    return {x:vector1.x * scalar, y:vector1.y * scalar}
}
const mixVector = (vector1, vector2, factor) =>{
    return {x:lerp(vector1.x, vector2.x, factor), y:lerp(vector1.y, vector2.y, factor)}
}
const lengthVector = (vector1) => {
    return Math.sqrt(Math.pow(vector1.x, 2) + Math.pow(vector1.y, 2));
}
const distVector = (vector1, vector2) => {
    return lengthVector(subVector(vector1, vector2));
}
class Paper{
  constructor(parent, sx = null, sy = null){
    if (sx === null || sy === null){
      this.paper = new Raphael(parent)
    } else {
      this.paper = new Raphael(parent, sx, sy)
    }
    this.paths = {}
    this.parent = parent
    this.class_ = "paperPath"
    this.pos_ = {x:0,y:0};
    console.log("[PAPER] Scale:", this.paper.width, " x", this.paper.height, "| Position:", this.pos.x, " x",  this.pos.y, "|", parent.id)
    this.moving = false;
    this.moveX = 0
    this.moveY = 0;
    
  }
  parse_coords(id, coords, close = false){
    this.paths[id].coord_string = ''
    for (var coord of coords){
      if (coord.cmd == 'Move'){
        this.paths[id].coord_string += 'M' + coord.x + ',' + coord.y
      }
      else if (coord.cmd == 'RMove'){
        this.paths[id].coord_string += 'm' + coord.x + ',' + coord.y
      }
      else if (coord.cmd == 'Line'){
        this.paths[id].coord_string += 'L' + coord.x + ',' + coord.y
      }
      else if (coord.cmd == 'CubicBezier'){
        this.paths[id].coord_string += 'C' + coord.c1x + ' ' + coord.c1y + ',' + coord.c2x + ' ' + coord.c2y + ',' + coord.x + ' ' + coord.y
      }
      else if (coord.cmd == 'RLine'){
        this.paths[id].coord_string += 'l' + coord.x + ',' + coord.y
      }
      else if (coord.cmd == 'RCubicBezier'){
        this.paths[id].coord_string += 'c' + coord.c1x + ' ' + coord.c1y + ',' + coord.c2x + ' ' + coord.c2y + ',' + coord.x + ' ' + coord.y
      }
      else if (coord.cmd == 'Close'){
        this.paths[id].coord_string += 'Z'
      }
      else if (coord.cmd == 'RClose'){
        this.paths[id].coord_string += 'Z'
      }
      
    }
    
  }
  rparse_coords(coords, close = false){
    var coord_string = ''
    for (var coord of coords){
      if (coord.cmd == 'Move'){
        coord_string += 'M' + coord.x + ',' + coord.y
      }
      if (coord.cmd == 'RMove'){
        coord_string += 'm' + coord.x + ',' + coord.y
      }
      else if (coord.cmd == 'Line'){
        coord_string += 'L' + coord.x + ',' + coord.y
      }
      else if (coord.cmd == 'CubicBezier'){
        coord_string += 'C' + coord.c1x + ' ' + coord.c1y + ',' + coord.c2x + ' ' + coord.c2y + ',' + coord.x + ' ' + coord.y
      }
      else if (coord.cmd == 'RLine'){
        coord_string += 'l' + coord.x + ',' + coord.y
      }
      else if (coord.cmd == 'RCubicBezier'){
        coord_string += 'c' + coord.c1x + ' ' + coord.c1y + ',' + coord.c2x + ' ' + coord.c2y + ',' + coord.x + ' ' + coord.y
      }
      else if (coord.cmd == 'Close'){
        coord_string += 'Z'
      }
      else if (coord.cmd == 'RClose'){
        coord_string += 'z'
      }
      
    }
    return coord_string
  }
  mixVector(vector1, vector2, factor){
  
    if (vector2.cmd == "Move"){
        var vector3 = {cmd:"Move", x:0, y:0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = vector2.x
          vector3.y = vector2.y
        } else {
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        }
    } else if (vector2.cmd == "RMove"){
        var vector3 = {cmd:"RMove", x:0, y:0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = vector2.x
          vector3.y = vector2.y
        } else {
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        }
    }else if (vector2.cmd == "Line"){
        var vector3 = {cmd:"Line", x:0, y:0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = vector2.x
          vector3.y = vector2.y
        } else {
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        }
    }else if (vector2.cmd == "RLine"){
        var vector3 = {cmd:"RLine", x:0, y:0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = vector2.x
          vector3.y = vector2.y
        } else {
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        }       
    } else if (vector2.cmd == "CubicBezier"){
        var vector3 = {cmd:"CubicBezier", x:0, y:0, c1x:0, c1y:0, c2x: 0, c2y: 0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = vector2.x
          vector3.y = vector2.y
          vector3.c1x = vector2.c1x
          vector3.c1y = vector2.c1y
          vector3.c2x = vector2.c2x
          vector3.c2y = vector2.c2y
        } else if (vector1.cmd == "Line" || vector1.cmd == "RLine" || vector1.cmd == "Move" || vector1.cmd == "RMove"){
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
          vector3.c1x = vector2.c1x
          vector3.c1y = vector2.c1y
          vector3.c2x = vector2.c2x
          vector3.c2y = vector2.c2y
        } else if (vector1.cmd == "CubicBezier" || vector1.cmd == "RCubicBezier"){
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
          vector3.c1x = lerp(vector1.c1x, vector2.c1x, factor)
          vector3.c1y = lerp(vector1.c1y, vector2.c1y, factor)
          vector3.c2x = lerp(vector1.c2x, vector2.c2x, factor)
          vector3.c2y = lerp(vector1.c2y, vector2.c2y, factor)
        }
    } else if (vector2.cmd == "RCubicBezier"){
        var vector3 = {cmd:"RCubicBezier", x:0, y:0, c1x:0, c1y:0, c2x: 0, c2y: 0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = vector2.x
          vector3.y = vector2.y
          vector3.c1x = vector2.c1x
          vector3.c1y = vector2.c1y
          vector3.c2x = vector2.c2x
          vector3.c2y = vector2.c2y
        } else if (vector1.cmd == "Line" || vector1.cmd == "RLine" || vector1.cmd == "Move" || vector1.cmd == "RMove"){
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
          vector3.c1x = vector2.c1x
          vector3.c1y = vector2.c1y
          vector3.c2x = vector2.c2x
          vector3.c2y = vector2.c2y
        } else if (vector1.cmd == "CubicBezier" || vector1.cmd == "RCubicBezier"){
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
          vector3.c1x = lerp(vector1.c1x, vector2.c1x, factor)
          vector3.c1y = lerp(vector1.c1y, vector2.c1y, factor)
          vector3.c2x = lerp(vector1.c2x, vector2.c2x, factor)
          vector3.c2y = lerp(vector1.c2y, vector2.c2y, factor)
        }
    }else if (vector2.cmd == "Close"){
        var vector3 = {cmd:"Close", x:0, y:0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        } else {
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        }
    }else if (vector2.cmd == "RClose"){
        var vector3 = {cmd:"RClose", x:0, y:0}
        if (vector1.cmd == "Close" || vector1.cmd == "RClose"){
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        } else {
          vector3.x = lerp(vector1.x, vector2.x, factor)
          vector3.y = lerp(vector1.y, vector2.y, factor)
        }
    }


    return vector3
}
  mixCoords(id, coords1, coords2, factor){

    var adj_v1 = [];
    var adj_v2 = [];
    var rv = [];
    var check_rv = [false, false];
    var grt;

    if (coords1.length > coords2.length) {
        adj_v1 = coords1.slice(0, coords2.length)
        adj_v2 = coords2
        rv = coords1.slice(coords2.length, coords1.length)
        check_rv = [true, true]
        grt = coords2.length
    } else if (coords1.length < coords2.length){
        adj_v1 = coords1
        adj_v2 = coords2.slice(0, coords1.length)
        rv = coords2.slice(coords1.length, coords2.length)
        check_rv = [true, false]
        grt = coords1.length
    } else if (coords1.length == coords2.length){
        adj_v1 = coords1
        adj_v2 = coords2
        rv = null
        check_rv = [false, false]
        grt = coords1.length
    }

    let coords3 = []
    for (var c = 0; c < grt; c++){
        coords3.push(this.mixVector(adj_v1[c], adj_v2[c], factor))
    }

    if (check_rv[0] == true){
        let coords3_rv = []
        var bx = this.paths[id].bw

        for (var c = 0; c < rv.length; c++){
            
            var center = {
              cmd:"CubicBezier",
              x:this.paths[id].bx,
              y:this.paths[id].by,
              c1x:this.paths[id].bx,
              c1y:this.paths[id].by,
              c2x:this.paths[id].bx,
              c2y:this.paths[id].by,
            }
            coords3_rv.push(this.mixVector(center, rv[c], factor))
        }
        coords3 = coords3.concat(coords3_rv)
    }
    
    return coords3
}
  mergeCoords(list1, list2, threshold){
    let list3 = list1.slice(0,scale(threshold,[0,1],[0,list1.length])).concat(list2.slice(scale(threshold,[0,1],[0,list2.length], list2.length)))
    return list3
  }
  makePath(id, coords, close = false){
    this.paths[id] = this.paper.path('')
    this.paths[id].node.setAttribute('class', this.class_)
    this.paths[id].node.setAttribute('id', this.parent.id + "_path_" + id)
    this.paths[id].node.setAttribute('stroke-milterlimit', 10)
    this.paths[id].coord_string = ''
    this.paths[id].coords = coords
    this.paths[id].frame = 0
    this.paths[id].ocs = ''
    
    this.parse_coords(id, coords, close)
    this.paths[id].ocs = this.rparse_coords(coords)
    
    this.paths[id].attr('path', this.paths[id].coord_string)
    
  }
  updatePath(id, coords, close = false){
    this.paths[id].coord_string = ''
    this.paths[id].coords = coords
    this.parse_coords(id, coords, close)
    this.paths[id].attr('path', this.paths[id].coord_string)
  }
  makeSPath(id, path_s){
    this.paths[id] = this.paper.path(path_s)
    this.paths[id].node.setAttribute('class', this.class_)
    this.paths[id].node.setAttribute('id', id)
    this.paths[id].node.setAttribute('stroke-milterlimit', 0)
    this.paths[id].coord_string = path_s
    this.paths[id].coords = []
    this.paths[id].frame = 0
  }
  updateSPath(id, path_s){
    this.paths[id].attr('path', path_s)
    this.paths[id].coord_string = path_s
    this.paths[id].coords = []
  }
  _getPointOnPath(path, factor){
    var point_ = Raphael.getPointAtLength(path, scale(factor, [0,1], [0, Raphael.getTotalLength(path)]))
    return point_
  }
  elementFollowPath(path, el, range, time, easing = 'linear', loop = false, delay = 0, autoplay = false){
    let empty = {
      u : range[0]
    }
    const _animation = anime({
      loop : loop,
      autoplay : autoplay,
      targets : empty,
      u: range,
      duration : time,
      delay : delay,
      easing : easing,
      update : () => {
        if (el.length > 1){
          for (var e=0; e<el.length;e++){
            let position = this._getPointOnPath(path, empty.u - (delay*e)*scale(empty.u,[0,1],[1,0]))
            el[e].style.left = this.pos.x + position.x + 'px'
            el[e].style.top = this.pos.y + position.y + 'px'
          }
        } else {
          let position = this._getPointOnPath(path, empty.u)
          el.style.left = this.pos.x + position.x + 'px'
          el.style.top = this.pos.y + position.y + 'px'
        }
        
      }
    })
    return _animation
  }
  trimPath(id, factor){
    var sub_path = Raphael.getSubpath(this.paths[id].attr('path'), 0, scale(factor, [0,1], [0,Raphael.getTotalLength(this.paths[id].attr('path'))]))
    this.paths[id].attr('path', sub_path)
    this.paths[id].coords_string = sub_path
  }
  samplePath(id, step = 3){
    
    this.paths[id].bbox = this.paths[id].getBBox()
    this.paths[id].bx   = this.paths[id].bbox.width/2;
    this.paths[id].by   = this.paths[id].bbox.height/2;

    this.paths[id].sub_paths = []
    this.paths[id].line_pos  = []

    this.paths[id].lengthPath = Raphael.getTotalLength(this.paths[id].attr('path'))

    for (let i = 0; i < 1000; i+=step){
      this.paths[id].sub_paths.push( this.paths[id].getSubpath( 0, scale(i, [0,1000],[0,this.paths[id].lengthPath]) ) )

      var lp = this._getPointOnPath(this.paths[id].attr('path'), scale(i, [0, this.paths[id].lengthPath], [0, 1]))
      this.paths[id].line_pos.push({x: lp.x, y: lp.y})
    }

  }
  animatePath(id, frame, fstep){
    if (frame < this.paths[id].sub_paths.length){

      this.paths[id].attr('path', this.paths[id].sub_paths[frame]);

      if (frame > this.paths[id].sub_paths.length-2*fstep){
        this.paths[id].attr('path', this.paths[id].coord_string)
      }
      else if (frame < 2*fstep){
        this.paths[id].attr('path', '')
      }

    }
  }
  animPath(instance, id, fstep, reset = false, reverse = false){
    if (reverse) {
      instance.paths[id].frame = instance.paths[id].sub_paths.length
    } else { instance.paths[id].frame = 0 }
    const mainLoop = () => {
      
      var cont = true
      
      instance.animatePath(id, instance.paths[id].frame, fstep);
      
      if (reverse){
        instance.paths[id].frame-=fstep;
      } else {
        instance.paths[id].frame+=fstep;
      }

      if (reset != false){
        if (instance.paths[id].frame > reset){
          instance.paths[id].frame = 0
        }
      } else {
        if (instance.paths[id].frame > instance.paths[id].sub_paths.length){
          cont = false
        } else if (instance.paths[id].frame < 0){
          cont = false
        }
      }
      
      if (cont == true){
        requestAnimationFrame(mainLoop)
      }
    }
    requestAnimationFrame(mainLoop);
  }
  forEach(callback){
    for (var i = 0; i< Object.keys(this.paths).length; i++){
      callback(this.paths[i], i);
    }
  }
  animPath1(instance, id, factor, duration, padding = 10){
    const start = performance.now();
    
    const max_length = instance.paths[id].sub_paths.length
    
    const step = function () {
      
      const now = performance.now();
      const delta = Math.min((now - start) / duration, 1);
      
      instance.animatePath(id, Math.trunc(scale(delta, [0,1], [0,max_length*factor])), padding);
      
      if (delta < 1) {
        requestAnimationFrame(step);
      }
    };
    step();
  }
  animPath2(instance, id, range, duration, easing = 'easeInOutQuad', padding = 10){
    const max_length = instance.paths[id].sub_paths.length
    var full_path = instance.paths[id]
    var full_str = instance.paths[id].attr('path')
    var empty = {
      u : range[0]
    }
    var anim = anime({
      targets : empty,
      u: range,
      duration : duration,
      easing: easing,
      update : function(){
        instance.animatePath(id, Math.trunc(scale(empty.u,[0,1],[0,max_length])), padding);
        //instance.paths[id].attr( 'path', full_path.getSubpath( 0, scale(empty.u,[0,1],[0,full_path.getTotalLength()]) ) )
      }
    })
    return anim
  }
  makeRelative(id){
    
    var pathy = this.parsePathStr(Raphael.pathToRelative(this.paths[id].attr('path')))
    this.updatePath(id, pathy)
  }
  rmakeRelative(path){
    //console.log(this.parsePathStr(Raphael.pathToRelative(this.paths[id].attr('path').toString()).toString()))
    var coord_string = this.rparse_coords(this.parsePathStr(Raphael.pathToRelative(path)))
    return coord_string
  }
  parsePath(id){
    var cmds = Raphael.parsePathString(this.paths[id].attr('path').toString())
    var cmd_d = {}
    var index = 0;
    for (var cmd of cmds){
        cmd_d[index] = {}
        if (cmd[0] == "L"){
            cmd_d[index]["cmd"] = "Line"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "M"){
            cmd_d[index]["cmd"] = "Move"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "m"){
            cmd_d[index]["cmd"] = "RMove"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "Z"){
            cmd_d[index]["cmd"] = "Close"
        }
        else if (cmd[0] == "z"){
            cmd_d[index]["cmd"] = "RClose"
        }
        else if (cmd[0] == "C"){
            cmd_d[index]["cmd"] = "CubicBezier"
            cmd_d[index]['c1x'] = cmd[1]
            cmd_d[index]['c1y'] = cmd[2]
            cmd_d[index]['c2x'] = cmd[3]
            cmd_d[index]['c2y'] = cmd[4]
            cmd_d[index]['x'] = cmd[5]
            cmd_d[index]['y'] = cmd[6]
        }
        else if (cmd[0] == "l"){
            cmd_d[index]["cmd"] = "RLine"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "c"){
            cmd_d[index]["cmd"] = "RCubicBezier"
            cmd_d[index]['c1x'] = cmd[1]
            cmd_d[index]['c1y'] = cmd[2]
            cmd_d[index]['c2x'] = cmd[3]
            cmd_d[index]['c2y'] = cmd[4]
            cmd_d[index]['x'] = cmd[5]
            cmd_d[index]['y'] = cmd[6]
        }
        
        index ++;
    }
    return cmd_d
  }
  parsePathStr(str){
    var cmds = Raphael.parsePathString(str)
    var cmd_d = []
    var index = 0;
    for (var cmd of cmds){
        cmd_d[index] = {}
        if (cmd[0] == "L"){
            cmd_d[index]["cmd"] = "Line"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "M"){
            cmd_d[index]["cmd"] = "Move"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "m"){
            cmd_d[index]["cmd"] = "RMove"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "Z"){
            cmd_d[index]["cmd"] = "Close"
            cmd_d[index]['x'] = 0
            cmd_d[index]['y'] = 0
        }
        else if (cmd[0] == "z"){
            cmd_d[index]["cmd"] = "RClose"
            cmd_d[index]['x'] = 0
            cmd_d[index]['y'] = 0
        }
        else if (cmd[0] == "C"){
            cmd_d[index]["cmd"] = "CubicBezier"
            cmd_d[index]['c1x'] = cmd[1]
            cmd_d[index]['c1y'] = cmd[2]
            cmd_d[index]['c2x'] = cmd[3]
            cmd_d[index]['c2y'] = cmd[4]
            cmd_d[index]['x'] = cmd[5]
            cmd_d[index]['y'] = cmd[6]
        }
        else if (cmd[0] == "l"){
            cmd_d[index]["cmd"] = "RLine"
            cmd_d[index]['x'] = cmd[1]
            cmd_d[index]['y'] = cmd[2]
        }
        else if (cmd[0] == "c"){
            cmd_d[index]["cmd"] = "RCubicBezier"
            cmd_d[index]['c1x'] = cmd[1]
            cmd_d[index]['c1y'] = cmd[2]
            cmd_d[index]['c2x'] = cmd[3]
            cmd_d[index]['c2y'] = cmd[4]
            cmd_d[index]['x'] = cmd[5]
            cmd_d[index]['y'] = cmd[6]
        }
        
        index ++;
    }
    return cmd_d
  }
  move(id, pos, vel = {x:0,y:0}, center = false){
   

    this.paths[id].moving = true;

    this.paths[id].moveX = 0
    this.paths[id].moveY = 0;

    if (center){
        this.paths[id].moveX = (pos.x - (this.paths[id].getBBox().x + this.paths[id].getBBox().width/2))
        this.paths[id].moveY = (pos.y - (this.paths[id].getBBox().y + this.paths[id].getBBox().height/2))
    } else {
        this.paths[id].moveX = pos.x
        this.paths[id].moveY = pos.y
    }

    
    let pathy_begin = this.parsePathStr(this.paths[id].coord_string)

    // var magic_value = scale(Math.abs(vel.x), [1,0], [0,1])

    for (let pth of pathy_begin){
      pth.x += this.paths[id].moveX
      pth.y += this.paths[id].moveY 
      pth.c1x += this.paths[id].moveX
      pth.c1y += this.paths[id].moveY
      pth.c2x += this.paths[id].moveX
      pth.c2y += this.paths[id].moveY

    }
    

    this.updatePath(id, pathy_begin)

    //this.paths[id].translate(vel.x, vel.y)
    
    // document.getElementById(id).parentNode.setAttribute('x', moveX)
    // document.getElementById(id).parentNode.setAttribute('y', moveY)
  }
  moveParent1(id, pos, center = false){
    this.paths[id].moving = true;

    this.paths[id].moveX = 0
    this.paths[id].moveY = 0;

    if (center){
        this.paths[id].moveX = (pos.x - this.paths[id].svg_parent.getBoundingClientRect().width/2)
        this.paths[id].moveY = (pos.y - this.paths[id].svg_parent.getBoundingClientRect().height/2)
    } else {
        this.paths[id].moveX = pos.x
        this.paths[id].moveY = pos.y
    }
    this.paths[id].svg_parent.setAttribute('x', this.paths[id].moveX)
    this.paths[id].svg_parent.setAttribute('y', this.paths[id].moveY)
  }
  moveRel(id, pos, center = false){

    this.paths[id].moving = true;

    this.paths[id].moveX = 0
    this.paths[id].moveY = 0;

    if (center){
        this.paths[id].moveX = pos.x - this.paths[id].getBBox().width/2
        this.paths[id].moveY = pos.y - this.paths[id].getBBox().height/2
    } else {
        this.paths[id].moveX = pos.x
        this.paths[id].moveY = pos.y
    }

    var pathy_begin = this.parsePathStr(this.paths[id].coord_string)
    

    var it = 0
    for (let pth of pathy_begin){

      pth.x = pth.x

      it++;
    }

    pathy_begin[0].x = this.paths[id].moveX
    pathy_begin[0].y = this.paths[id].moveY
    
    this.updatePath(id, pathy_begin, 0)

  }
  pop(id, w = null, h = null){
    var this_node = document.getElementById(this.parent.id + "_path_" + id)
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //this.parent.getBoundingClientRect().width
    svg.setAttribute('width',  this.paths[id].getBBox().width);
    svg.setAttribute('height', this.paths[id].getBBox().height);
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute('id', "pp" + id);
    svg.setAttribute('class', "pp");
    if (w === null || h === null){
      svg.setAttribute('viewBox', "0 0 " + (this.paths[id].getBBox().width + 10) + " " + (this.paths[id].getBBox().height + 10));
    } else {
      svg.setAttribute('viewBox', "0 0 " + w + " " + h);
    }
    this.paths[id].svg_parent = svg;
    

    
    this_node.parentNode.appendChild(svg)

    svg.appendChild(this_node)
  }
  animateToPath(id, coords, range, duration, easing = 'easeInOutQuad', loop = false){
    var empty = {
        u : range[0]
    }
    anime({
        targets:empty,
        u:range,
        duration:duration,
        easing: easing,
        update: () => {
            
          if (this.paths[id].moving == true) {
              for (var coord of coords){
                  coord[0].x = this.paths[id].moveX
                  coord[0].y = this.paths[id].moveY
              }
          }

          if (empty.u < 1){
              this.updatePath(id, this.mixCoords(id, coords[0], coords[1], empty.u))
          } else if (empty.u < 2 && empty.u > 1){
              this.updatePath(id, this.mixCoords(id, coords[1], coords[2], scale(empty.u,[1,2],[0,1])))
          }else if (empty.u < 3 && empty.u > 2){
              this.updatePath(id, this.mixCoords(id, coords[2], coords[3], scale(empty.u,[2,3],[0,1])))
          }else if (empty.u < 4 && empty.u > 3){
              this.updatePath(id, this.mixCoords(id, coords[3], coords[4], scale(empty.u,[3,4],[0,1])))
          }else if (empty.u < 5 && empty.u > 4){
              this.updatePath(id, this.mixCoords(id, coords[4], coords[5], scale(empty.u,[4,5],[0,1])))
          }else if (empty.u < 6 && empty.u > 5){
              this.updatePath(id, this.mixCoords(id, coords[5], coords[6], scale(empty.u,[5,6],[0,1])))
          }
      },
        loop:loop
    })
  }
  coordsMakeRelative(coords){
    return this.parsePathStr(this.rmakeRelative(this.rparse_coords(coords)))
  }
  scalePath(id, scaleX = 1, scaleY = 1){
    if (arguments.length == 2){
      this.paths[id].scale(scaleX, scaleX)
    } else if (arguments.length == 3){
      this.paths[id].scale(scaleX, scaleY)
    }
    
  }
  #pos = {x:0,y:0}
  #scale = {x:0,y:0}
  moveParent(pos){
    this.parent.style.left = pos.x + "px"
    this.parent.style.top = pos.y + "px"
  }
  scaleParent(scale){
    this.parent.style.width = scale.x + "px"
    this.parent.style.height = scale.y + "px"
    this.paper.setSize(scale.x, scale.y)
  }
  set pos(pos){
    this.moveParent(pos)
    this.pos_ = this.#pos
    this.#pos = pos
  }
  get pos(){
    return this.#pos
  }
  set scale(scale){
    this.scaleParent(scale)
    this.#scale = scale
  }
  get scale(){
    return this.#scale
  }
}
class Verlet {

    constructor(particles, initial_pos = {x:0,y:0}, initial_vel = {x:0, y:0}){
      this.run = true;
      this.lock_to_path = {}
      this.last_click = {}
      this.vel  = {};
      this.pos  = {};
      this.dpos = {};
      this.forces = {};
      this.tdist = []
      for (var particle of particles){
          this.vel[particle.id] = initial_vel
          this.pos[particle.id] = initial_pos
          this.dpos[particle.id] = initial_pos
          this.forces[particle.id] = {x:0,y:0}
          this.tdist[particle.id] = {x:0,y:0}
          this.lock_to_path[particle.id] = 0;
          this.last_click[particle.id] = {x:0,y:0}
      }
      this.frame = 0;
      this.loop_frame = null;
    }
    forEach(particles, callback){
        for (var particle of particles){
            callback(particle)
        }
    }
    forcesSim(particles, callback){
        for (var particle of particles){
            
            this.forces[particle.id] = callback(particle);

        }
        return this.forces
    }
    simulate(particles, forcesCallback, lockData = null){

        var forces_sim = this.forcesSim(particles, forcesCallback)

        for (var particle of particles){

            this.pos[particle.id] = particle.pos;
            
            this.vel[particle.id] = subVector(this.pos[particle.id], this.dpos[particle.id]);
            this.vel[particle.id] = addVector(this.vel[particle.id], forces_sim[particle.id]);

            this.pos[particle.id] = addVector(this.pos[particle.id], scaleVector(this.vel[particle.id], 0.001));

            if (lockData != null){
              if (lockData.id == -1){
                this.lock(particle.id, lockData.paper, particle.id, lockData.callback)
              } else {
                this.lock(particle.id, lockData.paper, lockData.id, lockData.callback)
              }
            }

            particle.pos = this.pos[particle.id]
            particle.vel = scaleVector(this.vel[particle.id], 0.001)

            this.dpos[particle.id] = this.pos[particle.id];

        }   
    }
    loop(callback){
        const loopy = () => {
            callback();
            if (this.run){
              if (this.loop_frame !== null){
                this.frame = this.frame < this.loop_frame ? this.frame + 1 : 0
              } else {
                this.frame = this.frame < Number.MAX_VALUE ? this.frame + 1 : 0
              }
              requestAnimationFrame(loopy);
            }
        }   
        loopy()
    }
    distanceToPath(particleId, paper, pathID){
        this.tdist[particleId] = []
        for (var lp of paper.paths[pathID].line_pos){
            this.tdist[particleId].push(distVector(this.pos[particleId], lp))
        }
    }
    lock(particleId, paper, pathID, callback){
        this.distanceToPath(particleId, paper, pathID)
        this.pos[particleId] = mixVector(this.pos[particleId], paper.paths[pathID].line_pos[this.tdist[particleId].indexOf(Math.min(...this.tdist[particleId]))], this.lock_to_path[particleId])
        callback(particleId, paper, pathID);
    }
    sumForces(forces){
      let forcesss = {x:0,y:0}
      for (var force of forces){
        forcesss = addVector(forcesss, force)
      }
      return forcesss
    }
}
class Particle {
    constructor(id){
        this.id = id
        this.pos = {x: 0, y:0};
        this.vel = {x: 0, y:0};
        this.element = null;
    }
    render(paperInstance, pathId, callback = () => {}){
        paperInstance.moveRel(pathId, this.pos, true)
        //paperInstance.move(pathId, this.pos, this.vel, false)
        callback(paperInstance, pathId, this.pos);
    }
    renderElement(element){
        element.style.left = (this.pos.x - parseFloat(element.parentNode.getBoundingClientRect().x)) + "px";
        element.style.top  = (this.pos.y - parseFloat(element.parentNode.getBoundingClientRect().y))+ "px";
    }
    renderElementClean(element){
      element.style.left = this.pos.x + "px";
      element.style.top  = this.pos.y + "px";
    }
}






// const railsd = document.getElementById('rails')
// var rails = new Paper(railsd)



// rails.makePath(0, asset6)

// var _transformedPath = Raphael.transformPath(rails.rparse_coords(asset7), 'T0,0');
// rails.paths[0].animate({path : _transformedPath}, 500)

// rails.forEach((path, id) => {
//     rails.makeRelative(id)
//     rails.samplePath(id, 5)
//     rails.animPath2(rails, id, [0,1], 2000, 'easeInOutCirc')
// })

// asset1 = rails.coordsMakeRelative(asset1)
// asset2 = rails.coordsMakeRelative(asset2)
// asset3 = rails.coordsMakeRelative(asset3)
// asset4 = rails.coordsMakeRelative(asset4)
// asset5 = rails.coordsMakeRelative(asset5)

//rails.animateToPath(0, [asset1, asset2, asset3, asset4, asset5], [4,0,4], 800, 'easeInOutCirc', loop=true)

//rails.moveRel(0, {x:110, y:110}, false)


// const pp = document.getElementById('particles')
// var paper = new Paper(pp)

// var pth0 = [{cmd : "Move", x:0, y:0,},{cmd : "Move", x:54.72, y:4.5,},{cmd : "CubicBezier", c1x:  54.72, c1y:  19.47, c2x:  42.58, c2y:  31.61, x:27.61, y:31.61,},{cmd : "CubicBezier", c1x:  12.64, c1y:  31.61, c2x:  0.5, c2y:  19.48, x:0.5, y:4.5,},{cmd : "CubicBezier", c1x:  0.5, c1y:  -10.48, c2x: 
//     12.64, c2y:  21.39, x:27.61, y:21.39,},{cmd : "CubicBezier", c1x:  42.58, c1y:  21.39, c2x:  54.72, c2y:  -10.47, x:54.72, y:4.5,},{cmd : "Close",},]
// var pth3 = [{cmd : "Move", x:0, y:0,},{cmd : "Move", x:54.72, y:27.61,},{cmd : "CubicBezier", c1x:  54.72, c1y:  42.58, c2x:  42.58, c2y:  54.72, x:27.61, y:54.72,},{cmd : "CubicBezier", c1x:  12.64, c1y:  54.72, c2x:  0.5, c2y:  42.58, x:0.5, y:27.61,},{cmd : "CubicBezier", c1x:  0.5, c1y:  12.64, c2x:  12.64, c2y:  0.5, x:27.61, y:0.5,},{cmd : "CubicBezier", c1x:  42.58, c1y:  0.5, c2x:  54.72, c2y:  12.64, x:54.72, y:27.61,},{cmd : "Close",},]

// var pthy0 = paper.parsePathStr(paper.rmakeRelative(paper.rparse_coords(pth0)))
// var pthy1 = paper.parsePathStr(paper.rmakeRelative(paper.rparse_coords(pth3)))

// paper.makePath(0, pth3, true)
// paper.makePath(1, [{cmd:"Move",x:1,y:1},{cmd:"Line",x:60,y:1},{cmd:"Line",x:60,y:60},{cmd:"Line",x:1,y:60},{cmd:"Close"}], true)
// paper.makePath(2, [{cmd:"Move",x:0,y:0},{cmd:"Line",x:0,y:60}])
// paper.makePath(3, [{cmd:"Move",x:0,y:0},{cmd:"Line",x:330,y:60}])



// paper.forEach((path, id) => {
//     paper.pop(id)
//     paper.makeRelative(id)
//     paper.samplePath(id, 1)
//     //paper.animPath2(paper, id, [0,1], 2000 * ((id+1)/3))
// })



// //setInterval(() => {paper.animateToPath(0, [pthy0, pthy1], [1,0,1], 1000, 'easeInOutCirc')}, 1000)






// var particles = []
// var particle_nr = Object.keys(paper.paths).length;
// for (var i = 0; i < particle_nr; i++){
//     particles.push(new Particle(i))
// }

// var mouseX = 0; var mouseY = 0;
// window.addEventListener('mousemove', (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY
// })




// const simulation = new Verlet(particles, {x:mouseX,y:mouseY})

// simulation.loop(() => {

//     rails.samplePath(0, 10);

//     var force = {x:0, y:0};
//     var mousePosition = {x:mouseX, y:mouseY}

//     var lockData = {
//         paper: rails,
//         id: 0,
//         callback:() => {}
//     }

//     simulation.forEach(particles, (p) => {
//         p.render(paper, p.id)
//     });


//     simulation.simulate(particles, (p) => {
//         var mouseForce = subVector(mousePosition, p.pos)
//         var mouseDistance = distVector(p.pos, mousePosition)
//         force = scaleVector(mouseForce, 44)
//         return force
//     }, lockData)

// });





// var empty_pp = {
//     u : 0
// }
// var clickyed = false;
// window.addEventListener('click', () => {
//   clickyed = !clickyed
//   if (clickyed == true){
//     anime({
//       targets : empty_pp,
//       u: [0,1],
//       duration:400,
//       easing:'easeInOutCirc',
//       update : () => {
//         for (var p of particles){
//             simulation.lock_to_path[p.id] = empty_pp.u
//         }
//       }
//     })
//   } else if (clickyed == false){
//     anime({
//       targets : empty_pp,
//       u: [1,0],
//       duration:300,
//       easing:'easeInOutCirc',
//       update : () => {
//         for (var p of particles){
//             simulation.lock_to_path[p.id] = empty_pp.u
//         }
//       }
//   })
//   }
//   simulation.last_click = {x:mouseX, y:mouseY}
// });

