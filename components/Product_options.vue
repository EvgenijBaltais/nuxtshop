<template>
    <div class="product-nav">
        <div class = "item-add-remove">
            <div class = "decrease-value" @click = decreaseValue>−</div>
            <div class = "item-value-block">
                <input type="text" class = "item-value" value = "0" readonly = "readonly">
            </div>
            <div class = "increase-value" @click = increaseValue>+</div>
            <div class = "item-order-options">
                <div class = "product-button product-loupe" data-info = "Смотреть фото">
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </div>
                <NuxtLink to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "product-button product-watch" data-info = "Подробнее">
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </NuxtLink>
                <div class = "product-button product-order" data-info = "Заказать!" @click = addToCart>
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    name: 'ProductOptions'
}
</script>


<style>
.product-nav {
    margin: 5px 0;
}
.item-add-remove {
    width: 200px;
    margin: 0 auto;
    display: flex;
}
.item-value-block {
    width: 34px;
    height: 30px;
    user-select: none;
}
.item-value-block .item-value {
    display: block;
    margin: 0% auto;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    font-family: Arial, Helvetica, sans-serif;
    width: 34px;
    height: 30px;
    outline: 0;
    border: 0;
    user-select: none;
    color: #000!important;
}
.decrease-value {
    width: 20px;
    height: 30px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    line-height: 32px;
    cursor: pointer;
    user-select: none;
}
.increase-value {
    width: 20px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
}
.item-order-options {
    width: 100px;
    display: flex;
    margin-left: auto;
    justify-content: space-between;
}
.watch-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #94cbe0;
    background-image: url('../assets/icons//eye.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}
.order-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #94cbe0;
    background-image: url('../assets/icons/cart-white.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}
.product-button-inset {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    background-color: #94CBE0;
    -webkit-transition: .3s ease;
    -moz-transition: .3s ease;
    -o-transition: .3s ease;
    transition: .3s ease;
}
.product-button-inset:hover {
    bottom: -30px;
    background: #6FA6BB;
    transition: background-color .3s;
    transition: bottom .3s;
}
.product-button-anim-first {
    width: 30px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
}
.product-button-anim-second {
    width: 30px;
    height: 30px;
    font-size: 15px;
}
.product-buttons-container {
    position: relative;
    width: 200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
}
.product-button {
    display: block;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
}

/* Кнопки в карточке продуктов */

.products-amount {
    color: #fff;
    line-height: 30px;
}

.product-plus {
    font-size: 16px;
    line-height: 30px;
}

.product-watch {
    display: block;
    text-decoration: none;
}

.product-order {
    display: block;
    text-decoration: none;
}

.product-watch .product-button-anim-first {
    background-image: url('../assets/icons/eye.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-watch .product-button-anim-second {
    background-image: url('../assets/icons/eye.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-order .product-button-anim-first {
    background-image: url('../assets/icons/cart-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-order .product-button-anim-second {
    background-image: url('../assets/icons/cart-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-loupe .product-button-anim-first {
    background-image: url('../assets/icons/loupe-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-loupe .product-button-anim-second {
    background-image: url('../assets/icons/loupe-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

/* Кнопки в карточке продуктов */

</style>