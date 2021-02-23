<template>
  
  <tr class="table-tr">
    <td class="table-td">
      {{listaAdmin.descripcion}}
      <input type="text" v-if=" mostrar1"  v-on:keyup.enter="editar" v-model="nuevaDescrip" >
    </td>
    <td class="table-td">
       <input  type="number" @click="editar" v-model="listaAdmin.precio"  min="0" max="500">
    </td>
    <td class="table-td">
      <input  type="number" @click="editarStock" v-model="listaAdmin.stock2"  min="0" max="100">
    </td>
    <td class="table-td">
      {{listaAdmin.nombre}}
      <input type="text" v-if=" mostrar2"  v-on:keyup.enter="editar" v-model="nuevoNombre" >
      
    </td>
    <td class="table-td">
      <img class="table-img" v-bind:src=listaAdmin.img >

      <input type="file"  @click="ultFoto" v-if=" mostrar3"  @change="verImagen1" accept="image/*" >
      <input type="button" v-if=" mostrar4" @click="subir" value="Subir">

      <div v-if="imageData1!=null">                     
        <img class="preview" height="268" width="356" :src="img1">
      </div> 

    </td>
    <td class="table-td">
      <img class="table-img" v-bind:src=listaAdmin.img2 >

      <input type="file"  @click="ultFoto" v-if=" mostrar3"  @change="verImagen2" accept="image/*" >
      <input type="button" v-if=" mostrar4" @click="subir2" value="Subir">

      <div v-if="imageData2!=null">                     
        <img class="preview" height="268" width="356" :src="img2">
      </div> 

    </td>
    <td class="table-td" >
      <i class="fas fa-trash" @click="baja"></i>
      <i class="far fa-edit" v-on:click="input"></i>
      <input type="checkbox" @click="editarNovedad" v-bind:checked=listaAdmin.novedad>
    </td>
    



    
  </tr> 


  <!--NOVEDADES-->
  
  
</template>

<script>
import { storage } from './db.js' 
export default {
  name: 'listaAdmin',
  props: ['listaAdmin'],
  data(){
    return{
      cantStock:parseInt(this.listaAdmin.stock),
      auxCant:1,

      precio:parseInt(this.listaAdmin.precio),
      auxPrecio:1,

      nuevaDescrip:"",
      mostrar1:false,

      nuevoNombre:"",
      mostrar2:false,

      mostrar4:false,
      mostrar3:false,

      imageData1: null,
      img1: null,
      imageData2: null,
      img2: null
    }
    
  },
  methods:{
    ultFoto: function(){
      this.listaAdmin.img="";
       this.$emit("borrarFoto",this.listaAdmin);
    },
    baja: function() {
      this.$emit("baja",this.listaAdmin);
      this.$notify({
        group: 'foo',
        title: 'Producto eliminado',
        type: 'success'
      });
    },
    editarNovedad: function(){
      //editar novedades
      this.listaAdmin.novedad=!this.listaAdmin.novedad;
      this.$emit("editarNovedad",this.listaAdmin);
    },
    editarStock: function(){
      //editar stock
      if(this.cantStock>0){
        
        if(this.auxCant<this.cantStock){
          this.auxCant=parseInt( this.cantStock)
          this.listaAdmin.stock2--
        }else if(this.auxCant>this.cantStock){
          this.auxCant=parseInt( this.cantStock)
           this.listaAdmin.stock2++
        }
        
      }
      this.listaAdmin.stock=this.listaAdmin.stock2;
      this.$emit("editarStock",this.listaAdmin);
    },
    editar: function(){
     
    //editar precio
      if(this.precio>0){
        
        if(this.auxPrecio<this.precio){
          this.auxPrecio=parseInt( this.precio)
          this.listaAdmin.precio--
        }else if(this.auxPrecio>this.precio){
          this.auxPrecio=parseInt( this.precio)
           this.listaAdmin.precio++
        }
        
      }

      // editar descripcion
      if(this.nuevaDescrip!=""){
        this.listaAdmin.descripcion=this.nuevaDescrip
      }
     
      
      //editar nombre
      if(this.nuevoNombre!=""){
        this.listaAdmin.nombre=this.nuevoNombre
      }
      this.input()
      

      this.$emit("editar",this.listaAdmin);
    },
  input: function () {
    this.mostrar1=!this.mostrar1
    this.mostrar2=!this.mostrar2
    this.mostrar4=!this.mostrar4
    this.mostrar3=!this.mostrar3
  },
  verImagen1: function(event){
    this.uploadValue=0;          
    this.imageData1 = event.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
        this.img1 = e.target.result;
    }
    reader.readAsDataURL(this.imageData1);

  },
  verImagen2: function(event){
    this.uploadValue=0;          
    this.imageData2 = event.target.files[0];
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
          
            this.listaAdmin.img=url;
            this.$emit("editar",this.listaAdmin);
            this.img1=null;
            this.imageData1 = null;
             this.$notify({
              group: 'foo',
              title: 'La imagen se ha guardado',
              type: 'success'
             
            });
          });
        }      
      ); 
     
      this.mostrar4=false;
      this.mostrar3=false;

  },
  subir2(){  
    const storageRef=storage.ref(this.imageData2.name).put(this.imageData2);
    
    storageRef.on(`state_changed`,snapshot=>{
    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log(this.uploadValue)
      }, error=>{console.log(error.message)},
    ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          
            this.listaAdmin.img2=url;
            this.$emit("editar",this.listaAdmin);
            this.img2=null;
            this.imageData2 = null;
            this.$notify({
              group: 'foo',
              title: 'La imagen se ha guardado',
              type: 'success'
            });
          });
        }      
      ); 
     
     

  }

},
  computed:{
    
  }

}
</script>

