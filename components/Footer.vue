<template>
	<footer class = "footer">
        <div class = "footer-w">
            <div class="footer-item">
                <p class = "footer-title">Разделы сайта:</p>
                <ul class = "footer-menu">
                	<!--
                    <li class = "footer-menu-item" v-for = "item in categories" :key = "item.id">
                        <NuxtLink to = "{path: `/catalog/${item.url_name}/`}"
                        	:class = "['footer-menu__link']"
                        	:data-category = item.id>{{item.name}}
                    	</NuxtLink>
                    </li>
                   -->
                </ul>
            </div>
            <div class="footer-item"></div>
            <div class="footer-item">
                <p class = "footer-title">Свяжитесь с нами удобным для Вас способом:</p>
                <div class="footer-messengers">
                    <span class = "footer-contacts-span">Мы в мессенджерах:</span>
                        <div class = "footer-messengers-container">
                        <a href="" class = "footer-social-link">
                            <img :src="require('../assets/icons/social/whatsapp.svg')" alt="" class = "footer-social">
                        </a>
                        <a href="" class = "footer-social-link">
                            <img :src="require('../assets/icons/social/viber.svg')" alt="" class = "footer-social">
                        </a>
                        <a href="" class = "footer-social-link">
                            <img :src="require('../assets/icons/social/telegram.svg')" alt="" class = "footer-social">
                        </a>
                    </div>
                </div>
                <div class="footer-contacts">
                    <p class = "footer-phone">
                        <span class = "footer-contacts-span">Звоните нам:</span>
                        <a href="tel:+77777777777" class = "footer-phone__link">+7 (777) 777-77-77</a>
                    </p>
                    <p class = "footer-email">
                        <span class = "footer-contacts-span">Наш email:</span>
                        <a href="mailto:mail@mail.ru" class = "footer-email__link">mail@mail.ru</a>
                    </p>
                </div>
            </div>
        </div>
	</footer>
</template>

<script>

export default {

    data(){
        return {}
    },  /*
    computed: {
        categories(){
            return this.$store.state.categories
        }
    }	*/
}

</script>