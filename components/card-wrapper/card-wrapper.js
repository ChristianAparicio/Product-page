







import getData from "../../json.js";

let list = [];


class cardwrapper extends HTMLElement {
    static get observedAttributes(){
        return['class']
    }
    constructor(){
        super();
        this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.printData();
    }
    attributeChangeCallback(propName, oldValue, newValue){
        this[propName] = newValue;
        this.printData();
}

    render(){
        this.shadowRoot.innerHTML =`
        <link rel="stylesheet" href="./components/card-wrapper/style-wrapper.css">
        ` 
         this.shadowRoot.innerHTML +=` 
        <section class="detail">

<figure class="banner">
    <img class="banner-img" src=${list[13].img1} alt="">
</figure>
<div class="gradient"></div>
<section class="product-section">

<div class="card-wrapper">
    <div class="product-imgs">
        <div class="img-display">
            <div class="img-showcase">
                <img src=${list[13].img1} alt="">
               
                <img src=${list[13].img2} alt="">
                <img src=${list[13].img3} alt="">
            </div>
        </div>

        <div class="img-select">
            <div class="img-list[0]">
                <a href="#" data-id="1">
                    <img class="selction-img" src=${list[13].img1} alt="">
                </a>
            </div>

            <div class="img-list[0]">
                <a href="#" data-id="2">
                    <img class="selction-img" src=${list[13].img2} alt="">
                </a>
            </div>

            <div class="img-list[0]">
                <a href="#" data-id="3">
                    <img class="selction-img" src=${list[13].img3} alt="">
                </a>
            </div>


        </div>
    </div>
</div>

<section class="product-content">
<h2 class="text product-title"> ${list[13].Name}</h2>
<div class="product-price">
<p class="text price-title">Price: <span class="price">${list[13].Price}</span></p>
</div>
<ul>
<li class="text">Release Year: <span class="text li-info">${list[13].Year}</span> </li>
<li class="text">Author: <span class="text li-info">${list[13].Author}</span></li>
<li class="text">Description: <span class="text li-info">${list[13].Description}</span></li>

</ul>

</section>

</section>

</section>

        `
        const imgs = this.shadowRoot.querySelectorAll('.img-select a');
        const imgBtns = [...imgs];
        console.log(imgs)
        let imgId = 1;
        
        imgBtns.forEach((imgitem) => {
            imgitem.addEventListener('click', (event) => {
                event.preventDefault();
                imgId = imgitem.dataset.id;
                this.slideImage(imgId);
            });
        });
        
        
        window.addEventListener('resize', this.slideImage(imgId));
        
        
    }
    
    slideImage(imgId){
        const displayWidth = this.shadowRoot.querySelector('.img-showcase img:first-child').clientWidth;
    
        this.shadowRoot.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    printData () {
        getData().then((a)=>{list = a
            this.render()})
        
    }
    
    
}
customElements.define("app-header", cardwrapper);
export default cardwrapper;