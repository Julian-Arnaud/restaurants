<template>
<div>
  <h1>Detail du restaurant d'id = {{id}}</h1>
  <md-card>{{rNom}}</md-card><md-card>{{rCuisine}}</md-card><md-card>{{rQuartier}}</md-card>
  <h3>Notes:</h3>
  <ul>
    <li v-for="n in rNotes" :key="n">
      <md-card>Date: {{n.date}}&nbsp; Note: {{n.grade}}&nbsp; Score: {{n.score}}</md-card>
    </li>
  </ul>
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
      rQuartier: "",
      rNotes: [],
      nbNotes: 0
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
        console.log(this.nbNotes);
        for(var i = 0; i < this.nbNotes; ++i) {
          this.rNotes.push({"date": resp["restaurant"]["grades"][i]["date"], "grade":resp["restaurant"]["grades"][i]["grade"], "score":resp["restaurant"]["grades"][i]["score"]});
        }
      });
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
