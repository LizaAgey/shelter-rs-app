const BURGER = document.querySelector('.burger')
const HEADER_BURGER_RIGHT = document.querySelector('.header-burger-right-menu')
const SEC_INTRODUCTION = document.querySelector('.section-introduction')
const SEC_INTRODUCTION_ACTIVE = document.querySelector('.section-introduction--active-nav')
const HEADER = document.querySelector('header')
const BODY = document.querySelector('body')
const NAV_WRAPPER = document.querySelector('.nav-wrapper')
const RIGHT_MENU = document.querySelector('.right-menu')

// const CAROUSEL = document.getElementById("carousel-wrapper");




// === BURGER MENU ===

//нажатие на бургер при закрытом правом меню открывает его
BURGER.addEventListener('click', moveRightMenu)


//функция меняет класс для изменения стиля правого меню + добавляет\убирает скролл в зависимости от класса
function moveRightMenu() {
    SEC_INTRODUCTION.classList.toggle('section-introduction--active-nav')

    if (SEC_INTRODUCTION.classList.contains('section-introduction--active-nav')) {
        hideScroll();
    } else {
        showScroll();
    }
}

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

//создаем класс для дальнейшего делегирования обработки события
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

//закрытие меню при нажатии ВНЕ его

window.addEventListener('mouseup', function (event) {
    var box = RIGHT_MENU;
    if (event.target != box && event.target.parentNode != box) {
        resetNav()
    }
});


//  === / BURGER MENU ===

//  === SLIDER  ===

const petsJSON = '../assets/files/pets.json';

async function getPetsFromFile() {
    return await fetch(petsJSON)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            let arrIDs = []
            for (let i = 0; i < data.length; i++) {
                arrIDs.push(i);
            }
            console.log(arrIDs)

            let sortedArrIDs = arrIDs.sort(randomNumber);
            function randomNumber(a, b) {
                return 0.5 - Math.random();
            }
            console.log(sortedArrIDs)

            sortedArrIDs.forEach((id) => {

                let slidesDiv = document.getElementById("slides")
                let petItem = document.createElement("div");
                petItem.classList.add("pet-wrapper")
                petItem.classList.add("pet-wrapper__item")

                petItem.innerHTML =
                    `<img src="${data[id].img}" alt="${data[id].name}">
              <div class="pet-name">${data[id].name}</div>
              <button class="button-secondary">Learn more</button>`

                slidesDiv.append(petItem)
            })

        })
}



const slider = document.querySelector('.slider')
const sliderItems = document.getElementById('slides')

const BTN_LEFT = document.getElementById("prev");
const BTN_RIGHT = document.getElementById("next");


async function slide(items, prev, next) {
    await getPetsFromFile();

    let posX1 = 0
    let posX2 = 0
    let posInitial
    let posFinal
    let threshold = 20
    let slides = document.getElementsByClassName('pet-wrapper')
    let slidesLength = slides.length
    let slideSize = 270
    let firstSlide = slides[0]
    let lastSlide = slides[slides.length - 1]
    let cloneFirst = firstSlide.cloneNode(true)
    let cloneLast = lastSlide.cloneNode(true)
    let index = 0
    let allowShift = true


    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);

    items.onmousedown = dragStart;

    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }

        items.style.left = `${items.offsetLeft - posX2}px`

    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;

        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag')
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag')
        } else {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    items.addEventListener('transitionend', checkIndex)

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}

slide(sliderItems, BTN_LEFT, BTN_RIGHT)
