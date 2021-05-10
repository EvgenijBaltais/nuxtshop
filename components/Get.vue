<template>
    <div>

        <br>
        <b>Данные из базы:</b>
        <br><br>

        <button @click = "getSomeData">Получить</button>

        <div class = "insertHere"></div>

        <div class = "items">

            <div v-if = "!items.length" style = "text-align: center; font-size: 40px; font-weight: bold; font-family: 'Arial';">Загружаем</div>
            
            <div class = "item" v-for = "item in items" :key="item.id">
                <p><b>{{item.title}}</b></p>
                <br>
                <p>{{item.body}}</p>
            </div>

        </div>

    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Get',

    data(){
        return {
            a: 88,
            b: 99,
            items: []
        }
    },

    mounted() {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then((response) => {

                this.items = response.data
            })
    },
    methods: {

        getSomeData(){

            axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {

                //let data = JSON.stringify(response.data)

                for (let i = 0; i < response.data.length; i++) {

                    /*document.querySelector('.insertHere')
                    .insertAdjacentHTML('beforebegin', `<div>${JSON.stringify(response.data[i])}<br><br></div>`)*/
                }

                //document.querySelector('.insertHere').insertAdjacentHTML('beforebegin', data)
            })
        }
    },
    computed: {

        start(){
            return 'computed'
        },
        /*items(){

            axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {

                for (let i = 0; i < response.data.length; i++) {

                    return response.data

                    /*document.querySelector('.insertHere')
                    .insertAdjacentHTML('beforebegin', `<div>${JSON.stringify(response.data[i])}<br><br></div>`)*//*
                }
            })
        }*/
    }
}
</script>