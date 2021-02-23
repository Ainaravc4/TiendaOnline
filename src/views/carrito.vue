<template>
  <div class="tabla">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/slider.jpg">
      </div>
    </section>
    <h1 class="tabla-titulo">Carrito</h1>
    <table class="tabla-productos">
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
      </tr>

      <listaCarrito 
        v-for="dato in datos"
        v-bind:key="dato.id"
        v-on:baja="baja(dato)"
        v-on:editar="editar(dato)"
        v-bind:listaCarrito="dato"/>

        <tr>
          <td>Total: </td>
          <td>{{calcularTotal}}€</td>
          <td>{{cantidad}} zapatos</td>
        </tr>
    </table>
    <button class="tabla-btn" @click="borrar">Finalizar Pedido</button>
  </div>
</template>

<script>
import Firebase from '../components/db.js'
import listaCarrito from '../components/listaCarrito.vue'
import { db } from '../components/db.js'  
export default {
  components:{
    listaCarrito
  },
  data(){
      return{
        user: {
          loggedIn: false,
          data: null          
        },
          datos:null
      }
  },
  mounted: function() {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          this.$bind('datos', db.collection('carrito').where("user", "==", Firebase.auth.currentUser.email));
        
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
          this.datos=null;
          this.$router.push('/').catch(()=>{});
        }
      })
      
  },
  methods:{
    baja:function(producto){
      db.collection('carrito')
      .doc(producto.id)
      .delete()
    },
    editar: function(producto) {
      db.collection('carrito')
      .doc(producto.id)
      .set(producto)
    },
    borrar: function() {
      for(let dato of this.datos){
        this.baja(dato)
      }
      this.$notify({
        group: 'foo',
        title: 'Se ha realizado el pedido',
        type: 'success'
        
      });
    }
  },
  computed:{
    calcularTotal:function(){
      let total=0;
      for(let dato of this.datos){
          total+=parseInt(dato.subtotal) ;
      }
      return total
    },
    cantidad:function(){
     let total=0;
     
      for(let dato of this.datos){
          total+=dato.cantidad;
      }
      return total
    }
  },
  firestore:{
      datos: db.collection('carrito').where("user","==",Firebase.auth.currentUser ? Firebase.auth.currentUser.email: ""),
     
      
  }
}
</script>