import { Page }          from '/lib/page_builder.js';
import { TextAnim }      from '/lib/text_anim.js';
import { FRUIT_DISPLAY } from '/lib/3d_display.js';
import { ImageObject }   from '/lib/images_obj.js';

const PAGE_BUILDER = new Page(1);
PAGE_BUILDER.pd = {
    holder         : document.querySelector('#i1'),
    includer       : document.querySelector('#page1include'),
    img_objs       : [],
    menu_items_ta  : [],
    menu_images    : document.querySelectorAll(".menu_image"),
    page1_menu_div : document.querySelector("#page1_menu"),
    page1_menu     : document.querySelectorAll(".menu_item"),
    img_map        : {
        0: {
            0: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a41dbd3e9458651effa176_mock-up.webp",
            1: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d38b757faf9fe1d5b8_mock-up.webp",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3eac5ff6a5f900fbe29bf_thumbnail.avif",
        },
        1: {
            0: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a41dbe20bcabc01ff46e35_mock-up-mobile.webp",
            1: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d3ce70dcc6c06c0aea_mock-up-mobile.webp",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3f182679b3b46c225df0e_thumbnail_mobile.avif",
        },
        2: {
            0: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a41dbd3e9458651effa176_mock-up.webp",
            1: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d38b757faf9fe1d5b8_mock-up.webp",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3eac5ff6a5f900fbe29bf_thumbnail.avif",
        },
        3: {
            0: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a41dbe20bcabc01ff46e35_mock-up-mobile.webp",
            1: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669944d3ce70dcc6c06c0aea_mock-up-mobile.webp",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/66a3f182679b3b46c225df0e_thumbnail_mobile.avif",
        }
        
    },
    size_map : {
        0 : {x:"50%",y:"100%"},
        1 : {x:"100%",y:"50%"},
        2 : {x:"50%",y:"100%"},
        3 : {x:"100%",y:"50%"},
    },
    arrow_menu : document.querySelector("#arrow_menu"),
}
PAGE_BUILDER.load_handler = async (pd) => {
    
}
PAGE_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="scroll down"
    document.querySelector("#particle_intro1").innerHTML="pick a project"
    document.querySelector("#particle_intro2").innerHTML="^"
}
PAGE_BUILDER.resize_handler = async (pd) => {
    var indyy=0;
    for (var mimg_ of pd.img_objs){
        mimg_.clear();
        mimg_._img = await PAGE_BUILDER.checkImage(pd.img_map[PAGE_BUILDER.device][indyy])
        mimg_.draw();
        indyy++;
    }
}
PAGE_BUILDER.first_scroll_handler = async (pd) => {
    
    // const ely = document.querySelector("#PEAR");
    // const canvasy = document.querySelector("#pear-canvas");
    // const PEAR_MODEL = 'https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/models/pear.glb'
    // FRUIT_DISPLAY(ely, canvasy, PEAR_MODEL);
    // const ely1 = document.querySelector("#APPLE");
    // const canvasy1 = document.querySelector("#apple-canvas");
    // const PEAR_MODEL1 = 'https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/models/realistic-apple.glb'
    // FRUIT_DISPLAY(ely1, canvasy1, PEAR_MODEL1);
    // const ely2 = document.querySelector("#LIME");
    // const canvasy2 = document.querySelector("#lime-canvas");
    // const PEAR_MODEL2 = 'https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/models/banana.glb'
    // FRUIT_DISPLAY(ely2, canvasy2, PEAR_MODEL2);
    // const ely3 = document.querySelector("#EPEAR");
    // const canvasy3 = document.querySelector("#epear-canvas");
    // const PEAR_MODEL3 = 'https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/models/epear.glb'
    // FRUIT_DISPLAY(ely3, canvasy3, PEAR_MODEL3);

    var indyy=0;
    for (var mimg of pd.menu_images){
        var imgobj = new ImageObject(
            mimg,
            await PAGE_BUILDER.checkImage(pd.img_map[PAGE_BUILDER.device][indyy]),
            indyy);
        imgobj.draw();
        imgobj.element.style.opacity = 0
        pd.img_objs.push(imgobj)
        indyy++;
    }

    setInterval(() => {
        var random_choice = Math.floor(Math.random() * pd.img_objs.length)
        const anim2 = anime({
            targets: pd.img_objs[random_choice].element,
            keyframes: [
            {
                opacity: 1, duration:1000
            },
            {
                opacity: 0, duration:1000, delay:3000
            }],
            easing:"easeInOutSine"
        })
    }, 5000)

    var ind = 0
    for (var mi of pd.page1_menu){
        let ta = new TextAnim(mi, ind)
        pd.menu_items_ta.push(ta)
        ind++;
    }

    pd.arrow_menu.style.left = `${pd.includer.getBoundingClientRect().width/2}px`
    pd.arrow_menu.style.top  = `${pd.includer.getBoundingClientRect().height/2}px`

    pd.page1_menu_div.addEventListener("mousemove", (e) => {
        pd.arrow_menu.style.left = `${e.clientX}px`
        pd.arrow_menu.style.top  = `${e.clientY}px`
    })


    for (var mi of pd.menu_items_ta){
        mi.element.addEventListener('click', async (e) => {
            e.currentTarget.style.transform = `rotate(${Math.random() * 3}deg)`
            var chaka = parseInt(e.currentTarget.id.replace("menu_item",''))
            setTimeout(() => {
                scroll_amount = chaka + 3
                var e_e = {type:'wheel', deltaY:-1}
                page2_scroll_amount  = 0;page7_scroll_amount  = 0
                page12_scroll_amount = 0;page17_scroll_amount = 0
                page22_scroll_amount = 0;page22.style.left = "0px"
                page2.style.left  = "0px";page7.style.left  = "0px"
                page12.style.left = "0px";page17.style.left = "0px"
                scroll_to(e_e)
            }, 700)
        });
        mi.element.addEventListener('mouseenter', async (e) => {
            pd.menu_items_ta[parseInt(e.currentTarget.id.replace("menu_item",''))].nr_vo_in(200, "easeInOutSine", 20)
        });
    }

    
    // for (var mi of pd.menu_items_ta){
    //     mi.element.addEventListener('click', async (e) => {
    //         var fruits = document.querySelectorAll('.FRUIT');
    //         var indy = 0;
    //         e.currentTarget.style.transform = `rotate(${Math.random() * 3}deg)`
    //         pd.menu_items_ta[e.currentTarget.dataset.text_id].nr_vo_in(200, "easeInOutSine", 20)
    //         for (var _ of pd.menu_images){
    //             if (indy == e.currentTarget.dataset.text_id){
    //                 fruits      [indy].style.opacity        = 1
    //                 pd.img_objs[indy].transform            = "rotate(" + pd.img_objs[indy].randInt(-33,33) +"deg)"
    //                 pd.img_objs[indy].element.style.zIndex = 1
    //                 pd.img_objs[indy].fade([0,1], 300)
    //                 //await pd.img_objs[indy].glitchTransition(5, "black");
    //                 var chaka = indy
    //                 setTimeout(() => {
    //                     scroll_amount = chaka + 3
    //                     var e_e = {type:'wheel', deltaY:-1}
    //                     page2_scroll_amount  = 0;page7_scroll_amount  = 0
    //                     page12_scroll_amount = 0;page17_scroll_amount = 0
    //                     page22_scroll_amount = 0;page22.style.left = "0px"
    //                     page2.style.left  = "0px";page7.style.left  = "0px"
    //                     page12.style.left = "0px";page17.style.left = "0px"
    //                     scroll_to(e_e)
    //                 }, 700)
    //             } else {
    //                 pd.img_objs[indy].element.style.zIndex = 0
    //                 fruits      [indy].style.opacity        = 0
    //             }
    //             indy++;
    //         }
    //     })
    // }
}