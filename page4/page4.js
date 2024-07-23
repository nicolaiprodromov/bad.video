const PAGE4_BUILDER = new Page(4);
PAGE4_BUILDER.pd = {
    holder    : document.querySelector('#i5'),
    p1_images2: document.querySelectorAll('.p_image2'),
    p1_img_obj: [],
    p1_img_map : {
        0 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d741682a4499b76ef330f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf69f_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416d172591e58877251_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416789c614295cada38_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416c60e78a8edf61e65_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf669_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416bcaef6bbef6fe0a5_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7415154d80eaa633d2a5_Asset%205.webp"
        ],
        1 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037748ccd8134e143e_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d6f965b276c431fe_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037b41605824225664_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703629d1bec15c636d8_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27039ee33e23fd8f96fb_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d5e5161f3e0ca6eb_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27033ea59fb906dcb253_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e270314b06f1c6ede0934_Asset%206.webp"
        ],
        2 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d741682a4499b76ef330f_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf69f_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416d172591e58877251_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416789c614295cada38_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416c60e78a8edf61e65_Asset%206.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416035dd5477d7cf669_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7416bcaef6bbef6fe0a5_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669d7415154d80eaa633d2a5_Asset%205.webp"
        ],
        3 : [
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037748ccd8134e143e_Asset%204.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d6f965b276c431fe_Asset%205.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27037b41605824225664_Asset%203.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703629d1bec15c636d8_Asset%200.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27039ee33e23fd8f96fb_Asset%201.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e2703d5e5161f3e0ca6eb_Asset%202.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e27033ea59fb906dcb253_Asset%207.webp",
            "https://uploads-ssl.webflow.com/5e87b1c5bcf6e1005fbd96f8/669e270314b06f1c6ede0934_Asset%206.webp"
        ],
    },

    dragster1: document.querySelector("#bg"),
    dragster2: document.querySelector("#bg1"),
    drag_grid: document.querySelector(".drag_grid"),
    drag_down: false,
}
PAGE4_BUILDER.load_handler = (p4d) => {
    for (var bgobj of p4d.p1_images2){
        var bg_img_obj11 = new ImageObject(
            element  = bgobj,
            img      = p4d.p1_img_map[PAGE4_BUILDER.device][parseInt(bgobj.parentNode.dataset.id)],
            id       = 0,
        );
        bg_img_obj11.draw();
        p4d.p1_img_obj.push(bg_img_obj11);
    }
    const animate_dragster = (e) => {
        
        var _e_;
        if (e.type = "touchmove"){
            _e_ = e.touches[0]
        } else {
            _e_ = e;
        }

        for (var child_el of p4d.drag_grid.children){
            var bb = child_el.getBoundingClientRect()
            var epsilon = 100;
            console.log(bb.x, _e_.clientX)
            if (bb.x>(_e_e.clientX-epsilon)&&bb.x<(_e_e.clientX+epsilon)){
                anime({
                    targets : child_el,
                    fontSize: [window.getComputedStyle(child_el).fontSize, "50px"],
                    duration:150,
                    easing:"easeInOutExpo"
                })
            }
            else {
                anime({
                    targets : child_el,
                    fontSize: [window.getComputedStyle(child_el).fontSize, "20px"],
                    duration:150,
                    easing:"easeInOutExpo"
                })
            }
        }
    }
    p4d.dragster1.addEventListener('mousedown', (e) => {
        p4d.drag_grid.style.display = "flex";
    });
    p4d.dragster1.addEventListener('touchstart', (e) => {
        p4d.drag_grid.style.display = "flex";
    });
    p4d.dragster1.addEventListener('mousemove', (e) => {
        animate_dragster(e);
    });
    p4d.dragster1.addEventListener('touchmove', (e) => {
        animate_dragster(e);
    });


    p4d.dragster2.addEventListener('mousedown', (e) => {
        p4d.drag_grid.style.display = "flex";
    });
    p4d.dragster2.addEventListener('touchstart', (e) => {
        p4d.drag_grid.style.display = "flex";
    });
    p4d.dragster2.addEventListener('mousemove', (e) => {
        animate_dragster(e);
    });
    p4d.dragster2.addEventListener('touchmove', (e) => {
        animate_dragster(e);
    }); 


    window.addEventListener('mouseup', (e) => {
        p4d.drag_grid.style.display = "none";
    });
    window.addEventListener('touchend', (e) => {
        p4d.drag_grid.style.display = "none";
    });


}
PAGE4_BUILDER.scroll_handler = (p4d, ss, delta_ss) => {
    var scroll_amount_st        = ss[0];
        var page2_scroll_amount_st  = ss[1];
        if (scroll_amount_st == 2 && page2_scroll_amount_st == 2){
            for (var bgobj of p4d.p1_img_obj){
                bgobj.fade([0,1], 300);
                bgobj.scale_x(["0%","100%"], 300, 'easeInOutCirc');
            }
        }
}
PAGE4_BUILDER.resize_handler = (p4d) => {
    for (var bgobj of p4d.p1_img_obj){
        bgobj.clear();
        bgobj.img = p4d.p1_img_map[PAGE4_BUILDER.device][parseInt(bgobj.parentNode.dataset.id)];
        bgobj.draw();
    }
}