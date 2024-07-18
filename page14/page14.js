

const PAGE14_BUILDER = new Page(14);
PAGE14_BUILDER.pd = {
    holder    : document.querySelector('#i15'),
    p1_images2: document.querySelectorAll('.p_image4'),
    p1_img_obj: [],

    p1_img_src : `${PAGE14_BUILDER.local_url}Asset`,

    p1_img_map : {
        0 : `${PAGE4_BUILDER.local_url}Asset`,
        1 : `${PAGE4_BUILDER.local_url}Asset`,
        2 : `${PAGE4_BUILDER.local_url}Asset`,
        3 : `${PAGE4_BUILDER.local_url}Asset`,
    },

    p1_img_ext : ".png"
}

PAGE14_BUILDER.load_handler = (p14d) => {


    setTimeout(() => {
        var tw0 = document.querySelector("#twitter-widget-0");
        var tw1 = document.querySelector("#twitter-widget-1");
        var tw2 = document.querySelector("#twitter-widget-2");
        var ccc = document.querySelectorAll(".twitter-tweet")
        for (var c_c of ccc){
            //c_c.style.maxWidth = "350px"
        }

        var rrh = tw0.getBoundingClientRect().width/tw0.getBoundingClientRect().height

        tw0.style.width = `${p14d.holder.getBoundingClientRect().height*rrh}px`
        tw1.style.width = `${p14d.holder.getBoundingClientRect().height*rrh}px`
        tw2.style.width = `${p14d.holder.getBoundingClientRect().height*rrh}px`

        tw0.style.maxHeight = "100%"
        tw1.style.maxHeight = "100%"
        tw2.style.maxHeight = "100%"
        tw0.style.pointerEvents = "none"
        tw1.style.pointerEvents = "none"
        tw2.style.pointerEvents = "none"
        tw0.style.margin = "0px"
        tw1.style.margin = "0px"
        tw2.style.margin = "0px"
        tw0.style.alignItems     = "center"
        tw0.style.justifyContent = "center"
        tw0.style.position       = "absolute"
        tw1.style.alignItems     = "center"
        tw1.style.justifyContent = "center"
        tw1.style.position       = "absolute"
        tw2.style.alignItems     = "center"
        tw2.style.justifyContent = "center"
        tw2.style.position       = "absolute"

        tw0.style.left      = `calc(50% - ${tw0.getBoundingClientRect().width/2}px)`
        tw0.style.top       = "50%"
        tw0.style.transform = "translate(-50%,-50%) rotate(3deg)"

        tw1.style.left      = `calc(50% + ${tw1.getBoundingClientRect().width/2}px)`
        tw1.style.top       = "50%"
        tw1.style.transform = "translate(-50%,-50%) rotate(-1deg)"

        tw2.style.left      = "50%"
        tw2.style.top       = "50%"
        tw2.style.transform = "translate(-50%,-50%) rotate(-3deg)"
    }, 3000)


    // for (var bgobj of p14d.p1_images2){
    //     var bg_img_obj11 = new ImageObject(
    //         element  = bgobj,
    //         img      = p14d.p1_img_map[PAGE14_BUILDER.device] + " " + (bgobj.parentNode.dataset.id) + p14d.p1_img_ext,
    //         id       = 0,
    //     );
    //     bg_img_obj11.draw();
    //     p14d.p1_img_obj.push(bg_img_obj11);
    // }

}
PAGE14_BUILDER.scroll_handler = (p14d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
    var page12_scroll_amount_st  = ss[3];
    if (scroll_amount_st == 4 && page12_scroll_amount_st == 2){
        // for (var bgobj of p14d.p1_img_obj){
        //     bgobj.fade([0,1], 300)
        //     bgobj.scale_y(["0%","100%"], 300, 'easeInOutCirc')
        // }

        var tw0 = document.querySelector("#twitter-widget-0");
        var tw1 = document.querySelector("#twitter-widget-1");
        var ccc = document.querySelector(".twitter-tweet")

        // anime({
        //     targets: [tw0],
        //     left: ["-50%", "50%"],
        //     duration:2000,
        //     easing: "easeInOutCirc",
        //     delay: 0
        // })

        // anime({
        //     targets: [tw1],
        //     left: ["-50%", "calc(50% + 300px)"],
        //     duration:2000,
        //     easing: "easeInOutCirc",
        //     delay: 100
        // })
        
    }

}
PAGE14_BUILDER.resize_handler = (p14d) => {
    // for (var bgobj of p14d.p1_img_obj){
    //     bgobj.clear();
    //     bgobj.img = p14d.p1_img_map[PAGE14_BUILDER.device] + " " + (bgobj.element.parentNode.dataset.id) + p14d.p1_img_ext;
    //     bgobj.draw();
    // }

}