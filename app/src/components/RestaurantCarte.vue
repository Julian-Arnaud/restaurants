<template>
    <div>
	<p style="font-weight:bold; font-size:20px; color:green;"> A la carte: </p>
        <md-card v-for="j in carte" v-bind:key="j">
            {{j}}
        </md-card>
        <md-card v-for="i in menu" v-bind:key="i">
            <p style="color:blue;font-size:18px;font-weight:bold;">Menu {{i.name}} - Prix: {{i.prix}}</p>
            <p style="color:black;font-size:18px;font-weight:bold;">Hors d'oeuvres</p>
            <md-card v-for="k in i.hors_oeuvres" v-bind:key="k">
                {{k}}
            </md-card>
            <p style="color:black;font-size:18px;font-weight:bold;">Plats</p>
            <md-card v-for="t in i.plats" v-bind:key="t">
                {{t}}
            </md-card>
            <p style="color:black;font-size:18px;font-weight:bold;">Desserts</p>
            <md-card v-for="u in i.desserts" v-bind:key="u">
                {{u}}
            </md-card>
        </md-card>
       
    </div>
</template>

<script>
    export default {
        name: "RestaurantCarte",
        data: function () {
            return {
                jsonC: [],
                carte: [],
                menu: [],
                entrees: [],
                plats: [],
                desserts: []
            }
        },
        mounted() {
            this.getCartes();
            this.chooseData();
        },
        methods: {
            getCartes() {
                this.jsonC = require("../assets/generated.json"); //ok
            },
            chooseData() {
                    const roll = Math.round(Math.random() * 20);
                console.log(roll);
                this.carte = this.jsonC[roll]["carte"];
                console.log(this.carte);
                this.menu = this.jsonC[roll]["menu"];
                console.log(this.menu);
            }
        }
    }
</script>

<style scoped>

</style>