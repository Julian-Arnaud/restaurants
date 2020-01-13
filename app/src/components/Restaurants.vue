<template>
<div>
  <p>
    Rechercher par nom:
    <input type="text" v-model="nomRecherche" v-on:input="getDataFromServer()" />
  </p>
    <p>
        Ajouter un restaurant:
        <input type="text" v-model="nom" placeholder="Nouveau nom de restau"/>
        <input type="text" v-model="cuisine" placeholder="Type de cuisine"/>
        <button v-on:click="ajouterRestaurant()">Ajouter restaurant</button>
    </p>
  <p>
    Nombre de restaurants par page :
    <input
      type="range"
      min="2"
      max="100"
      value="10"
      v-on:input="getDataFromServer()"
      v-model="pagesize"
    />
    {{pagesize}}
  </p>
  <h1>Nombre de restaurants : {{nbRestaurants}}</h1>
  <button v-on:click="pagePrecedente()" v-bind:disabled="page==0">Précédent</button>
  <button v-on:click="pageSuivante()" :disabled="page == nbPagesDeResultats">Suivant</button>
 
        <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Recherche par nom</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by name..." v-model="nomRecherche" @input="getDataFromServer()" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${nomRecherche}' query. Try a different search term or create a new user.`">
      </md-table-empty-state>
            <md-table-row slot="md-table-row" slot-scope="{ item }" v-on:click="supprimerRestaurant(item.id)">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
                <md-table-cell md-label="Details"><router-link :to="'restaurant/'+item._id">Details</router-link></md-table-cell>
            </md-table-row>
        </md-table>
  </div>
</template>

<script>
export default {
  name: "Restaurants",
  props: {},
  data: function() {
    return {
      restaurants: [],
      nbRestaurants: 0,
      nom: "",
      cuisine: "",
      page: 0,
      pagesize: 10,
      nomRecherche: "",
      nbPagesDeResultats: 0,
      apiURL: "http://localhost:8080/api/restaurants",
        customId: 0
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    this.getDataFromServer();
  },
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer des
      // restaurants sur le serveur.
      let url =
        this.apiURL +
        "?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nomRecherche;

      fetch(url)
        .then(reponseJSON => {
          return reponseJSON.json();
        })
        .then(reponseJS => {
          // ici on a la réponse sous la forme
          // d'un objet JS
          this.restaurants = reponseJS.data;
          this.nbRestaurants = reponseJS.count;
          this.nbPagesDeResultats = Math.floor(
            this.nbRestaurants / this.pagesize
          );
        });
    },
    supprimerRestaurant(index) {
      this.restaurants.splice(index, 1);
    },
    ajouterRestaurant() {
      // eviter le comportement par defaut
      //event.preventDefault();
        this.customId++;
      this.restaurants.push({
        name: this.nom,
        cuisine: this.cuisine,
          id: this.customId
      });
      this.nom = "";
      this.cuisine = "";
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
    pageSuivante() {
      console.log("Page suivante");
      this.page++;
      this.getDataFromServer();
    },
    pagePrecedente() {
      console.log("Page precedente");
      this.page--;
      this.getDataFromServer();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
