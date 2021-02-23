<template>
  <div class="home">
    
    <novedades/>

    <productos/>

    
  </div>
</template>

<script>


import novedades from '../components/novedades.vue'
import productos from '../components/productos.vue'


export default {
  name: 'App',
  components: {
    novedades,
    productos
  },
  
}
</script>
