<template>
  <tr class="table-tr">
    <td class="table-td">
      <img class="table-img" v-bind:src=listaCarrito.img >
      {{listaCarrito.nombre}}
    </td>
    <td class="table-td">
      {{listaCarrito.precio}}
    </td>
    <td class="table-td">
      <input  type="number" @click="editar" v-model="cant"  min="1" v-bind:max=listaCarrito.stock2>
    
    </td>
    <td class="table-td">
      {{listaCarrito.subtotal}}
    </td>
    <td class="table-td" @click="baja">
      <i class="fas fa-trash"></i>
    </td>
  </tr> 
  
</template>

<script>
export default {
  name: 'listaCarrito',
  props: ['listaCarrito'],
  data(){
    return{
      cant:parseInt(this.listaCarrito.cantidad),
      auxCant:0,
      stock:parseInt( this.listaCarrito.stock)
    }
    
  },
  methods:{
    baja: function() {
      this.$emit("baja",this.listaCarrito);
      this.$notify({
        group: 'foo',
        title: 'Producto eliminado',
        type: 'success'
      });
    },
    editar: function(){
      this.listaCarrito.cantidad=parseInt(this.cant) ;
      this.listaCarrito.subtotal=this.listaCarrito.precio*this.cant;
     
      if(this.stock>0){
        
        if(this.auxCant<this.cant){
          this.auxCant=parseInt( this.cant)
          this.stock--
        }else if(this.auxCant>this.cant){
          this.auxCant=parseInt( this.cant)
           this.stock++
        }
        
      }
      this.listaCarrito.stock=this.stock-1

      this.$emit("editar",this.listaCarrito);
    }

  }

}
</script>

