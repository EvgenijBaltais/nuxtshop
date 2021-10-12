<template>
	<div class = "cart-page">
	    <div class = "cart-block">
            <div v-if = "cart.length">
                <div class="cart-block-title">
                    <div class = "cart-block-name">
                        <span>Товар</span>
                    </div>
                    <div class = "cart-block-itemprice">
                        <span>Цена за 1 шт</span>
                    </div>
                    <div class = "cart-block-amount">
                        <span>Количество</span>
                    </div>
                    <div class = "cart-block-commonprice">
                        <span>Общая стоимость</span>
                    </div>
                    <div class = "cart-block-remove"></div>
                </div>
                <div class="cart-block-item" v-for = "item in cart" :key = "item.id" :data-id = "item.id">
                    <div class = "cart-block-name">
                        <div class = "cart-block-pic" :style = "{backgroundImage: `url(${require('@/assets/pics/bouquets/' + item.img + '/1.jpg')})`}" ></div>
                        <p class = "cart-block-infotext">{{item.title}}</p>
                    </div>
                    <div class = "cart-block-itemprice">
                        <span>
                            {{item.price}} руб.
                        </span>
                    </div>
                    <div class = "cart-block-amount">
                        <div class = "cart-block-amount-text">
                            <span>Количество</span>
                        </div>
                        <div class = "cart-block-calc">
                            <a href = "#" class = "cart-block-minus" @click.prevent = 'changeCart("minus")'>-</a>
                            <a href = "#" class = "cart-block-value">{{item.amount}}</a>
                            <a href = "#" class = "cart-block-plus" @click.prevent = 'changeCart("plus")'>+</a>
                        </div>
                    </div>
                    <div class = "cart-block-commonprice">
                        <span>{{item.amount * item.price}} руб.</span>
                    </div>
                    <div class = "cart-block-remove">
                        <a @click.prevent = "removeFromCart" class = "cart-remove-basket" alt = "Удалить товар" title = "Удалить товар"></a>
                    </div>
                </div>
                <div class="cart-block-summ-b" v-if = "cart.length">
                    <div class = "cart-block-summ-result">
                        <p class = "bold-text">Общая стоимость: <span class = "final-price">{{commonCartValue}} руб.</span></p>
                    </div>
                </div>
            </div>
	        <div v-else class = "empty-basket-info">
	            <p class = "">В корзине пока пусто!</p>
	            <p class = "">Перейти в <router-link :to = "{path: 'catalog'}">Каталог</router-link></p>
	        </div>
	    </div>
	    <div :class = "['cart-order-block', {'hidden': !cart.length}]">
	        <div class = "order-details">
	            <div class = "order-details-form">
	                <div class = "order-details-text">
	                    <p>Оставьте Ваши контактные данные для уточнения деталей и подтверждения заказа.<br>
	                        Мы свяжемся с Вами и уточним все нюансы.<br>
	                        Для этого достаточно указать номер телефона, остальные поля по желанию:
	                    </p>
	                </div>
	                <form action="/" class = "order-data-fields">
	                    <input type="phone" class = "order-data-phone mandatory-info" placeholder = "+7 (___) ___-__-__">
	                    <input type="name" class = "order-data-name" placeholder = "Ваше имя">
	                    <input type="email" class = "order-data-email" placeholder = "_@_.__">
	                    <input type="adress" class = "order-data-adress" placeholder = "Адрес доставки">
	                    <textarea name="additional-info"  class = "order-data-additional" placeholder = "Дополнительные пожелания"></textarea>
	                    <button class = "send-order" @click.prevent = "sendOrder()">Отправить заказ!</button>
	                </form>
	            </div>
	        </div>
	        <div class = "order-datepicker-wrap">
	            <div class = "datepicker-title">
	                <span>Выберите дату заказа:</span>
	            </div>
	            <div class = "order-datepicker-insert"></div>
	            <div class = "when-choose">
	                <p class = "order-info-item">Вы выбрали дату: <span class = "choosen-date" id = "choosen-date"></span></p>
	                <p class = "order-info-item">Выберите предпочтительное время:</p>
	                <div class = "time-variants">
	                    <div class = "time-item" @click = "activateTime">10:00</div>
	                    <div class = "time-item" @click = "activateTime">11:00</div>
	                    <div class = "time-item" @click = "activateTime">12:00</div>
	                    <div class = "time-item" @click = "activateTime">13:00</div>
	                    <div class = "time-item" @click = "activateTime">14:00</div>
	                    <div class = "time-item" @click = "activateTime">15:00</div>
	                    <div class = "time-item" @click = "activateTime">16:00</div>
	                    <div class = "time-item" @click = "activateTime">17:00</div>
	                    <div class = "time-item" @click = "activateTime">18:00</div>
	                    <div class = "time-item" @click = "activateTime">19:00</div>
	                    <div class = "time-item" @click = "activateTime">20:00</div>
	                    <div class = "time-item" @click = "activateTime">21:00</div>
	                    <div class = "time-item" @click = "activateTime">22:00</div>
	                    <div class = "time-item" @click = "activateTime">23:00</div>
	                    <div class = "time-item" @click = "activateTime">24:00</div>
	                </div>
	            </div>
	        </div>
	    </div>
    </div>
</template>

<script>
import pickmeup from 'pickmeup'
import axios from 'axios'
import closeMenu from '~/mixins/closeMenu.js'

export default {
    name: 'Cart',
    mixins: [closeMenu],
    data(){
        return {
            sendingForm: 0,
            successSend: 0
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart
        },
        commonCartValue(){
            let value = 0

            for (let i = 0; i < this.cart.length; i++) {
                value += this.cart[i].amount * this.cart[i].price
            }
            return value
        }
    },
    mounted(){
            // Закрыть меню
            this.closeMenu()

            // Календарь для заказа

            pickmeup.defaults.locales['ru'] = {
                days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
            }

            let calendars = 2

            if (window.screen.width <= 600) calendars = 1 

            pickmeup('.order-datepicker-insert', {
                'calendars': calendars,
                'locale': 'ru',
                'current': 1,
                'class_name': 'order-datepicker',
                'min': new Date,
                'format': 'd.m.Y',
                'select_year': false,
                'flat': true
            })

            pickmeup('.order-datepicker-insert').show();

            document.querySelector('.order-datepicker-insert').addEventListener('pickmeup-change', function (e) {
                
                document.querySelector('.when-choose').style.display = 'block'
                document.getElementById('choosen-date').innerText = e.detail.formatted_date
            })

            // Маска телефона
            
            let im = new Inputmask("+7 (999) 999-99-99")
                im.mask(document.querySelector(".order-data-phone"))

            document.querySelector('.order-data-phone').addEventListener('keyup', function(){
                event.target.style.outline = '1px solid #94CBE0'
            })
            document.querySelector('.order-data-phone').addEventListener('focus', function(){
                event.target.style.outline = '1px solid #94CBE0'
            })
    },
    methods: {
        changeCart: function(value){

            this.$store.dispatch('changeCart', {
                id: this.getParent(event.target, 'cart-block-item').getAttribute('data-id'),
                value: value
            })
        },
        removeFromCart: function(){
            this.$store.dispatch('removeFromCart', {
                id: this.getParent(event.target, 'cart-block-item').getAttribute('data-id')
            })
        },
        sendOrder: function(){

            if (this.sendingForm != 0) return false

            if (!document.querySelector('.order-data-phone').inputmask.isComplete()) {
                document.querySelector('.order-data-phone').style.outline = '1px solid red'
                return false
            }

            this.sendingForm = 1

            let clientData = {}

            // Телефон
            clientData.phone = document.querySelector('.order-data-phone').value

            // Дата
            document.getElementById('choosen-date').innerText.length == 10 ?
            clientData.date = this.formatDate(pickmeup('.order-datepicker-insert').get_date()) : ''

            // Время
            document.querySelector('.time-item-active') ?
            clientData.time = document.querySelector('.time-item-active').innerText : ''

            // Имя
            document.querySelector('.order-data-name').value ?
            clientData.name = document.querySelector('.order-data-name').value : ''

            // Email
            document.querySelector('.order-data-email').value
            && document.querySelector('.order-data-email').value.indexOf('@') != -1
            ? clientData.email = document.querySelector('.order-data-email').value : ''

            // Адрес
            document.querySelector('.order-data-adress').value
            ? clientData.adress = document.querySelector('.order-data-adress').value : ''

            // Дополнительная инфа
            document.querySelector('.order-data-additional').value
            ? clientData.additional = document.querySelector('.order-data-additional').value : ''

            // Инфа по заказу

            let order = {}

            for (let key in this.cart) {
                order[key] = {
                    'id': this.cart[key].id,
                    'amount': this.cart[key].amount,
                    'price': this.cart[key].price * this.cart[key].amount
                }
            }

            clientData.order = JSON.stringify(order)

            // Клиент
            document.body.getAttribute('client_id') ?
            clientData.client = document.body.getAttribute('client_id') : ''

            // Номер формы
            clientData.form_id = 2

            let ev = event.target

            axios.interceptors.request.use((req) => {
                    ev.innerText = "Отправляем..."
                    return req
                }
            )

            axios.interceptors.response.use((res) => {
                    return res
                }
            )

            axios
            .post('//79.174.12.75:3001/send_order', {
                params: {
                    'clientData': clientData
                }
            }).then(response => {
                if (response.data == "Нет телефона") {
                    ev.innerText = "Не введен телефон!"
                    return false
                }
                
                ev.innerText = "Успешно!"
                this.successSend++
                document.querySelector('.main-basket__value').innerText = 0
            })
        },
        increaseValue: function(){
            let parent = this.getParent(event.target, 'product-amount-text'),
                value = parseInt(parent.querySelector('.product-amount-text-value').innerText)
                value < 100 ? parent.querySelector('.product-amount-text-value').innerText = value + 1 : ''

                document.querySelector('.product-final-value').innerText = this.product.price * (value + 1)
        },
        decreaseValue: function(){
            let parent = this.getParent(event.target, 'product-amount-text'),
                value = parseInt(parent.querySelector('.product-amount-text-value').innerText)

                if (value < 2) return false

                parent.querySelector('.product-amount-text-value').innerText = value - 1
                document.querySelector('.product-final-value').innerText = this.product.price * (value - 1)
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
        getClickedElementIndex: function(arr) {
            for (let i = 0; i < arr.length; i++) {
                if (event.target == arr[i]) return i;
            }
        },
        activateTime: function(){
           
           if (event.target.parentNode.querySelector('.time-item-active')) {
               event.target.parentNode.querySelector('.time-item-active').classList.remove('time-item-active')
           }
            event.target.classList.add('time-item-active')
        },
        formatDate(date){
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;

            return yy + '-' + mm + '-' + dd;
        }
    },
    beforeDestroy(){
        if (this.successSend) this.$store.dispatch('dropCart')
    }
}
</script>