const webshop = [
    {
        picture: "https://uploads-ssl.webflow.com/5f5248796f0e6e75b273d0e2/5f649bb3f9afc00725d6e6b6_Small_kortgebonden_gemengd_2%20(Medium)-p-800.png",
        text: "Boeket small",
        price: "€30",
        type: "small",
        priceEur: 30,
    },
    {
        picture: "https://uploads-ssl.webflow.com/5f5248796f0e6e75b273d0e2/5f6f07a131c72f20033b72a7_Medium_Kortgebonden_gemengd%20(Medium)-p-800.png",
        text: "Boeket medium",
        price: "€40",
        type: "medium",
        priceEur: 40,
    },
    {
        picture: "https://uploads-ssl.webflow.com/5f5248796f0e6e75b273d0e2/5f649d46dc336b61c61e94c1_20200918_132013_Large_langgebonden_gemengd%20(Medium).png",
        text: "Boeket large",
        price: "€50",
        type: "large",
        priceEur: 50,
    },
];

let detailProduct = null;
let cart = [];

(() => {
    const ailiv = {

        startApp: function(){
            console.log("1. Application started");
            let location = window.location.href.split('/');
            location = location[location.length - 1];
            location = location.split('?')[0];
            console.log(location);

            switch(location) {
                case "index.html":
                    this.printWebshop();
                    this.cartSlide();
                    break;
                case "boeket.html":
                    this.showBouquetDetail();
                    break;
                case "checkout.html":
                    this.showCheckOut();
                    break;
                case "gepersonaliseerd-bloemwerk.html":
                    this.printWebshop();
                    break;
                case "webshop.html":
                    this.printWebshop();
                    break;
                case "seizoensdecoratie.html":
                    this.printWebshop();
            };

        },

        showBouquetDetail: function(){
            let parameters = new URLSearchParams(window.location.search);
            let type = parameters.get('type');
            console.log(type);

            let boeketdetail = document.querySelector(".bouquet__detail");
            detailProduct = webshop.filter((item)=> {
                console.log(item);
                console.log(item.type === type);
                return item.type === type;
            })[0];
                boeketdetail.innerHTML += `<img class = "webshop__picture" src="${detailProduct.picture}" alt="${detailProduct.text}">`;
                boeketdetail.innerHTML += `<h3 class = "webshop__text">${detailProduct.text}</h3>`;
                boeketdetail.innerHTML += `<p class = "webshop__price">${detailProduct.price}</p>`;
            
            let addToCartButton = document.querySelector('#cart__button__detail');
            addToCartButton.addEventListener('click', ()=> {
                // to do : formulier toevoegen
                let cart = JSON.parse(localStorage.getItem("cart"));
                if(!cart){
                  cart = [];
                }
                console.log(cart);
                cart.push(detailProduct);
                localStorage.setItem("cart",JSON.stringify(cart));
                console.log(cart);
            });
        
        },

        showCheckOut: function(){
            this.cart = document.querySelector(".cart");
            let storageCart = JSON.parse(localStorage.getItem("cart"));
            console.log(cart);
            let tempStr = "";
            storageCart.forEach((item) => {
                tempStr += `<a href = "boeket.html?type=${item.type}">`;
                tempStr += `<img class = "cart__picture" src="${item.picture}" alt="${item.text}">`;
                tempStr += `<h3 class = "cart__text">${item.text}</h3>`;
                tempStr += `<p class = "cart__price">${item.price}</p>`;
                tempStr += `</a>`;
            });
            this.cart.innerHTML = tempStr;  
        },

        printWebshop: function(){
            console.log("2.Webshop working");
            this.webshop = document.querySelector(".webshop__list");

            let tempStr = "";
            webshop.forEach((item) => {
                tempStr += `<li class="webshop__photo">`
                tempStr += `<a href = "boeket.html?type=${item.type}">`;
                tempStr += `<img class = "webshop__photo__${item.type}" src="${item.picture}" alt="${item.text}">`
                tempStr += `<h3 class = "webshop__text">${item.text}</h3>`;
                tempStr += `<p class = "webshop__price">${item.price}</p>`;
                tempStr += `</a>`;
                tempStr += `</li>`;
            });
            this.webshop.innerHTML = tempStr;  
        },

        navSlide : () => {
            const burger = document.querySelector(".burger");
            const nav = document.querySelector(".nav-links");
            const navLinks = document.querySelectorAll(".nav-links li");
        
            burger.addEventListener('click', ()=> {
                nav.classList.toggle('nav-active');
        
                navLinks.forEach((link, index)=>{
                    if(link.style.animation) {
                        link.style.animation = ''
                    } else {
                        link.style.animation = `navLinkFade forwards ${index / 10 + 0.3}s`;
                    }
                });
        
                burger.classList.toggle('toggle');
        
            });
        
        },
        


    };

    let cartBtn = document.querySelector(".button");
    let cartSlide = document.querySelector(".slide");
    cartBtn.addEventListener('click', ()=>{
        cartSlide.classList.toggle('reveal');
    });

    let removeBtn = document.querySelector(".close");
    removeBtn.addEventListener('click', ()=>{
        cartSlide.classList.remove('reveal');
    });


    const btnToTop = document.querySelector(".to-top");
    btnToTop.addEventListener('click', function(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    });

    ailiv.startApp();
    ailiv.navSlide();
})()