<template>
<div>
    <img :src="imgUri" style="width: 35%; height: 35%"/>

  <md-card>{{rNom}}</md-card><md-card>{{rCuisine}}</md-card><md-card>{{rAdresse}}</md-card>
  <h3>Notes:</h3>
    <div v-for="n in rNotes" :key="n">
      <md-card>{{n.date}}&nbsp; Note: {{n.grade}}&nbsp; Score: {{n.score}}</md-card>
    </div>

  <md-button><router-link :to="'/map/' + id">Afficher sur la map</router-link></md-button>
  <div id="carte">
    <md-button v-on:click="inverseAfficher">Afficher menu & carte</md-button>
    <div v-if="displayCarte">
      <restaurant-carte></restaurant-carte>
    </div>
  </div>
  </div>
</template>

<script>
import RestaurantCarte from "./RestaurantCarte";
export default {
  name: "RestaurantDetail",
  components: {RestaurantCarte},
  props: {},
  computed: { // computed data, permet de définir des data "calculées"
      id() {
        // on y accèdera par {{id}} dans le template, et par this.id
        // dans le code
      return this.$route.params.id
    },
    imgUri() {
        return require('@/assets/ace_restau/' + this.imguri + '.jpg');
    }
  },
  data: function() {
    return {
      apiURL: "http://localhost:8080/api/restaurants",
      rNom: "",
      rCuisine: "",
      rQuartier: "",
      rNotes: [],
      nbNotes: 0,
      rAdresse: "",
      displayCarte: false,
      imguri: 0
    };
  },
  mounted() {
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
        this.nbNotes = resp["restaurant"]["grades"].length;
        const shorty = resp["restaurant"]["address"];
        this.rAdresse = shorty["building"] + " " + shorty["street"] + " " + shorty["zipcode"] + " " + this.rQuartier;
        console.log(this.nbNotes);
        let tmp = [];
        for(var i = 0; i < this.nbNotes; ++i) {
          tmp = resp["restaurant"]["grades"][i]["date"].split('T');
          this.rNotes.push({"date": tmp[0], "grade":resp["restaurant"]["grades"][i]["grade"], "score":resp["restaurant"]["grades"][i]["score"]});
        }
        this.imguri = Math.round(Math.random()*15);
        console.log(this.imguri);
      });
    },
    inverseAfficher() {
      this.displayCarte = !this.displayCarte;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
