<template>
  <div>

    <header class = "header">
      <div class="header-section container">
          <ul class = "menu">
            <li><NuxtLink to = "/">Главная</NuxtLink></li>
            <li><NuxtLink to = "/catalog">Каталог</NuxtLink></li>
            <li><NuxtLink to = "/contacts">Контакты</NuxtLink></li>
          </ul>
      </div>
    </header>
      <div class = "wrapper container">
          <Nuxt/>
      </div>
      <footer class = "footer">
        <div class="footer-section container">

        </div>
      </footer>
  </div>
</template>