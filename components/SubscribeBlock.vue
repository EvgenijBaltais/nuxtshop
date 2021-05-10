<template>
    <div class="subscribe-block">

        <h2 class = "subscribe-block__title">Присоединяйтесь к нам!</h2>
        <p class = "subscribe-block__text">Подписывайтесь на наши новости и спецпредложения!</p>

        <div class = "subscribe-form-block">
            <form action="#" class = "subscribe-form" name = "subscribe-form">
                <input type="text" placeholder="Имя" class = "subscribe-form__name">
                <input type="text" placeholder="Почта" class = "subscribe-form__email">
                <button class = "subscribe-form__btn" @click.prevent = "subscribe_user">Подписываюсь!</button>
            </form>
        </div>
        <p class = "subscribe-block__dopinfo">Мы не рассылаем спам и не передаем личные данные третьим лицам.</p>
    </div>
</template>

<script>

import axios from 'axios'

export default {

    name: 'SubscribeBlock',
    data(){
        return {
            sendingForm: 0
        }
    },
    methods: {
        subscribe_user(){

            if (this.sendingForm != 0) return false

            if (!document.querySelector('.subscribe-form__email').value
                || document.querySelector('.subscribe-form__email').value.indexOf('@') == -1) {
                document.querySelector('.subscribe-form__email').style.border= '1px solid red'
                return false
            }

            this.sendingForm = 1

            let clientData = {}

            // Имя
            document.querySelector('.subscribe-form__name').value ?
            clientData.name = document.querySelector('.subscribe-form__name').value : ''

            // Email
            clientData.email = document.querySelector('.subscribe-form__email').value

            // Клиент
            document.body.getAttribute('client_id') ?
            clientData.client = document.body.getAttribute('client_id') : ''

            let ev = event.target

            axios.interceptors.request.use((req) => {
                    ev.innerText = "Отправка..."
                    return req
                }
            )

            axios.interceptors.response.use((res) => {
                    return res
                }
            )

            axios
            .get('//localhost:3001/subscribe', {
                params: {
                    clientData: clientData
                }
            }).then(response => {
                response.data == 'Success' ? ev.innerText = "Вы подписаны!" : ev.innerText = "Ошибка!"
                response.data == 'Email exists' ? ev.innerText = "Email уже есть" : ''
            })
        }
    },
    mounted(){

            document.querySelector('.subscribe-form__email').addEventListener('keyup', function(){
                event.target.style.border = '1px solid #CED0D2'
            })
            document.querySelector('.subscribe-form__email').addEventListener('focus', function(){
                event.target.style.border = '1px solid #CED0D2'
            })

    }
}
</script>