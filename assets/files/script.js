const BURGER = document.querySelector('.burger')
const SEC_INTRODUCTION = document.querySelector('.section-introduction')


BURGER.addEventListener('click', (event) => {

    SEC_INTRODUCTION.classList.toggle('section-introduction--active-nav')
    BURGER.classList.toggle('burger--click')

    if (SEC_INTRODUCTION.classList.contains('section-introduction--active-nav')) {
        hideScroll()
    } else {
        showScroll()
    }

})

const hideScroll = () => {
    document.body.style.paddingRight = `${getScrollBarWidth()}px`
    document.body.style.overflow = 'hidden'
}
const showScroll = () => {
    document.body.style.paddingRight = ''
    document.body.style.overflow = 'visible'
}

const getScrollBarWidth = () => {
    const outer = document.createElement('div')

    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    outer.style.width = '50px'
    outer.style.height = '50px'
    outer.style.overflow = 'scroll'
    outer.style.visibility = 'hidden'

    document.append(outer)
    const scrollBarWidth = outer.offsetWidth - outer.clientWidth
    document.body.remove(outer)
    
    return scrollBarWidth
}