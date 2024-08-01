import { Page } from '/lib/page_builder.js'

const PAGE_ABOUT_BUILDER = new Page(22);
PAGE_ABOUT_BUILDER.pd = {
    about_button : document.querySelector(".about_cv_button"),
}
PAGE_ABOUT_BUILDER.scroll_handler = async (pd) => {
    
}
PAGE_ABOUT_BUILDER.first_scroll_handler = async (pd) => {
    pd.addEventListener('click', () => {
        const a = document.createElement('a')
        a.href = url
        a.download = url.split('/').pop()
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }, false)
}