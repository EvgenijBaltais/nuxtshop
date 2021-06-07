<template>
    <ul :class="['main-navigation']">
        <li class = "main-navigation__item">
            <NuxtLink to = "/" active-class = "active" class = "main-navigation__link" no-prefetch>
            	Главная
            </NuxtLink>
        </li>
        <li class = "main-navigation__item">
            <NuxtLink to = "/catalog" active-class = "active" class = "main-navigation__link" no-prefetch>
            	Каталог товаров
        	</NuxtLink>
        </li>
        <li class = "main-navigation__item">
            <NuxtLink to = "/catalog/flowers" active-class = "active" class = "main-navigation__link" no-prefetch>
            	Выбрать цветы
        	</NuxtLink>
        </li>
        <li class = "main-navigation__item">
            <NuxtLink to = "/favorites" active-class = "active" class = "main-navigation__link" no-prefetch>
            	Избранное
        	</NuxtLink>
        </li>
        <li class = "main-navigation__item">
            <NuxtLink to = "/contacts" active-class = "active" class = "main-navigation__link" no-prefetch>
            	Контакты
            </NuxtLink>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'MainNavigation',
  components: {

  },
  data(){
      return {}
  }
}
</script>
