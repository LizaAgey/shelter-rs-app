const BURGER = document.querySelector('.burger')
const BURGER_RIGHT = document.querySelector('.header-burger-right-menu')
const SEC_INTRODUCTION = document.querySelector('.section-introduction')
const HEADER = document.querySelector('header')
const BODY = document.querySelector('body')
const NAV_WRAPPER = document.querySelector('.nav-wrapper')
const RIGHT_MENU = document.querySelector('.right-menu')


BURGER.addEventListener('click', () => {

    SEC_INTRODUCTION.classList.toggle('section-introduction--active-nav')
    

    if (SEC_INTRODUCTION.classList.contains('section-introduction--active-nav')) {
        hideScroll();
    } else {
        showScroll();
    }

})

BURGER_RIGHT.addEventListener('click', () => {
    SEC_INTRODUCTION.classList.toggle('section-introduction--active-nav')
    

    if (SEC_INTRODUCTION.classList.contains('section-introduction--active-nav')) {
        hideScroll();
    } else {
        showScroll();
    }
})

const hideScroll = () => {
    document.body.style.paddingRight = `${getScrollBarWidth()}px`;
    document.body.style.overflow = 'hidden'
}
const showScroll = () => {
    document.body.style.paddingRight = '';
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

    document.body.appendChild(outer)
    const scrollBarWidth = outer.offsetWidth - outer.clientWidth
    document.body.removeChild(outer)

    return scrollBarWidth
}

const resetNav = () => {
    SEC_INTRODUCTION.classList.remove('section-introduction--active-nav')
    showScroll()
}

window.addEventListener('resize', resetNav)