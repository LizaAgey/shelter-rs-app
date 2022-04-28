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
                } else if (screen.width <= 1280 && screen.width > 768) {

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

                } else if (screen.width <= 768 && screen.width >= 320) {
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

// getPetsForPagination()

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


    function moveRight() {
        let paginationDiv = document.getElementById("pets-pagination-wrapper")
        let middleNum = parseInt(pagMiddle.innerText)
        
        function addNewCards () {
            paginationDiv.innerHTML = ""
            getPetsForPagination()
            pagMiddle.innerText = middleNum + 1
        }
        
        

        if (screen.width > 1280 && middleNum == 5) {
            enableLeft ()
            disableRight ()   
            addNewCards ()         
            return    
        } else if  (screen.width > 1280 && middleNum <6) {
            addNewCards ()
            enableLeft ()
            

        } else if (screen.width <= 1280 && screen.width > 768 && middleNum == 7) { 
            enableLeft ()
            disableRight ()
            addNewCards ()
            return        
        } else if (screen.width <= 1280 && screen.width > 768 && middleNum < 8) {
            enableLeft ()
            addNewCards ()

        } else if (screen.width <= 768 && screen.width >= 320 && middleNum == 15) {
            enableLeft ()
            disableRight ()
            addNewCards ()
            return
        } else if (screen.width <= 768 && screen.width >= 320 && middleNum < 16) {
            enableLeft ()
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
            addNewCards()
            return
        } else if (middleNum == 1) {
            disableLeft()
            return
        } else if (screen.width > 1280 && middleNum <= 6) {
            enableLeft ()
            enableRight()
            addNewCards ()
            return    
        } else if (screen.width <= 1280 && screen.width > 768 && middleNum <= 8) { 
            enableLeft ()
            enableRight()
            addNewCards ()
            return        
        } else if (screen.width <= 768 && screen.width >= 320 && middleNum <= 16) {
            enableLeft ()
            enableRight()
            addNewCards ()

            return
        }      
        
    }

    pagLeftOne.addEventListener('click', moveLeft)

}

pagination()







// if (screen.width > 1280) {
    
// } else if (screen.width <= 1280 && screen.width > 768) {

    

// } else if (screen.width <= 768 && screen.width >= 320) {
    

// }