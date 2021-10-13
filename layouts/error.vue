<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      <p class = "page-404">404</p>
      <p class = "page-404-info">Страница не найдена</p>
      <p class = "page-404-comeback">
        <NuxtLink :to = "{path: '/'}">
            Вернуться на главную
        </NuxtLink>
      </p>
    </h1>
    <h1 v-else>An error occurred</h1>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>