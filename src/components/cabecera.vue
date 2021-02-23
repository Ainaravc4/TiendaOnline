<template>
  <div class="cabecera">
    <div class="logo">
       <router-link class="first-nav-link" to="/"><img src="../images/logo.png" class="logo-img"></router-link>
    </div>

      <div class="heading">
          <h1 class="heading-text">Calzados Ainara</h1>
      </div>    

   
      <nav class="first-nav">
        <ul class="first-nav-list">
          <li class="first-nav-item">
            <p class="first-nav-link"  v-if="!authenticated" @click="registro=false;"  data-toggle="modal" data-target="#exampleModal">Login</p>
            <p class="first-nav-link" v-if="authenticated" @click="logout" >Logout</p>
            <div  class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div  class="modal-dialog" role="document">
                <div  class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      X
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="modal-body-form">
                        <label for="correo">Email</label>
                        <input type="text" id="correo" v-model="email">
                        <label for="contraseña">Contraseña</label>
                        <input type="password" id="contraseña" v-model="password">
                        <p v-if="!registro" @click="registro=!registro">Registrarse</p>
                        <button class="modal-body-form-button" v-if="!registro" @click="loginCorreo" >Iniciar sesion</button>
                        <button class="modal-body-form-button" v-if="registro" @click="registrarse" >Registrarse</button>
                    </div>
                    <hr>
                    <div class="modal-body-redes">
                      <ul>
                        <li class="social-media-item">
                          <a href="#" class="social-media-link" @click="loginFacebook">
                              <i class="fab fa-facebook-square"></i>
                          </a>
                          <span>Iniciar sesion con Facebook</span>
                        </li>
                        <li class="social-media-item" @click="loginGoogle">
                          <a href="#" class="social-media-link">
                              <i class="fab fa-google"></i>
                          </a>
                          <span>Iniciar sesion con Google</span>
                        </li>
                        <li class="social-media-item" @click="loginGithub">
                          <a href="#" class="social-media-link">
                              <i class="fab fa-github"></i>                              
                          </a>
                          <span>Iniciar sesion con Github</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="first-nav-item"  @click="registro=!registro">
            <p class="first-nav-link" data-toggle="modal"  data-target="#exampleModal">Registrarse</p>
          </li>

          <li class="first-nav-item" v-if="user.data.email=='admin@gmail.com'">
            <p><router-link class="first-nav-link" to="/panel">Panel</router-link> </p>
          </li>

          <li class="first-nav-item">
            <p @click="carrito"><router-link class="first-nav-link" to="/carrito">{{ firstName }}<i class="fas fa-shopping-cart"></i> ({{cantidadProductos}}) {{precioCarrito}}€ </router-link></p>
           
          </li>
          
        </ul>
      </nav>
  </div>
</template>

<script>
import Firebase from '../components/db.js'
import { db } from '../components/db.js' 

export default {
  name: 'cabecera',
  props: {
    msg: String
  },
  data () {
      return {
        user: {
          loggedIn: false,
          data: {}          
        },
        registro:false,
        email:"",
        password:"",
        modal:null,
        datos:[]
      }  
    },
  mounted: function() {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
           this.$notify({
            group: 'foo',
            title: 'Ha iniciado sesión',
            type: 'success'
          });

        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
          this.$notify({
          group: 'foo',
          title: 'Ha cerrado sesión',
          type: 'success'
        });
        }
      })
  },
  methods:{
    carrito: function(){
      if (!this.authenticated) {
        this.$notify({
        group: 'foo',
        title: 'Tiene que iniciar sesión',
        type: 'error'
      });
      }
    },
    loginGoogle:function(){
      Firebase.loginGoogle();
      
    },
    loginFacebook:function(){
      Firebase.loginFacebook();
      
    },
    loginGithub:function(){
      Firebase.loginGithub();
     
    },
    logout() {
      Firebase.logout();
      
    },
    loginCorreo(){
      this.modal=Firebase.signInWithEmailPassword(this.email,this.password);
     
    },
    registrarse(){
      Firebase.signUpWithEmailPasswoerd(this.email,this.password);
      this.$notify({
        group: 'foo',
        title: 'Ha sido registrado',
        type: 'success'
      });
      this.registro=false;
    }
    
    
  },
  computed: {
    cantidadProductos(){
      let total=0;
      if(this.user.loggedIn){
        for(let dato of this.datos)
          if(dato.user==Firebase.auth.currentUser.email)
            total+=dato.cantidad;
      }
     return total
    },
    precioCarrito(){
      let total=0;
      if(this.user.loggedIn){
        for(let dato of this.datos)
          if(dato.user==Firebase.auth.currentUser.email)
            total+=parseInt(dato.subtotal) ;
      }
      return total
    },
    authenticated(){
      return this.user.loggedIn
    },
    firstName(){
      if (this.user.data.displayName) {
        return this.user.data.displayName.split(' ')[0]
        
      }
      if (this.user.data.email) {
        return this.user.data.email.split(' ')[0]
        
      }
      return null
    }    
  },
  firestore:{
      datos: db.collection('carrito')
    }
}


</script>

