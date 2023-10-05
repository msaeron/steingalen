function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';  // Show notification
    setTimeout(() => {
        notification.style.display = 'none';  // Hide notification after 3 seconds
    }, 3000);
}

function addProductToCart(imageName, productName, price, size, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { imageName, productName, price, size, quantity };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification('Item added to cart');
}


function createProductCard(imageName, productName, price, mdnum, mbnum) {
    return `
        <div class="col-md-${mdnum} mb-${mbnum}">
            <div class="card">
                <img src="fig/products/${imageName}" class="card-img-top" alt="${productName}">
                <div class="card-body">
                    <h5 class="card-title">${productName}</h5>
                    <p class="card-text">$${price}</p>

                    <label for="${productName}-size-selection" class="d-block">Size</label>
                    <select id="${productName}-size-selection" class="form-control mb-3">
                        <option value="">Select Size</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>2XL</option>
                    </select>

                    <label for="${productName}-quantity-input" class="d-block">Quantity</label>
                    <input type="number" id="${productName}-quantity-input" class="form-control mb-3" min="1" value="1">

                    <button class="btn btn-primary btn-block" onclick="attemptAddProductToCart('${imageName}', '${productName}', '${price}', '${productName}-size-selection', '${productName}-quantity-input', this)">ADD TO CART</button>

                </div>
            </div>
        </div>
    `;
}

function attemptAddProductToCart(imageName, productName, price, sizeSelectionId, quantityInputId, buttonElement) {
    var sizeSelection = document.getElementById(sizeSelectionId);
    var quantityInput = document.getElementById(quantityInputId);
    var selectedSize = sizeSelection.value;

    if (selectedSize === "") {
        alert("Please select a size.");
    } else {
        addProductToCart(imageName, productName, price, selectedSize, quantityInput.value, buttonElement);
    }
}



document.addEventListener("DOMContentLoaded", function () {
    var currentPage = window.location.pathname.split('/').pop();
    var navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});

function handleSubmit(event) {
    event.preventDefault();  // Prevents the form from submitting the traditional way
    // You can add client-side validation here if needed

    // Redirect to the Thank You page
    window.location.href = 'message_thanks.html';
}

/* faq */
function toggleAnswer(buttonElement) {
    var answerElement = buttonElement.nextElementSibling;
    if (answerElement.style.display === "block") {
        answerElement.style.display = "none";
    } else {
        answerElement.style.display = "block";
    }
}

function attemptCheckout() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null || cart.length == 0) {
        // The cart is empty.
        alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
    } else {
        // The cart is not empty, proceed to checkout.
        window.location.href = 'checkout.html';
    }
}
