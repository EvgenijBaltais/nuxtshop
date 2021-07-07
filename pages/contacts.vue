<template>

<div class = "contacts-wrap">
    <div class = "contacts-data">
        <h2 class = "if-write-title">Связь с нами</h2>
        <p class = "if-write-text">Если Вы хотите сделать заказ или у Вас есть какие-то вопросы, пишите нам!</p>
        <form action="" name = "c-form" class = "c-form">
            <input type="text" name = "name" class = "c-name" id = "c-name" placeholder="Ваше имя">
            <input type="text" name = "phone" class = "c-phone" id = "c-phone" placeholder="Ваш телефон">
            <input type="text" name = "email" class = "c-email" id = "c-email" placeholder="Ваш email">
            <textarea name = "textarea" class = "c-text" id = "c-text" placeholder="Текст сообщения"></textarea>
            <button class = "c-send" @click.prevent = "sendForm">Отправить!</button>
        </form>
    </div>
    <div class = "map-block">
        <img :src="require('../assets/pics/shop.jpg')" alt="" class = "shop-image">
    </div>
</div>

</template>

<script>
import axios from 'axios'
import closeMenu from '~/mixins/closeMenu.js'

export default {

    name: "Contacts",
    mixins: [closeMenu],
    data() {
        return {
            sendingForm: 0
        }
    },
    methods: {
        sendForm(){

            if (this.sendingForm != 0) return false

            if (!document.querySelector('.c-phone').inputmask.isComplete()) {
                document.querySelector('.c-phone').style.border = '1px solid red'
                return false
            }

            this.sendingForm = 1

            let clientData = {}

            // Телефон
            clientData.phone = document.querySelector('.c-phone').value

            // Имя
            document.querySelector('.c-name').value ?
            clientData.name = document.querySelector('.c-name').value : ''

            // Email
            document.querySelector('.c-email').value
            && document.querySelector('.c-email').value.indexOf('@') != -1
            ? clientData.email = document.querySelector('.c-email').value : ''

            // Дополнительная инфа
            document.querySelector('.c-text').value
            ? clientData.additional = document.querySelector('.c-text').value : ''

            // Клиент
            document.body.getAttribute('client_id') ?
            clientData.client = document.body.getAttribute('client_id') : ''

            // Номер формы
            clientData.form_id = 3

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

                response.data == "Нет телефона" ? ev.innerText = "Не введен телефон!" : ev.innerText = "Успех!"

                setTimeout(() => {
                    ev.innerText = "Отправить заказ!"
                    this.sendingForm = 0
                }, 2000)
            })
        }
    },
    mounted(){

        // Закрыть меню
        this.closeMenu()

        // Маска телефона
        
        let im = new Inputmask("+7 (999) 999-99-99")
            im.mask(document.getElementById("c-phone"))

        document.getElementById("c-phone").addEventListener('keyup', function(){
            event.target.style.border = '1px solid #CED0D2'
        })
        document.getElementById("c-phone").addEventListener('focus', function(){
            event.target.style.border = '1px solid #CED0D2'
        })
    }
}
</script>