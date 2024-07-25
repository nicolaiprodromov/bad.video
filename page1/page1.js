const PAGE1_BUILDER = new Page(1);
PAGE1_BUILDER.pd             = {
    holder         : document.querySelector('#i1'),
    includer       : document.querySelector('#page1include'),
    img_objs       : [],
    menu_items_ta  : [],
    menu_images    : document.querySelectorAll(".menu_image"),
    page1_menu_div : document.querySelector("#page1_menu"),
    page1_menu     : document.querySelectorAll(".menu_item"),
    img_map        : {
        0: {
            0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCeUpC59QXESipsLUhudMQiWH43TjTI4yFyy4FWXnxvi1Vax6c7rd-FBejXUkCvEbrr4&usqp=CAU",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
        },
        1: {
            0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCeUpC59QXESipsLUhudMQiWH43TjTI4yFyy4FWXnxvi1Vax6c7rd-FBejXUkCvEbrr4&usqp=CAU",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
        },
        2: {
            0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCeUpC59QXESipsLUhudMQiWH43TjTI4yFyy4FWXnxvi1Vax6c7rd-FBejXUkCvEbrr4&usqp=CAU",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
        },
        3: {
            0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCeUpC59QXESipsLUhudMQiWH43TjTI4yFyy4FWXnxvi1Vax6c7rd-FBejXUkCvEbrr4&usqp=CAU",
            2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
            5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo2vVKQ8eKP7Hx9vhnksENS0jrs9ONKNRRQ&s",
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
PAGE1_BUILDER.load_handler   = async (p1d) => {
    p1d.arrow_menu.style.left = `${p1d.includer.getBoundingClientRect().width/2}px`
    p1d.arrow_menu.style.top  = `${p1d.includer.getBoundingClientRect().height/2}px`
    p1d.page1_menu_div.addEventListener("mousemove", (e) => {
        p1d.arrow_menu.style.left = `${e.clientX}px`
        p1d.arrow_menu.style.top  = `${e.clientY}px`
    })
    var indyy=0;
    for (var mimg of p1d.menu_images){
        var imgobj = new ImageObject(
            element  = mimg,
            img      = await PAGE1_BUILDER.checkImage(p1d.img_map[PAGE1_BUILDER.device][indyy]),
            id       = indyy,
        );
        imgobj.draw();
        imgobj.element.style.opacity = "0"
        p1d.img_objs.push(imgobj)
        indyy++;
    }
    var ind = 0
    for (var mi of p1d.page1_menu){
        mi.style.zIndex = ind + 2;
        let ta = new TextAnim(mi, ind)
        p1d.menu_items_ta.push(ta)
        ind++;
    }
    p1d.page1_menu_div.addEventListener('mouseleave', () => {
        var indy = 0;
        for (var mimg of p1d.menu_images){
            p1d.img_objs[indy].fade([1,0], 200)
            indy++;
        }
    })
    for (var mi of p1d.menu_items_ta){
        mi.element.addEventListener('click', async (e) => {
            var fruits = document.querySelectorAll('.FRUIT');
            var indy = 0;
            e.currentTarget.style.transform = `rotate(${Math.random() * 3}deg)`
            p1d.menu_items_ta[e.currentTarget.dataset.text_id].nr_vo_in(200, "easeInOutSine", 20)
            for (var _ of p1d.menu_images){
                if (indy == e.currentTarget.dataset.text_id){
                    fruits      [indy].style.opacity        = 1
                    p1d.img_objs[indy].transform            = "rotate(" + p1d.img_objs[indy].randInt(-33,33) +"deg)"
                    p1d.img_objs[indy].element.style.zIndex = 1
                    p1d.img_objs[indy].fade([0,1], 300)
                    await p1d.img_objs[indy].glitchTransition(5, "black");
                    var chaka = indy
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
                } else {
                    p1d.img_objs[indy].element.style.zIndex = 0
                    fruits      [indy].style.opacity        = 0
                }
                indy++;
            }
        })
    }
}
PAGE1_BUILDER.scroll_handler = (p1d, ss, delta_ss) => {
    var scroll_amount_st = ss[0];
    if (scroll_amount_st == 1){
        document.querySelector("#particle_intro0").innerHTML="scroll down"
        document.querySelector("#particle_intro1").innerHTML="pick a project"
        document.querySelector("#particle_intro2").innerHTML="^"
    }
}
PAGE1_BUILDER.resize_handler = async (p1d) => {
    var indyy=0;
    for (var mimg_ of p1d.img_objs){
        mimg_.clear();
        mimg_._img = await PAGE1_BUILDER.checkImage(p1d.img_map[PAGE1_BUILDER.device][indyy])
        mimg_.draw();
        indyy++;
    }
}