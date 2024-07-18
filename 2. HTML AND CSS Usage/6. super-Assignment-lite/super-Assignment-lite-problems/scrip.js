// $('i.fa.fa-shopping-cart').click(function(){
//     console.log(this)
//     $('div.car-image')
//     .clone()
//     .addClass('zoom')
//     .appendTo('body');

//   setTimeout(() =>{
//     $(".zoom").remove
//   }, 1000)
//   })

let list = document.querySelectorAll('i.fa.fa-cart-plus')
list.forEach(i =>{
    i.onclick = function(){
        let clone = i.parentElement.parentElement.parentElement.children[0].cloneNode(true);
        clone.classList.add('zoom')
        document.getElementById('bd').append(clone)
        console.dir(i.parentElement.parentElement.parentElement.children[0])

    }
})