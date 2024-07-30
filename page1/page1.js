import { Page }          from '/lib/page_builder.js';
import { TextAnim }      from '/lib/text_anim.js';
import { FRUIT_DISPLAY } from '/lib/3d_display.js';
import { ImageObject }   from '/lib/images_obj.js';

const PAGE1_BUILDER = new Page(1);
PAGE1_BUILDER.pd = {
    holder         : document.querySelector('#i1'),
    includer       : document.querySelector('#page1include'),
    img_objs       : [],
    menu_items_ta  : [],
    menu_images    : document.querySelectorAll(".menu_image"),
    page1_menu_div : document.querySelector("#page1_menu"),
    page1_menu     : document.querySelectorAll(".menu_item"),
    img_map        : {
        0: {
            0: "https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-duck-poultry-animal-transparent-on-white-background-png-image_6653170.png",
            1: "https://pngimg.com/d/duck_PNG5029.png",
            2: "https://gallery.yopriceville.com/downloadfullsize/send/5358",
            3: "https://www.freepnglogos.com/uploads/duck-png/swimming-duck-png-transparent-image-29.png",
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
PAGE1_BUILDER.load_handler = async (pd) => {
    
}
PAGE1_BUILDER.scroll_handler = (pd, ss, delta_ss) => {
    document.querySelector("#particle_intro0").innerHTML="scroll down"
    document.querySelector("#particle_intro1").innerHTML="pick a project"
    document.querySelector("#particle_intro2").innerHTML="^"
}
PAGE1_BUILDER.resize_handler = async (pd) => {
    // var indyy=0;
    // for (var mimg_ of pd.img_objs){
    //     mimg_.clear();
    //     mimg_._img = await PAGE1_BUILDER.checkImage(pd.img_map[PAGE1_BUILDER.device][indyy])
    //     mimg_.draw();
    //     indyy++;
    // }
}
PAGE1_BUILDER.menu_images_anim = async (el, pd) => {
    anime({
        targets: el,
        easing:"easeInOutSine",
        keyframes: [
            {opacity: 1, duration:700},
            {opacity: 0, duration:700, delay:2600},
        ]
    })
    var rot_deg = 5;
    anime({
        targets: el,
        easing:"easeInOutCirc",
        rotateZ: `${Math.random() * (rot_deg - (-rot_deg)) + (-rot_deg)}deg`,
        duration: 450
    })
}
PAGE1_BUILDER.first_scroll_handler = async (pd) => {
    
    // const ely3 = document.querySelector("#EPEAR");
    // const canvasy3 = document.querySelector("#epear-canvas");
    // const PEAR_MODEL3 = 'https://raw.githubusercontent.com/nicolaiprodromov/bad.video/master/models/epear.glb'
    // FRUIT_DISPLAY(ely3, canvasy3, PEAR_MODEL3);


    // var indyy=0;
    // for (var mimg of pd.menu_images){
    //     var imgobj = new ImageObject(
    //         mimg,
    //         pd.img_map[PAGE1_BUILDER.device][indyy],
    //         indyy);
    //     imgobj.draw();
    //     imgobj.element.style.opacity = 0
    //     pd.img_objs.push(imgobj)
    //     indyy++;
    // }

    // setTimeout(() => {
    //     var random_choice = Math.floor(Math.random() * pd.img_objs.length)
    //     PAGE1_BUILDER.menu_images_anim(pd.img_objs[random_choice].element, pd);
    // }, 100)
    // setInterval(() => {
    //     var random_choice = Math.floor(Math.random() * pd.img_objs.length)
    //     PAGE1_BUILDER.menu_images_anim(pd.img_objs[random_choice].element, pd);
    // }, 4000)

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
    pd.page1_menu_div.addEventListener("mouseenter", (e) => {
        pd.arrow_menu.style.display = "block";
    })
    pd.page1_menu_div.addEventListener("mouseleave", (e) => {
        pd.arrow_menu.style.display = "none";
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
}