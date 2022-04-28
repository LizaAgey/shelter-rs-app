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

const petsJSON = '../../assets/files/pets.json';

//=== / PAGINATION ===

async function getPetsForPagination() {
    return await
        fetch(petsJSON)
            .then(response => response.json())
            .then(data => {

                let arrIDs = []
                for (let i = 0; i < data.length; i++) {
                    arrIDs.push(i);
                }

                let sortedArrIDs = arrIDs.sort(randomNumber);
                function randomNumber(a, b) {
                    return 0.5 - Math.random();
                }

                //вставляем нужное количество карточек в зависимости от ширины экрана

                if (screen.width > 1280) {
                    sortedArrIDs.forEach((id) => {

                        let paginationDiv = document.getElementById("pets-pagination-wrapper")
                        let petItem = document.createElement("div");
                        petItem.classList.add("pet-wrapper")
                        petItem.classList.add("pet-wrapper__item")

                        petItem.innerHTML =
                            `<img src="${"../../" + data[id].img}" alt="${data[id].name}">
                  <div class="pet-name">${data[id].name}</div>
                  <button class="button-secondary">Learn more</button>`

                        paginationDiv.appendChild(petItem)
                    })
                } else if (screen.width <= 1280 && screen.width >= 768) {

                    for (let i = 0; i < 6; i++) {
                        let id = sortedArrIDs[i]

                        let paginationDiv = document.getElementById("pets-pagination-wrapper")
                        let petItem = document.createElement("div");
                        petItem.classList.add("pet-wrapper")
                        petItem.classList.add("pet-wrapper__item")

                        petItem.innerHTML =
                            `<img src="${"../../" + data[id].img}" alt="${data[id].name}">
                  <div class="pet-name">${data[id].name}</div>
                  <button class="button-secondary">Learn more</button>`

                        paginationDiv.appendChild(petItem)
                    }

                } else if (screen.width < 768 && screen.width >= 320) {
                    for (let i = 0; i < 3; i++) {
                        let id = sortedArrIDs[i]

                        let paginationDiv = document.getElementById("pets-pagination-wrapper")
                        let petItem = document.createElement("div");
                        petItem.classList.add("pet-wrapper")
                        petItem.classList.add("pet-wrapper__item")

                        petItem.innerHTML =
                            `<img src="${"../../" + data[id].img}" alt="${data[id].name}">
                  <div class="pet-name">${data[id].name}</div>
                  <button class="button-secondary">Learn more</button>`

                        paginationDiv.appendChild(petItem)
                    }
                }


            })

}



const pagRightOne = document.getElementById("pag-right")
const pagRightEnd = document.getElementById("pag-right-end")
const pagLeftOne = document.getElementById("pag-left")
const pagLeftEnd = document.getElementById("pag-left-end")
const pagMiddle = document.getElementById("pag-middle")

async function pagination() {
    await getPetsForPagination()
    

    function enableLeft () {       
        pagLeftOne.classList.remove("disabled-pagination")
        pagLeftOne.classList.add("enabled-pagination")
        
    }

    function disableLeft () {
        pagLeftOne.classList.add("disabled-pagination")
        pagLeftOne.classList.remove("enabled-pagination")
    }

    function disableRight () {
        pagRightOne.classList.add("disabled-pagination")
        pagRightOne.classList.remove("enabled-pagination")
    }

    function enableRight () {
        pagRightOne.classList.remove("disabled-pagination")
        pagRightOne.classList.add("enabled-pagination")
    }

    function disableRightEnd () {
        pagRightEnd.classList.add("disabled-pagination")
        pagRightEnd.classList.remove("enabled-pagination")
    }
    function enableRightEnd () {
        pagRightEnd.classList.remove("disabled-pagination")
        pagRightEnd.classList.add("enabled-pagination")
    }

    function disableLeftEnd () {
        pagLeftEnd.classList.add("disabled-pagination")
        pagLeftEnd.classList.remove("enabled-pagination")
    }
    function enableLeftEnd () {
        pagLeftEnd.classList.remove("disabled-pagination")
        pagLeftEnd.classList.add("enabled-pagination")
    }

    function moveRight() {
        let paginationDiv = document.getElementById("pets-pagination-wrapper")
        let middleNum = parseInt(pagMiddle.innerText)
        
        function addNewCards () {
            paginationDiv.innerHTML = ""
            setTimeout(getPetsForPagination(), 10000)
            console.log('hi')
            pagMiddle.innerText = middleNum + 1
        }
        
        

        if (screen.width > 1280 && middleNum == 5) {
            enableLeft ()
            enableLeftEnd()
            disableRight ()  
            disableRightEnd() 
            addNewCards ()         
            return    
        } else if  (screen.width > 1280 && middleNum <6) {
            addNewCards ()
            enableLeft ()
            enableLeftEnd()
            

        } else if (screen.width <= 1280 && screen.width > 768 && middleNum == 7) { 
            enableLeft ()
            enableLeftEnd ()
            disableRight ()
            disableRightEnd ()
            addNewCards ()
            return        
        } else if (screen.width <= 1280 && screen.width > 768 && middleNum < 8) {
            enableLeft ()
            enableLeftEnd()
            addNewCards ()

        } else if (screen.width <= 768 && screen.width >= 320 && middleNum == 15) {
            enableLeft ()
            enableLeftEnd()
            disableRight ()
            disableRightEnd ()
            addNewCards ()
            return
        } else if (screen.width <= 768 && screen.width >= 320 && middleNum < 16) {
            enableLeft ()
            enableLeftEnd()
            addNewCards ()
        }

        
        
    }
    pagRightOne.addEventListener('click', moveRight)
    
    
    
    function moveLeft() {
        let paginationDiv = document.getElementById("pets-pagination-wrapper")
        
        function addNewCards () {
            paginationDiv.innerHTML = ""
            getPetsForPagination()
            pagMiddle.innerText = middleNum - 1
        }
        
        let middleNum = parseInt(pagMiddle.innerText)

        if(middleNum == 2) {
            disableLeft()
            disableLeftEnd()
            addNewCards()
            return
        } else if (middleNum == 1) {
            disableLeft()
            disableLeftEnd()
            return
        } else if (screen.width > 1280 && middleNum <= 6) {
            enableLeft ()
            enableLeftEnd()
            enableRight()
            enableRightEnd()
            addNewCards ()
            return    
        } else if (screen.width <= 1280 && screen.width > 768 && middleNum <= 8) { 
            enableLeft ()
            enableRight()
            addNewCards ()
            return        
        } else if (screen.width <= 768 && screen.width >= 320 && middleNum <= 16) {
            enableLeft ()
            enableLeftEnd()
            enableRight()
            enableRightEnd()
            addNewCards ()

            return
        }      
        
    }

    pagLeftOne.addEventListener('click', moveLeft)

    function moveRightEnd () {

        let paginationDiv = document.getElementById("pets-pagination-wrapper")
        let middleNum = parseInt(pagMiddle.innerText)
        
        function addNewCards () {
            paginationDiv.innerHTML = ""
            getPetsForPagination()
        }

        if ((screen.width > 1280) && (middleNum <= 5)) {
            addNewCards ()
            disableRightEnd()
            disableRight()
            enableLeft()
            enableLeftEnd ()
            pagMiddle.innerText = 6
            return
        } else if(screen.width <= 1280 && screen.width > 768 && middleNum <= 7) {
            addNewCards ()
            disableRightEnd()
            disableRight()
            enableLeft()
            enableLeftEnd ()
            pagMiddle.innerText = 8
            return               
        } else if (screen.width <= 768 && screen.width >= 320 && middleNum <= 15) {
            addNewCards ()
            disableRightEnd()
            disableRight()
            enableLeft()
            enableLeftEnd ()
            pagMiddle.innerText = 16
            return    
        }

    }
    pagRightEnd.addEventListener('click', moveRightEnd)

    function moveLeftEnd () {

        let paginationDiv = document.getElementById("pets-pagination-wrapper")
        let middleNum = parseInt(pagMiddle.innerText)
        
        function addNewCards () {
            paginationDiv.innerHTML = ""
            getPetsForPagination()
            pagMiddle.innerText = 1
        }
        if(middleNum == 1) {
            return
        } else {
        addNewCards ()
        disableLeftEnd ()
        disableLeft ()
        enableRight()
        enableRightEnd()
        return
        }
    }
    pagLeftEnd.addEventListener('click', moveLeftEnd)

}

pagination()






