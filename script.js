const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCourter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");


let cart = [];

cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
});

menu.addEventListener("click", function(event) {

    let parentButton = event.target.closest(".add-to-cart-btn");
    
    if(parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price)
    }
})

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if(existingItem) {
        existingItem.quantity += 1;

    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal()
}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
        <div class="flex item-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
            
        </div>
        `

        total += item.price * item.quantity;


        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency", 
    currency: "BRL"
    });

    cartCourter.innerText = cart.length
}

cartItemsContainer.addEventListener("click", function(event) {
        if(event.target.classList.contains("remove-from-cart-btn")){
            const name = event.target.getAttribute("data-name")

            removeItemCart(name);
        }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1) {
        const item = cart[index];
        
        if(item.quantity > 1) {
            item.quantity -=1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener("input", function(event) {
    let inputValue = event.target.value;

    if(inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function() {
    const isOpen = checkRestaurante();
    if(!isOpen){ 
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, 
            style: {
              background: "#ef4444",
            },
            onClick: function(){} 
          }).showToast();
        return;
    }

    if(cart.length === 0) return; 
    
    if(addressInput.value === "") { 
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems);
    const phone = "5521992117045"

    window.open(`https://wa.me/${phone}?text=${message}Endereço:${addressInput.value}`, "_blank");

    cart = [];
    updateCartModal()
})

function checkRestaurante() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 14 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurante();

if(isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}



document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === 'u') {
        event.preventDefault();
        alert('Visualização do código-fonte desativada!');
    }
});

document.addEventListener('contextmenu', function(event) {







    const elements = document.querySelectorAll(".hidden");

elements.forEach((element) => myObserve.observe(element));


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === 'u') {
        event.preventDefault();
        alert('Visualização do código-fonte desativada!');
    }
});

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert('Clique direito desativado!');
});
   
    event.preventDefault();
    alert('Clique direito desativado!');
});
