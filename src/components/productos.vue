<template>
  <div class="productos">
    <div class="products-heading">
          <h1 class="products-heading-text">Nuestros Productos</h1>
      </div>
    <section class="products">
      <div class="productos-wrapper">
         <img src="../images/preload.gif" v-show="!mostrar">
          <listaProd
           v-show="mostrar"
            v-for="dato in datos"
            v-bind:key="dato.id"
            v-bind:listaProd="dato"/>
      </div>
    </section>
  </div>
</template>

<script>
import listaProd from '../components/listaProd.vue'
import { db } from '../components/db.js'
export default {
  name: 'productos',
  components:{
    listaProd
  },
  data(){
    return{
      datos:[],
      mostrar:false
    }
  },
  mounted: function(){
    setTimeout(this.loader,1000)
  },
  methods:{
    loader: function(){
        this.mostrar=true
    }
  },
  firestore:{
    datos: db.collection('productos')
  }
}
</script>

