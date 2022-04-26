const BURGER = document.querySelector('.burger')
const HEADER_BURGER_RIGHT = document.querySelector('.header-burger-right-menu')
const SEC_INTRODUCTION = document.querySelector('.section-introduction')
const HEADER = document.querySelector('header')
const BODY = document.querySelector('body')
const NAV_WRAPPER = document.querySelector('.nav-wrapper')
const RIGHT_MENU = document.querySelector('.right-menu')

//нажатие на бургер при закрытом правом меню открывает его
BURGER.addEventListener('click', moveRightMenu)

//нажатие на бургер из меню при закрывает его
HEADER_BURGER_RIGHT.addEventListener('click', moveRightMenu)

//функции для добавления и скрытия скролла
const hideScroll = () => {
    document.body.style.paddingRight = `${getScrollBarWidth()}px`;
    document.body.style.overflow = 'hidden'
}
const showScroll = () => {
    document.body.style.paddingRight = '';
    document.body.style.overflow = 'visible'
}

//функция для вычисления ширины скролла
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

//функция для закрытия правого меню при изменении ширины экрана
const resetNav = () => {
    SEC_INTRODUCTION.classList.remove('section-introduction--active-nav')
    showScroll()
}

window.addEventListener('resize', resetNav)

//функция закрытия меню при нажатии на ссылку из меню
class Menu {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    redirect() {
        resetNav()
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }
}

new Menu(menu);

function moveRightMenu() {
    SEC_INTRODUCTION.classList.toggle('section-introduction--active-nav')

    if (SEC_INTRODUCTION.classList.contains('section-introduction--active-nav')) {
        hideScroll();
    } else {
        showScroll();
    }
}

