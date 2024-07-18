



//------------------------------------------------
var mX = 0;
var mY = 0; 
var pmX = 0;
var pmY = 0;
var cp = 0;
var op = 0;
var mouse_x_scaled = [];
var drag_x = [];
var drag = [];
var down = [];
//------------------------------------------------

// Get elements
//------------------------------------------------
const bg         = document.querySelectorAll(".bg");
const dragy      = document.getElementById("dragy");
const horiz_pics = document.querySelectorAll(".horiz_pics")
var itemsss = [];
var indexy = 0;
for (let hp of horiz_pics){
    mouse_x_scaled.push(0);
    drag_x.push(0);
    drag.push(false);
    down.push(false);
    itemsss.push(document.querySelectorAll(".item" + indexy));
    indexy++;
}
//------------------------------------------------

//------------------------------------------------
const getScrollPercent = (el) => {
    var w  = parseFloat(window.getComputedStyle(el).width.replace('px',''))
    console.log(el.scrollTop, w)
    var percentage_raw = (100 * el.scrollLeft) / w;
    return Math.floor(percentage_raw);
}
const main_loop = (t) => {
    for (var hp = 0; hp < horiz_pics.length; hp++){

        //Get scroll rate
        //------------------------------------------------
        var np = 0;
        cp = drag_x[hp];
        np = cp - op;
        op = drag_x[hp];
        //------------------------------------------------
        // Move bg right on scroll
        //------------------------------------------------
        bg[hp].animate(
            [{left : -drag_x[hp] + "%" }], 
            {duration : 1000, fill: "forwards"}
        );
        //------------------------------------------------
        // Rotate items
        //------------------------------------------------
        for (let item of itemsss[hp]){
            // Rotate divs
            item.animate(
                [{rotate : np/60 + "deg"}],
                {duration : 2000,fill : "forwards"}
            );
        }
        //------------------------------------------------
    }



    // // Show drag arrow only when dragging
    // //------------------------------------------------
    // if (down == true){
    // dragy.style.opacity = 100 + "%";
    // dragy.style.left = mX + "px";
    // dragy.style.top  = mY + "px";
    // }
    // else {
    // dragy.style.opacity = 0 + "%";
    // }

    // // Drag text arrows
    // dragy.animate(
    // [{fontSize : Math.abs(np)*2+10 + "px"}],
    // {duration : 2000, fill : "forwards"}
    // );

    // // // Determine which arrow to show
    // if (mX > pmX){
    // dragy.innerHTML = "🡢";
    // }
    // else if (mX == pmX){
    //     dragy.innerHTML = "🡢";
    //     dragy.style.fontSize = '20px';
    // }
    // else {
    // dragy.innerHTML = "🡠";
    // }
    // //------------------------------------------------

    // Set previous mouse pos
    pmX = mX;
    pmY = mY;

    window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);

window.addEventListener('mousemove', e => {
    mX = e.x;
    mY = e.y;
})

// Listen to mouse events on window
//------------------------------------------------
for (var hp = 0; hp < horiz_pics.length; hp++){



    horiz_pics[hp].setAttribute('data-id-hp', hp)

    horiz_pics[hp].addEventListener('mousedown', e => {
        down[e.currentTarget.getAttribute('data-id-hp')] = true;
    });
    horiz_pics[hp].addEventListener('mouseup', e => {
        down[e.currentTarget.getAttribute('data-id-hp')] = false;
        drag[e.currentTarget.getAttribute('data-id-hp')] = false;
    });
    horiz_pics[hp].addEventListener('mousemove', e => {

        var index = e.currentTarget.getAttribute('data-id-hp')

        if (down[index] == true || drag[index] == true){

            var horiz_pics_w = e.currentTarget.getBoundingClientRect().width

            mouse_x_scaled[index] = scale(e.x, [70,horiz_pics_w-70],[0,600]);

            drag_x[index] = Math.round(mouse_x_scaled[index]/100)*100;

            var window_scaled = scale(e.x, [0,horiz_pics_w],[0,horiz_pics_w*5])

            e.currentTarget.scrollTop = window_scaled;

            drag[index] = true;

        }

    });



    horiz_pics[hp].setAttribute('data-id-hp', hp)

    horiz_pics[hp].addEventListener('touchstart', e => {
        down[e.currentTarget.getAttribute('data-id-hp')] = true;
    }, {passive: true});
    horiz_pics[hp].addEventListener('touchend', e => {
        down[e.currentTarget.getAttribute('data-id-hp')] = false;
        drag[e.currentTarget.getAttribute('data-id-hp')] = false;
    }, {passive: true});
    horiz_pics[hp].addEventListener('touchmove', e => {
        var index = e.currentTarget.getAttribute('data-id-hp')
        if (down[index] == true || drag[index] == true){
            var horiz_pics_w = parseFloat(window.getComputedStyle(e.currentTarget).width.replace("px",""))
            mouse_x_scaled[index] = scale(e.touches[0].clientX, [50,horiz_pics_w-50],[0,500]);
            drag_x[index] = Math.round(mouse_x_scaled[index]/100)*100;
            var window_scaled = scale(e.touches[0].clientX, [0,horiz_pics_w],[0,horiz_pics_w*5])
            e.currentTarget.scrollTop = window_scaled;
            drag[index] = true;
        }
    }, {passive: true});
}
//------------------------------------------------










//------------------------------------------------
window.addEventListener("wheel", e => e.preventDefault(), { passive:false })
window.addEventListener("touchmove", e => e.preventDefault(), { passive:false })
window.scrollTo(0,0)

var max_scroll = 6;
var modulo_scroll = 1;

var raw_scroll_amount = 0
var scroll_amount = 0;
var prev_scroll_amount = 0;

var clientX;
var clientY;
var dclientX;
var dclientY;
var diff = 0;
var SCROLL_TRACKER = new StateTracker(scroll_amount);

var sb_cells = document.querySelectorAll(".sb_cell.sb_cell_1")
for (var sbc of sb_cells){
    sbc.addEventListener('click', (e) => {
        var indexy = parseInt(e.currentTarget.id.replace("sb", ""));
        var e_e;
        if (indexy < sb_cells.length-1){
            indexy += 1
            scroll_amount = indexy
            e_e = {type:'wheel', deltaY:-1};
            page22_scroll_amount  = 0
        } else {
            scroll_amount = 6
            page22_scroll_amount  = 4
            e_e = {type:'wheel', deltaY:1};
        }
        page2_scroll_amount  = 0//map_s_amounts[indexy + 1]
        page7_scroll_amount  = 0//map_s_amounts[indexy + 1]
        page12_scroll_amount  = 0//map_s_amounts[indexy + 1]
        page17_scroll_amount  = 0//map_s_amounts[indexy + 1]
        //map_s_amounts[indexy + 1]
        scroll_to(e_e)
        page22_scroll_amount  = 0
        page2.style.left  = "0px"
        page7.style.left  = "0px"
        page12.style.left  = "0px"
        page17.style.left  = "0px"
        page22.style.left  = "0px"
    })
    
}
var sbc_cells = document.querySelectorAll(".sb_cell.sb_cell_2")
var page2  = document.querySelector("#i2")
var page7  = document.querySelector("#i7")
var page12 = document.querySelector("#i12")
var page17 = document.querySelector("#i17")
var page22 = document.querySelector("#i22")
var page2_scroll_amount = 0;
var page7_scroll_amount = 0;
var page12_scroll_amount = 0;
var page17_scroll_amount = 0;
var page22_scroll_amount = 0;

var scroll_easing = 'cubicBezier(.97,.01,.45,.99)'
var prev_ex = window.scrollY;

var empty = {
    x : 0,
    y : 0
}

// SELECT FIRST HOLDER
const __holder__ = document.querySelector(".holder")
// HORIZ AND VERT SCROLLING
const scrollV = (direction_) => {
    if (direction_ > 0){
        scroll_amount ++;
    } else if (direction_ < 0) {
        scroll_amount --;
    }
    let anim = anime({
        targets : empty,
        y : [__holder__.getBoundingClientRect().height*(prev_scroll_amount), __holder__.getBoundingClientRect().height*(scroll_amount)],
        duration: 150*(Math.abs(scroll_amount - prev_scroll_amount)+1),
        easing: scroll_easing,
        update : () => {
            document.body.style.top = -empty.y + "px"
        },
        complete:() =>{
            prev_ex = empty.y;
        }
    })
    
}
const scrollH = (direction_, element_, element_scroll) => {
    if (direction_ > 0){
        element_scroll++;
    } else if (direction_ < 0) {
        element_scroll--;
    }
    let anim = anime({
        targets : empty,
        x : [(element_.getBoundingClientRect().width/5)*(element_scroll)],
        duration: 200,
        easing: scroll_easing,
        update : () => {
            element_.style.left = -empty.x + "px"
        }
    })
    return element_scroll
    
}
// SCROLL FUNCTION
const scroll_to = (e) => {

    if (e.type == 'wheel'){

        diff = e.deltaY;

    } else if (e.type == 'touchend'){

        diff = -(e.changedTouches[0].clientY - clientY)
        
        if(Math.abs(diff) < 37){
            return null
        }

        var _now_ = new Date().getTime();
        //console.log(_now_ - TOUCH_TIME[0])
        if (_now_ - TOUCH_TIME[0] > 500){
            TOUCH_TIME[0] = 0;
            return null
        }

    }
    
    /*---------------------------------------------------------------:

            1.  raw_scroll_amount == raw scroll value 
                (scroll up ++, scroll down --)
            2.  raw_scroll_amount%modulo_scroll == scroll resistance - 
                the bigger the modulo the harder it is to change pages
            3.  scroll_amount == actual page nr

    -----------------------------------------------------------------*/

    if(raw_scroll_amount % modulo_scroll == 0){
        if(diff > 0){
            
            if (scroll_amount == 0){
                scrollV(1);
            }
            else if (scroll_amount == 1){
                scrollV(1);
            }

            else if (scroll_amount == 2 && page2_scroll_amount < 4){
                page2_scroll_amount = scrollH(1, page2, page2_scroll_amount)
            }
            else if (scroll_amount == 2 && page2_scroll_amount == 4){
                scrollV(1);
                setTimeout(() => {
                    page2.style.left = "0px"
                    page2_scroll_amount = scrollH(-1, page2, 1)
                }, 300)
            }
            
            else if (scroll_amount == 3 && page7_scroll_amount < 4){
                page7_scroll_amount = scrollH(1, page7, page7_scroll_amount)
            }
            else if (scroll_amount == 3 && page7_scroll_amount == 4){
                scrollV(1);
                setTimeout(() => {
                    page7.style.left = "0px"
                    page7_scroll_amount = scrollH(-1, page7, 1)
                }, 300)
            }

            else if (scroll_amount == 4 && page12_scroll_amount < 4){
                page12_scroll_amount = scrollH(1, page12, page12_scroll_amount)
            }
            else if (scroll_amount == 4 && page12_scroll_amount == 4){
                scrollV(1);
                setTimeout(() => {
                    page12.style.left = "0px"
                    page12_scroll_amount = scrollH(-1, page12, 1)
                }, 300)
            }

            else if (scroll_amount == 5 && page17_scroll_amount < 4){
                page17_scroll_amount = scrollH(1, page17, page17_scroll_amount)
            }
            else if (scroll_amount == 5 && page17_scroll_amount == 4){
                scrollV(1);
                setTimeout(() => {
                    page17.style.left = "0px"
                    page17_scroll_amount = scrollH(-1, page17, 1)
                }, 300)
            }

            else if (scroll_amount == 6 && page22_scroll_amount < 4){
                page22_scroll_amount = scrollH(1, page22, page22_scroll_amount)
            }
            else if (scroll_amount == 6 && page22_scroll_amount == 4){
                scrollV(1);
                setTimeout(() => {
                    page22.style.left = "0px"
                    page22_scroll_amount = scrollH(-1, page22, 1)
                }, 300)
            }
        }
        else if(diff < 0){
            if (scroll_amount == 1){
                scrollV(-1);
            }
            else if (scroll_amount == 2  && page2_scroll_amount == 0){
                scrollV(-1);
            }
            else if (scroll_amount == 2 && page2_scroll_amount > 0){
                page2_scroll_amount = scrollH(-1, page2, page2_scroll_amount)
            }

            else if (scroll_amount == 3 && page7_scroll_amount == 0){
                scrollV(-1);
            }
            else if (scroll_amount == 3 && page7_scroll_amount > 0){
                page7_scroll_amount = scrollH(-1, page7, page7_scroll_amount)
            }

            else if (scroll_amount == 4 && page12_scroll_amount == 0){
                scrollV(-1);
            }
            else if (scroll_amount == 4 && page12_scroll_amount > 0){
                page12_scroll_amount = scrollH(-1, page12, page12_scroll_amount)
            }

            else if (scroll_amount == 5 && page17_scroll_amount == 0){
                scrollV(-1);
            }
            else if (scroll_amount == 5 && page17_scroll_amount > 0){
                page17_scroll_amount = scrollH(-1, page17, page17_scroll_amount)
            }

            else if (scroll_amount == 6 && page22_scroll_amount == 0){
                scrollV(-1);
            }
            else if (scroll_amount == 6 && page22_scroll_amount > 0){
                page22_scroll_amount = scrollH(-1, page22, page22_scroll_amount)
            }

            else if (scroll_amount == 7){
                scrollV(-1);
            }
            
        }
    }
     
    SCROLL_TRACKER.def = [scroll_amount, page2_scroll_amount, page7_scroll_amount, page12_scroll_amount, page17_scroll_amount, page22_scroll_amount, diff]
    prev_scroll_amount = scroll_amount

    // ANIMATE SCROLL BAR
    for (var sbc of sb_cells){
        if(parseInt(sbc.id.split('sb')[1]) == scroll_amount && scroll_amount == 0){
            sbc.classList.add('sb_cell_highlight')
        }else if(parseInt(sbc.id.split('sb')[1]) == scroll_amount && scroll_amount == 1){
            sbc.classList.add('sb_cell_highlight')
        }else if(parseInt(sbc.id.split('sb')[1]) == scroll_amount && scroll_amount == 7){
            sbc.classList.add('sb_cell_highlight')
        }else if(parseInt(sbc.id.split('sb')[1]) == scroll_amount && scroll_amount >= 2 && scroll_amount < 7){
            sbc.classList.add('sb_cell_highlight')
        } else {
            sbc.classList.remove("sb_cell_highlight");
        }
    }
    for (var sbcc of sbc_cells){
        if( parseInt(sbcc.id.split('sbc0.')[1]) == page2_scroll_amount && scroll_amount == 2){
            sbcc.classList.add('sb_cell_highlight1')
        }
        else if( parseInt(sbcc.id.split('sbc1.')[1]) == page7_scroll_amount && scroll_amount == 3){
            sbcc.classList.add('sb_cell_highlight1')
        }
        else if( parseInt(sbcc.id.split('sbc2.')[1]) == page12_scroll_amount && scroll_amount == 4){
            sbcc.classList.add('sb_cell_highlight1')
        }
        else if( parseInt(sbcc.id.split('sbc3.')[1]) == page17_scroll_amount && scroll_amount == 5){
            sbcc.classList.add('sb_cell_highlight1')
        }
        else if( parseInt(sbcc.id.split('sbc4.')[1]) == page22_scroll_amount && scroll_amount == 6){
            sbcc.classList.add('sb_cell_highlight1')
        } else {
            sbcc.classList.remove("sb_cell_highlight1");
        }
    }
}
const scrollSection = (e) => {
    scroll_to(e)
}
const rawScrollSection = (e) => {
    raw_scroll_amount ++;
}
const debounce = function(fn, d) {
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, d);
    }
}

window.addEventListener('wheel', debounce(scrollSection, 150));
window.addEventListener('wheel', debounce(rawScrollSection, 150));


var TOUCH_TIME = []
window.addEventListener('touchstart', e => {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    TOUCH_TIME[0] = new Date().getTime();
})

window.addEventListener('touchend', debounce(scrollSection, 150));
window.addEventListener('touchend', debounce(rawScrollSection, 150));
//------------------------------------------------


let wheelEvent = new WheelEvent('wheel', {
    deltaY: -1,
    deltaMode: 1
  });

window.addEventListener('beforeunload', () => {
    scroll_amount = 1
    dispatchEvent(wheelEvent);
    window.scrollTo(0, 0);
})

window.addEventListener('load', () => {
    setTimeout( () => {

        const loader = document.querySelector("#loader")
        loader.style.display = 'none'

        var now1 = new Date().getTime();
        var page_load_time = now1 - performance.timing.navigationStart;
        console.log(`==============================> ✅✅✅ LOAD TIME: [${page_load_time} ms] ✅✅✅ <==============================`);

    }, PAGES_NPXYZ.length + 6000)
})


window.addEventListener('resize', () => {
    // SCREEN REPAIR ON RESIZE
    scroll_amount = 1
    page2_scroll_amount  = 0
    page7_scroll_amount  = 0
    page12_scroll_amount  = 0
    page17_scroll_amount  = 0
    page22_scroll_amount  = 0
    page2.style.left  = "0px"
    page7.style.left  = "0px"
    page12.style.left  = "0px"
    page17.style.left  = "0px"
    page22.style.left  = "0px"
    var e_e = {type:'wheel', deltaY:-1}
    scroll_to(e_e)
})