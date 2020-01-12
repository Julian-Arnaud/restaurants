<template>
<div>
  <h1>Detail du restaurant d'id = {{id}}</h1>
  <md-card>{{rNom}}</md-card><md-card>{{rCuisine}}</md-card><md-card>{{rQuartier}}</md-card>
  </div>
</template>

<script>
export default {
  name: "RestaurantDetail",
  props: {},
  computed: { // computed data, permet de définir des data "calculées"
      id() {
        // on y accèdera par {{id}} dans le template, et par this.id
        // dans le code
      return this.$route.params.id
    }
  },
  data: function() {
    return {
      apiURL: "http://localhost:8080/api/restaurants",
      rNom: "",
      rCuisine: "",
      rQuartier: ""
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    console.log("On va chercher les détails du restaurant id = " + this.$route.params.id)
    console.log("ID = " + this.id);
    this.getDataFromServer();
  },
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer le détail du restaurant
      // findRestaurantById();
      fetch(this.apiURL + "/" + this.id).then(resp => {
        return resp.json();
      }).then(resp => {
        console.log(resp);
        this.rNom = resp["restaurant"]["name"];
        this.rCuisine = resp["restaurant"]["cuisine"];
        this.rQuartier = resp["restaurant"]["borough"];
      });
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
