
// import { StateTracker } from "./lib/state_tracker.js";

(function () {
    var mqEvents = function (mediaChangeHandler) {
        var sheets = document.styleSheets;

        // Use the provided handler if present
        if (!mediaChangeHandler) {
            console.error('mqEvents needs a mediaChangeHandler to do its job.');
            return false;
        }

        for (var i = 0; i < sheets.length; i += 1) {
            var rules = sheets[i].cssRules;

            for (var j = 0; j < rules.length; j += 1) {
                // This Stackoverflow answer helped me figure out how
                // to check the type of object each rule was
                // http://stackoverflow.com/a/332429/368634
                if (rules[j].constructor === CSSMediaRule) {
                    var mql = window.matchMedia(rules[j].media.mediaText);
                    mql.addListener(mediaChangeHandler);
                    mediaChangeHandler(mql, sheets[i].href);
                }
            }
        }
    }

    // Yeah, this is a little shitty
    window.mqEvents = mqEvents;
}());


mqEvents((mql, source) => {
    var mql_map = {
        "null" : "LANDSCAPE DESKTOP",
        "screen and (min-width: 1280px) and (min-height: 100.001vw)" : "PORTRAIT DESKTOP",
        "screen and (max-width: 1280px) and (min-height: 100.001vw)" : "PORTRAIT MOBILE",
        "screen and (max-width: 1280px) and (min-width: 100vh)"  : "LANDSCAPE MOBILE",
    }
    if (mql.matches) {
        //console.log(`[MEDIA QUERY] ${mql_map[mql.media]} - ${source.split(/[/ ]+/).pop()}`)
        console.log(`[MEDIA QUERY] ${mql_map[mql.media]}`)
    }
    if (mql.matches == false) {
        //console.log(`[!] ${mql_map[mql.media]} - ${source.split(/[/ ]+/).pop()}`)
    }
})









const scale = (value, r1, r2) => { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
// DRAG SLIDER IMAGES
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
const bg         = document.querySelectorAll(".bg");
const dragy      = document.getElementById("dragy");
const horiz_pics = document.querySelectorAll(".horiz_pics")
var itemsss = [];
var indexy = 1;
for (let hp of horiz_pics){
    mouse_x_scaled.push(0);
    drag_x.push(0);
    drag.push(false);
    down.push(false);
    itemsss.push(document.querySelectorAll(".item" + indexy));
    indexy--;
}
const getScrollPercent = (el) => {
    var w  = parseFloat(window.getComputedStyle(el).width.replace('px',''))
    var percentage_raw = (100 * el.scrollLeft) / w;
    return Math.floor(percentage_raw);
}
const main_loop = (t) => {
    for (var hp = 0; hp < horiz_pics.length; hp++){
        //Get scroll rate
        var np = 0;
        cp = drag_x[hp];
        np = cp - op;
        op = drag_x[hp];
        //------------------------------------------------
        // Move bg right on scroll
        bg[hp].animate(
            [{left : -drag_x[hp] + "%" }], 
            {duration : 1000, fill: "forwards"}
        );
        //------------------------------------------------
        // Rotate items
        for (let item of itemsss[hp]){
            item.style.transform = `rotate(${drag_x[hp]/10}deg)`
        }
    }
    // Set previous mouse pos
    pmX = mX;
    pmY = mY;
    window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);
window.addEventListener('mousemove', e => {
    mX = e.x;
    mY = e.y;
}, false)
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
            mouse_x_scaled[index] = scale(e.x, [0,horiz_pics_w],[0,700]);
            drag_x[index] = mouse_x_scaled[index];
            console.log(mouse_x_scaled[index]);
            // var window_scaled = scale(e.x, [0,horiz_pics_w], [0,horiz_pics_w*7])
            // e.currentTarget.scrollTop = window_scaled;
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
            mouse_x_scaled[index] = scale(e.touches[0].clientX, [0,horiz_pics_w],[0,700]);
            drag_x[index] = mouse_x_scaled[index];
            // var window_scaled = scale(e.touches[0].clientX, [0,horiz_pics_w],[0,horiz_pics_w*5])
            // e.currentTarget.scrollTop = window_scaled;
            drag[index] = true;
        }
    }, {passive: true});
}
//---------------------------------------------------------------------------------------------------








// SCROLL INTERACTION
//---------------------------------------------------------------------------------------------------
window.addEventListener("wheel", e => e.preventDefault(), { passive:false })
window.addEventListener("touchmove", e => e.preventDefault(), { passive:false })
window.scrollTo(0,0)
var GLOBAL_SCROLL = 1;
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
var sbc_cells = document.querySelectorAll(".sb_cell_2")
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
            GLOBAL_SCROLL = GLOBAL_SCROLL >= 23 ? GLOBAL_SCROLL : GLOBAL_SCROLL + 1;
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

            // else if (scroll_amount == 6 && page22_scroll_amount < 4){
            //     page22_scroll_amount = scrollH(1, page22, page22_scroll_amount)
            // }
            //else if (scroll_amount == 6 && page22_scroll_amount == 4){
            else if (scroll_amount == 6){
                scrollV(1);
                setTimeout(() => {
                    page22.style.left = "0px"
                    page22_scroll_amount = scrollH(-1, page22, 1)
                }, 300)
            }
        }
        else if(diff < 0){
            GLOBAL_SCROLL = GLOBAL_SCROLL <= 0 ? 0 : GLOBAL_SCROLL - 1;
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
            // else if (scroll_amount == 6 && page22_scroll_amount > 0){
            //     page22_scroll_amount = scrollH(-1, page22, page22_scroll_amount)
            // }

            else if (scroll_amount == 7){
                scrollV(-1);
            }
            
        }
    }
     
    SCROLL_TRACKER.def = [scroll_amount, page2_scroll_amount, page7_scroll_amount, page12_scroll_amount, page17_scroll_amount, page22_scroll_amount, diff, GLOBAL_SCROLL]
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
        // else if( parseInt(sbcc.id.split('sbc4.')[1]) == page22_scroll_amount && scroll_amount == 6){
        //     sbcc.classList.add('sb_cell_highlight1')
        // }
        else {
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

// Throttle function for more responsive scrolling
const throttle = function(fn, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            fn.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Enhanced wheel event handling for macOS compatibility
let wheelEventData = {
    lastEventTime: 0,
    lastDeltaY: 0,
    consecutiveSmallEvents: 0,
    gestureTimeout: null,
    isInMomentum: false
};

const isRealUserInput = (e) => {
    const now = Date.now();
    const timeDiff = now - wheelEventData.lastEventTime;
    const deltaY = Math.abs(e.deltaY);
    
    // More aggressive momentum detection for macOS
    // Momentum events characteristics:
    // 1. Small deltaY values (usually < 20)
    // 2. Rapid succession (< 50ms between events)
    // 3. Often have fractional values
    // 4. Come in continuous streams
    
    const isSmallDelta = deltaY < 20;
    const isRapidSuccession = timeDiff < 50;
    const hasFractionalDelta = deltaY % 1 !== 0;
    
    // If we detect rapid small events, we're likely in momentum
    if (isSmallDelta && isRapidSuccession) {
        wheelEventData.consecutiveSmallEvents++;
        wheelEventData.isInMomentum = true;
    } else if (deltaY > 30 || timeDiff > 100) {
        // Large delta or long pause = likely real user input
        wheelEventData.consecutiveSmallEvents = 0;
        wheelEventData.isInMomentum = false;
    }
    
    // Clear momentum state after pause
    clearTimeout(wheelEventData.gestureTimeout);
    wheelEventData.gestureTimeout = setTimeout(() => {
        wheelEventData.isInMomentum = false;
        wheelEventData.consecutiveSmallEvents = 0;
    }, 150);
    
    wheelEventData.lastEventTime = now;
    wheelEventData.lastDeltaY = e.deltaY;
    
    // Only process if not in momentum or if this is a significant event
    return !wheelEventData.isInMomentum || (deltaY > 30 && !hasFractionalDelta);
};

const enhancedScrollSection = (e) => {
    // Add debugging for macOS
    if (isMacOS) {
        console.log(`Wheel event - deltaY: ${e.deltaY}, time: ${Date.now()}, momentum: ${wheelEventData.isInMomentum}`);
    }
    
    // Only process real user input, ignore momentum events
    if (isRealUserInput(e)) {
        scroll_to(e);
    }
};

const enhancedRawScrollSection = (e) => {
    if (isRealUserInput(e)) {
        raw_scroll_amount++;
    }
};

// Use platform-specific delays and strategy
const isMacOS = navigator.platform.toLowerCase().includes('mac');

if (isMacOS) {
    // For macOS, try immediate processing with momentum detection
    // This bypasses debounce/throttle completely
    let lastProcessTime = 0;
    const MIN_PROCESS_INTERVAL = 300; // Increase this to make scrolling less sensitive (was 200)
    
    const immediateScrollHandler = (e) => {
        const now = Date.now();
        const deltaY = Math.abs(e.deltaY);
        
        // Only process significant events with enough time gap
        if (deltaY > 30 && (now - lastProcessTime) > MIN_PROCESS_INTERVAL) { // Increase from 20 to 30 for less sensitivity
            console.log(`Processing immediate scroll - deltaY: ${e.deltaY}`);
            lastProcessTime = now;
            scroll_to(e);
            raw_scroll_amount++;
        }
    };
    
    window.addEventListener('wheel', immediateScrollHandler, {passive: true});
} else {
    // For other platforms, use throttle
    const THROTTLE_DELAY = 150;
    window.addEventListener('wheel', throttle(enhancedScrollSection, THROTTLE_DELAY), {passive: true});
    window.addEventListener('wheel', throttle(enhancedRawScrollSection, THROTTLE_DELAY), {passive: true});
}

// Enhanced momentum detection for better macOS compatibility
const enhancedMomentumDetection = (e) => {
    // Check for WebKit-specific properties that might indicate momentum
    if (e.webkitDirectionInvertedFromDevice !== undefined) {
        // This is a WebKit-specific property that can help distinguish momentum
        return !e.webkitDirectionInvertedFromDevice;
    }
    
    // Check deltaY patterns typical of momentum scrolling
    const deltaY = Math.abs(e.deltaY);
    
    // Momentum events typically have:
    // - Fractional deltaY values
    // - Values that are not "round" numbers
    const hasFractionalDelta = deltaY % 1 !== 0;
    const isVerySmallDelta = deltaY < 4;
    
    return !hasFractionalDelta && !isVerySmallDelta;
};

var TOUCH_TIME = []
window.addEventListener('touchstart', e => {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    TOUCH_TIME[0] = new Date().getTime();
}, {passive: true})

// Fix SCROLLDELAY reference for touch events
const TOUCH_DELAY = 150;
window.addEventListener('touchend', debounce(enhancedScrollSection, TOUCH_DELAY), {passive: true});
window.addEventListener('touchend', debounce(enhancedRawScrollSection, TOUCH_DELAY), {passive: true});
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
    const loader = document.querySelector("#loader");
    const loader_data_div = document.querySelector(".loader_data_div");
    const loader_data = document.querySelectorAll(".loader_data");
    const loader_button = document.querySelector(".loader_button");
    const loader_noise = document.querySelector("#loader_noise");
    const vhs_player = document.querySelector("#vhs_sound");
    setTimeout(async () => {
        vhs_player.volume = .2;
        var step = 700;
        var ind = 0;
        setTimeout(() => {
            loader_data[1].style.display = "block";
            anime({
                targets : loader_data[1],
                opacity: [0,1],
                duration: 1000,
                easing : 'linear'
            })
        }, ind)
        ind+=step;
        setTimeout(() => {
            loader_data[3].style.display = "block";
            anime({
                targets : loader_data[3],
                opacity: [0,1],
                duration: 1000,
                easing : 'linear'
            })
        }, ind)
        ind+=step;
        setTimeout(() => {
            loader_data[2].style.display = "block";
            anime({
                targets : loader_data[2],
                opacity: [0,1],
                duration: 1000,
                easing : 'linear'
            })
        }, ind)
        ind+=step;
        setTimeout(() => {
            loader_button.style.display = "block";
            anime({
                targets : loader_button,
                opacity: [0,1],
                duration: 1000,
                easing : 'linear'
            })
        }, ind)
        ind+=step;

    }, 100);
    setTimeout( () => {
        loader_button.addEventListener('click', () => {
            anime({
                targets: loader,
                backgroundColor: ["rgb(255,0,0)", "rgb(225,225,225)"],
                duration: 1000,
                easing: "easeInOutSine",
                begin: () => {
                    loader_noise.style.display = "block"
                    vhs_player.play();
                },
                complete: () => {
                    loader.style.display = 'none'
                    vhs_player.pause();
                    vhs_player.src = vhs_player.src;
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
                }
            })
        })
        var now1 = new Date().getTime();
        var page_load_time = now1 - performance.timing.navigationStart;
        console.log(`✅ LOAD TIME: [${page_load_time} ms] ✅`);
    }, 2000)

    setTimeout(() => {
        scroll_amount = 0
        dispatchEvent(wheelEvent);
        window.scrollTo(0, 0);
    }, 2030)
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
//---------------------------------------------------------------------------------------------------



// export {
//     SCROLL_TRACKER,
//     scroll_amount,
//     prev_scroll_amount,
//     raw_scroll_amount,
//     page2,
//     page7,
//     page12,
//     page17,
//     page22,
//     page2_scroll_amount,
//     page7_scroll_amount,
//     page12_scroll_amount,
//     page17_scroll_amount,
//     page22_scroll_amount,
//     scroll_to,
//     debounce
// }

