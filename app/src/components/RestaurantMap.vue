<template>
    <div>
        <md-button><router-link :to="'/restaurant/'+id">Retour à la description</router-link></md-button>
        <gmap-map :center="center" :zoom="15" style="width:100%;height:500px;" >
            <gmap-marker :position="center"></gmap-marker>
        </gmap-map>
    </div>

</template>

<script>
    export default {
        name: "RestaurantMap",
        computed: {
          id() {
              return this.$route.params.id;
          }
        },
        data: function () {
            return{
                apiURL: "http://localhost:8080/api/restaurants",
                center: {}
            }
        },
        mounted() {
            this.getLatLon()
        },
        methods: {
            getLatLon() {
                fetch(this.apiURL + "/" + this.id).then(resp => {
                    return resp.json();
                }).then(resp => {
                    console.log(resp);
                    this.center = {lat: resp["restaurant"]["address"]["coord"][1], lng: resp["restaurant"]["address"]["coord"][0]};
                    console.log(this.center);
                });
            }
        }
    }
</script>

<style scoped>

</style>