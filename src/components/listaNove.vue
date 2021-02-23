<template>
    <div class="product">
        <img v-bind:src=listaNove.img class="product-img">
        <div class="product-description">
            <h2 class="product-description-heading">
                {{listaNove.nombre}}
            </h2>
            <p class="product-description-price">
                {{listaNove.precio}}€
            </p>
            <p class="product-description-des">
                {{listaNove.descripcion}}
            </p>
            <button href="#" class="product-description-btn" v-bind:disabled="botonOculto" @click="alta">
                <i class="fas fa-shopping-cart"></i>
            </button>
            
        </div>
    </div>

</template>

<script>
import Firebase from '../components/db.js'
import { db } from '../components/db.js'  
export default {
  name: 'listaNove',
  props: ['listaNove'],
  data(){
      return{
        user: {
          loggedIn: false,
          data: {}          
        },
          src:[],
          botonOculto:false
      }
    },
    mounted: function() {
      if(this.listaNove.stock<=0)
        this.botonOculto=true;
      else
        this.botonOculto=false;
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
        }
      })
  },
    methods:{
        alta: function() {
          
        if(this.user.loggedIn){
            db.collection('carrito').add({
              user:Firebase.auth.currentUser.email,
              nombre: this.listaNove.nombre,
              img: this.listaNove.img,
              precio: this.listaNove.precio,
              cantidad:1,
              stock2: this.listaNove.stock--,
              stock: this.listaNove.stock2,
              subtotal:this.listaNove.precio,
              novedad:false
            })
            this.$notify({
                group: 'foo',
                title: 'Añadido a carrito',
                type: 'success'
            });
        }else{
            this.$notify({
                group: 'foo',
                title: 'Tiene que iniciar sesión',
                type: 'error'
            });
        }
      }
    }
}
</script>


