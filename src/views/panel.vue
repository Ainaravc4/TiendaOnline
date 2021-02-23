<template>
  <div class="tabla">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/slider.jpg">
      </div>
    </section>
    <h1 class="tabla-titulo">Panel de Administración</h1>
    <table class="tabla-productos">
      <tr>
        <th>Descripcion</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Nombre</th>
        <th>Img 1</th>
        <th>Img 2</th>
      </tr>

      <listaAdmin
        v-for="dato in datos"
        v-bind:key="dato.id"
        v-on:baja="baja(dato)"
        v-on:editar="editar(dato)"
        v-on:editarNovedad="editarNovedad(dato)"
        v-on:editarStock="editarStock(dato)"
        v-on:borrarFoto="borrarFoto(dato)"
        v-bind:listaAdmin="dato"/>

    </table>
    <div class="tabla-create" @click="formulario=!formulario">
        <i class="far fa-plus-square"></i>
    </div>
    
    <form v-if="formulario" class="tabla-form">
      <div class="dato">
        <label for="nombre" >Nombre</label>
        <input id="nombre" type="text" v-model="nombre">
      </div>

      <div class="dato">
        <label for="descripcion">Descripcion</label>
        <input id="descripcion" type="text" v-model="descripcion">
      </div>

      <div class="dato">
        <label for="precio">Precio</label>
        <input id="precio" type="text"  v-model="precio">
      </div>

      <div class="dato">
        <label for="stock">Stock</label>
        <input id="stock" type="text"  v-model="stock">
      </div>

      <div class="dato">
        <label for="imagen1">Imagen 1</label>
        <input v-if="mostrar" @click="mostrar=!mostrar" type="file"  id="imagen1"  @change="verImagen1" accept="image/*" >
        

      <div class="img" v-if="imageData1!=null">                     
        <img class="tabla-dato-img"  :src="img1">
      </div> 

      </div>

      <div class="dato">
        <label for="imagen2">Imagen 2</label>
        <input v-if="mostrar2" @click="mostrar2=!mostrar2" type="file"  id="imagen2"  @change="verImagen2" accept="image/*" >
        

        <div class="img" v-if="imageData2!=null">                     
          <img class="tabla-dato-img"  :src="img2">
        </div> 

      </div>

      <div class="dato">
        <button type="submit" @click="subir">Crear</button>
      </div>

    </form>

    
  </div>
</template>

<script>
import Firebase from '../components/db.js'
import listaAdmin from '../components/listaAdmin.vue'
import { db } from '../components/db.js'
import { storage } from '../components/db.js'   
export default {
  components:{
    listaAdmin
  },
  data(){
      return{
         user: {
          loggedIn: false,
          data: null       
        },
          mostrar:true,
          mostrar2:true,
          datos:[],
          formulario:false,
          descripcion:"",
          nombre:"",
          precio:"",
          stock:"",
          imagen1:"",
          imagen2:"",

          imageData1: null,
          imageData2: null,
          img1: null,
          img2: null
      }
  },
   mounted: function() {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
          this.$router.push('/');
        }
      })
      
  },
  methods:{
    
    alta: function() {
     
      db.collection('productos').add({
        descripcion: this.descripcion,
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        stock2: this.stock,
        img:this.img1,
        img2:this.img2
      })
    },

    baja:function(producto){
      db.collection('productos')
      .doc(producto.id)
      .delete()
    },

    editar: function(producto) {
      db.collection('productos')
      .doc(producto.id)
      .set(producto)
    },
    editarStock: function(producto) {
       db.collection('productos')
      .doc(producto.id)
      .set(producto)
    },
    editarNovedad: function(producto) {
      this.editar(producto)
    },

    borrarFoto:function(producto){
      db.collection('productos')
      .doc(producto.id)
      .set(producto)
    },

    verImagen1: function(event){
    this.uploadValue=0;     
      this.imageData1 =event.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {       
        this.img1 = e.target.result;
    }
    reader.readAsDataURL(this.imageData1);

    },

    verImagen2: function(event){
      this.uploadValue=0;        
      this.imageData2 =event.target.files[0];
      var reader = new FileReader();

      reader.onload = (e) => {       
          this.img2 = e.target.result;
      }
      reader.readAsDataURL(this.imageData2);

    },

    subir(){  
      const storageRef=storage.ref(this.imageData1.name).put(this.imageData1);
      
      storageRef.on(`state_changed`,snapshot=>{
      this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log(this.uploadValue)
        }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            
              this.imagen1=url;
              this.subir2()
              this.alta()
              
              this.img1=null;
              this.imageData1 = null;
              this.$notify({
                group: 'foo',
                title: 'El producto se ha añadido',
                type: 'success'
              
              });
            });
          }      
        ); 
        this.mostrar=true;
        this.mostrar2=true;
        this.formulario=false;
    },

    subir2(){  
      const storageRef=storage.ref(this.imageData2.name).put(this.imageData2);
      
      storageRef.on(`state_changed`,snapshot=>{
      this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log(this.uploadValue)
        }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            
              this.imagen2=url;
              this.img2=null;
              this.imageData2 = null;
            });
          }      
        ); 
        this.formulario=false;
    }
  },
  firestore:{
      datos: db.collection('productos')
  }
}
</script>