<template>
    <div class="novedades">
        <section class="hero">
            <div class="hero-slide">
                <img src="../images/slider2.jpg">
            </div>
        </section>
        <div class="products-heading">
            <h1 class="products-heading-text">Novedades</h1>
        </div>
        <section class="products">
            <div class="products-wrapper">
                <img src="../images/preload.gif" v-show="!mostrar">
                <listaNove 
                    v-show="mostrar"
                    v-for="dato in datos"
                    v-bind:key="dato.id"
                    v-bind:listaNove="dato"/>
            </div> 
        </section>
    </div>
</template>

<script>
import listaNove from '../components/listaNove.vue'
import { db } from '../components/db.js'  
export default {
    name: 'novedades',
    components: {
        listaNove
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
        datos: db.collection('productos').where('novedad','==',true)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

