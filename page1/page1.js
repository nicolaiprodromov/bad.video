
const PAGE1_BUILDER = new Page(1);
PAGE1_BUILDER.pd             = {
    holder         : document.querySelector('#i1'),
    includer       : document.querySelector('#page1include'),
    img_objs       : [],
    menu_items_ta  : [],
    bg_paper       : null,
    menu_images    : document.querySelectorAll(".menu_image"),
    bg_particle_pg1: document.querySelector("#bg_particle_pg1"),
    page1_menu_div : document.querySelector("#page1_menu"),
    page1_menu     : document.querySelectorAll(".menu_item"),
    bg_svg_pg1     : document.querySelector("#bg_svg_pg1"),
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
    }
}
PAGE1_BUILDER.load_handler   = async (p1d) => {
    p1d.bg_paper = new Paper(p1d.bg_svg_pg1);
    //p1d.bg_paper.makePath(0, asset10)
    p1d.bg_paper.makePath(1, asset11)
    p1d.bg_paper.makePath(2, asset12)
    //p1d.bg_paper.pop(0, p1d.bg_paper.paths[0].getBBox().width, p1d.bg_paper.paths[0].getBBox().height)
    p1d.bg_paper.pop(1, p1d.bg_paper.paths[1].getBBox().width, p1d.bg_paper.paths[1].getBBox().height)
    p1d.bg_paper.pop(2, p1d.bg_paper.paths[1].getBBox().width, p1d.bg_paper.paths[1].getBBox().height)
    //p1d.bg_paper.paths[0].attr('class', 'bg_paper_pth0');
    p1d.bg_paper.paths[1].attr('class', 'bg_paper_pth1');
    p1d.bg_paper.paths[2].attr('class', 'bg_paper_pth2');
    setTimeout(() => {
        //bg_paper.samplePath(0, 10);
        p1d.bg_paper.samplePath(1, 10);
        p1d.bg_paper.samplePath(2, 10);
    }, 10)
    

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
            //p1d.menu_images[indy].style.display = "none"
            p1d.img_objs[indy].fade([1,0], 200)
            indy++;
        }
    })
    for (var mi of p1d.menu_items_ta){
        mi.element.addEventListener('mousemove', (e) => {
            //p1d.menu_items_ta[e.currentTarget.dataset.text_id].mouse_mix_text(e, 10, p1d.menu_items_ta[e.currentTarget.dataset.text_id].text.toUpperCase())
            //p1d.menu_items_ta[e.currentTarget.dataset.text_id].mouse_scale_u(e)
        }) 
        mi.element.addEventListener('mouseenter', async (e) => {
            var indy = 0;
            e.currentTarget.transform = "rotate(33deg)"
            for (var mimg of p1d.menu_images){
                if (indy == e.currentTarget.dataset.text_id){
                    p1d.img_objs[e.currentTarget.dataset.text_id].transform = "rotate(" + p1d.img_objs[e.currentTarget.dataset.text_id].randInt(-33,33) +"deg)"
                    p1d.img_objs[e.currentTarget.dataset.text_id].element.style.zIndex = 1
                    p1d.img_objs[e.currentTarget.dataset.text_id].fade([0,1], 300)
                    // p1d.img_objs[e.currentTarget.dataset.text_id].scale_y(["0%","100%"], 1000, 'easeInOutCirc')


                    // IMAGE GLITCH TRANSITION
                    await p1d.img_objs[e.currentTarget.dataset.text_id].glitchTransition(5);
                
                
                } else {
                    p1d.img_objs[indy].element.style.zIndex = 0
                }
                indy++;
            }
        })
    }
}
PAGE1_BUILDER.scroll_handler = (p1d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    //var index = 0;
    if (scroll_amount_st == 1){
        // for (var mita of p1d.menu_items_ta){
        //     mita.nr_vo_in(100 + (index*100), 'easeInOutSine', 35)
        //     mita.cycle_random(50 + (index*100), 70)
        //     index++;
        // }

        //p1d.bg_paper.animPath2(p1d.bg_paper, 0, [0,1], 2000, 'easeInOutExpo')
        p1d.bg_paper.animPath2(p1d.bg_paper, 1, [0,1], 2000, 'easeInOutExpo')
        p1d.bg_paper.animPath2(p1d.bg_paper, 2, [0,1], 2000, 'easeInOutExpo')
    }
}
PAGE1_BUILDER.resize_handler = async (p1d) => {
    
    var ind = 0
    for (var mi of p1d.page1_menu){
        mi.style.zIndex = ind;
        ind++;
    }

    var indyy=0;
    for (var mimg_ of p1d.img_objs){
        mimg_.clear();
        mimg_._img = await PAGE1_BUILDER.checkImage(p1d.img_map[PAGE1_BUILDER.device][indyy])
        mimg_.draw();
        indyy++;
    }
    
}