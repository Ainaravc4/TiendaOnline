<template>
    <div class="producto">
      <img class="producto-img" v-bind:src=listaProd.img>
      <img class="producto-img2" v-bind:src=listaProd.img2>
      <h1>{{listaProd.nombre}}</h1>
      <p class="producto-price">{{listaProd.precio}}€</p>
      <p class="producto-paragraph">{{listaProd.descripcion}}</p>
      <p><button class="producto-button" v-bind:disabled="botonOculto" @click="alta" >Añadir al carrito</button></p>
    </div>
</template>

<script>
import Firebase from '../components/db.js'
import { db } from '../components/db.js' 
export default {
  name: 'listaProd',
  props: ['listaProd'],
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
      if(this.listaProd.stock<=0)
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
            nombre: this.listaProd.nombre,
            img: this.listaProd.img,
            precio: this.listaProd.precio,
            cantidad:1,
            stock2: this.listaProd.stock,
            stock: this.listaProd.stock2,
            subtotal:this.listaProd.precio,
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

    }, 
  }
}
</script>

