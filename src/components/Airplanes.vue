<template>
  <section>
    <div class="row">
      <div class="col-sm-12">
        Favorites
        <img src="/icons/heart-fill.svg" @click="toggleFavorites = !toggleFavorites" class="heart" width="32" height="32" title="Favorites" alt="Favorites heart icon"
        />
        ({{ flights.length }})
        <!-- {{ toggleFavorites }} -->
      </div>
    </div>

    <!-- FAVORITES FLIGHTS -->
    <div v-if="toggleFavorites" class="row">
      <div class="col-md-6 col-sm-12" v-for="flight in flights" :key="flight.icao24">
        <div class="card">
          <div
            class="card-body"
            v-bind:class="{
              'bg-info': flight.origin_country == 'Portugal',
              'bg-warning': flight.origin_country == 'Germany',
              'bg-success': flight.origin_country == 'Ireland'
            }"
          >
            <!-- <h2 class="card-title">Airplane</h2> -->
            <div class="card-content">
              <div class="img-title">
                <img src="/aeroplane.png" alt="Airplane image" />
                <p class="p-title">Airplane from {{ flight.origin_country }}</p>
                <img
                  src="/icons/heart-fill.svg"
                  class="heart"
                  @click="removeFavorite(flight)"
                  width="32"
                  height="32"
                  title="Bootstrap"
                />
              </div>
              <div class="more-infos">
                <ul>
                  <li>
                    <strong>icao24</strong>
                    : {{ flight.icao24 }}
                  </li>
                  <li>
                    <strong>longitude</strong>
                    : {{ flight.longitude }}
                  </li>
                  <li>
                    <strong>latitude</strong>
                    : {{ flight.latitude }}
                  </li>
                </ul>
              </div>
              <span class="all-data" data-toggle="modal" data-target="#myModal">all data</span>
            </div>
          </div>
        </div>
        <!-- end airplane card -->
      </div>
    </div>

    <!-- STATES -->
    <div v-if="!toggleFavorites" class="row">
      <div class="col-md-6 col-sm-12">
        <h2 class="card-title">Actual Number of Flights</h2>
        <div class="card">
          <div class="card-body">
            <div class="card-img-bottom">
              <chartjs-line
                :backgroundcolor="bgColor"
                :beginzero="beginZero"
                :bind="true"
                :bordercolor="borderColor"
                :data="num_states"
                :datalabel="dataLabel"
                :labels="labels"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <h2>Airplanes Details</h2>
        <div class="row">
          <div class="col-md-6 col-sm-12" v-if="states.length == 0">
            <div class="card">
              <div class="card-body">
                <div class="card-content">
                  <p>Não existem voos neste momento.</p>
                </div>
              </div>
            </div>
            <!-- end airplane card -->
          </div>
          <div class="col-md-6 col-sm-12" v-else v-for="state in states" :key="state[0]">
            <div class="card">
              <div
                class="card-body"
                v-bind:class="{
                  'bg-info': state[2] == 'Portugal',
                  'bg-warning': state[2] == 'Germany',
                  'bg-success': state[2] == 'Ireland'
                }"
              >
                <!-- <h2 class="card-title">Airplane</h2> -->
                <div class="card-content">
                  <div class="img-title">
                    <img src="/aeroplane.png" alt="Airplane image" />
                    <p class="p-title">Airplane from {{ state[2] }}</p>
                    <img v-bind:src="imageToFlightFavorited(state[0])" class="heart" @click="addFavorite(state)" width="28" height="28" title="Favorite this flight" alt="Click for apply or unapply as a favorite" />
                  </div>
                  <div class="more-infos">
                    <ul>
                      <li>
                        <strong>icao24</strong>
                        : {{ state[0] }}
                      </li>
                      <li>
                        <strong>longitude</strong>
                        : {{ state[5] }}
                      </li>
                      <li>
                        <strong>latitude</strong>
                        : {{ state[6] }}
                      </li>
                      <li>
                        <strong>velocity</strong>
                        : {{ state[9] }} m/s
                      </li>
                    </ul>
                  </div>
                  <span class="all-data" data-toggle="modal" data-target="#myModal">all data</span>

                  <!-- Modal -->
                  <div
                    class="modal fade"
                    id="myModal"
                    data-backdrop
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <img src="/aeroplane.png" alt="Airplane image" style="margin-right: 12px;" />
                          <h5
                            class="modal-title"
                            id="staticBackdropLabel"
                          >icao24 {{ state[0] }} from {{ state[2] }}</h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <ul>
                            <li>
                              <strong>callsign:</strong>
                              {{ state[1] }}
                            </li>
                            <li>
                              <strong>origin_country:</strong>
                              {{ state[2] }}
                            </li>
                            <li>
                              <strong>time_position:</strong>
                              {{ state[3] }}
                            </li>
                            <li>
                              <strong>last_contact:</strong>
                              {{ state[4] }}
                            </li>
                            <li>
                              <strong>longitude:</strong>
                              {{ state[5] }}
                            </li>
                            <li>
                              <strong>latitude:</strong>
                              {{ state[6] }}
                            </li>
                            <li>
                              <strong>baro_altitude:</strong>
                              {{ state[7] }}
                            </li>
                            <li>
                              <strong>on_ground:</strong>
                              {{ state[8] }}
                            </li>
                            <li>
                              <strong>velocity:</strong>
                              {{ state[9] }} m/s
                            </li>
                            <li>
                              <strong>true_track:</strong>
                              {{ state[10] }}
                            </li>
                            <li>
                              <strong>vertical_rate:</strong>
                              {{ state[11] }}
                            </li>
                            <li>
                              <strong>sensors:</strong>
                              {{ state[12] }}
                            </li>
                            <li>
                              <strong>geo_altitude:</strong>
                              {{ state[13] }}
                            </li>
                            <li>
                              <strong>squawk:</strong>
                              {{ state[14] }}
                            </li>
                            <li>
                              <strong>spi:</strong>
                              {{ state[15] }}
                            </li>
                            <li>
                              <strong>position_source:</strong>
                              {{ state[16] }}
                            </li>
                          </ul>
                        </div>
                        <!-- <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Understood</button>
                        </div>-->
                      </div>
                    </div>
                  </div>
                  <!-- end modal -->
                </div>
              </div>
            </div>
            <!-- end airplane card -->
          </div>
        </div>
      </div>
    </div>
    <!-- end toggleFavorite false -->
  </section>
</template>

<script>
import AirplanesService from "@/services/airplanes-service";

export default {
  data() {
    return {
      bgColor: "#81894e",
      beginZero: false,
      borderColor: "#81894e",
      dataLabel: "Nº of airplanes",
      labels: [],
      interval: null,
      time: null,
      num_states: [],
      states: [],
      flight: {
        icao24: "",
        callsign: "",
        origin_country: "",
        time_position: null,
        last_contact: null,
        longitude: null,
        latitude: null
      },
      flights: [],
      toggleFavorites: false,
      errors: []
    };
  },
  methods: {
    onlyXAirplanes() {
      let x = 20;
      if (this.num_states.length > x) {
        this.num_states = this.num_states.slice(-x);
        this.labels = this.labels.slice(-x);
      }
    },
    pullData() {
      AirplanesService.listarStates().then(response => {
        // console.log(response.data);

        this.time = response.data.time;
        this.states = response.data.states;
        // console.log(response.data.states);
        // console.log(response.data.states.length);
        // console.log(response.data.time);

        // Populate in array data
        this.num_states.push(response.data.states.length);
        this.states = response.data.states.slice(0, 200);
        this.labels.push("");

        // Slice num_states array if necessary
        this.onlyXAirplanes();
      });
    },
    listFlights() {
      AirplanesService.listarFlights().then(response => {
        console.log('Flights Favoritos: ', response.data);
        this.flights = response.data
      });
    },
    isFlightFavorited(icao24) {
      const found = this.flights.find(element => element.icao24 == icao24);
      return found;
    },
    imageToFlightFavorited(icao24) {
      return this.isFlightFavorited(icao24) ? 'icons/heart-fill.svg' : 'icons/heart.svg'
    },
    addFavorite(state) {

      // Remove if already exists in favoite array
      if (this.isFlightFavorited(state[0])) {
        // Filtering the data and delete from DB via API REST
        let objFlight = { "icao24": state[0] }
        this.removeFavorite(objFlight)
      } else {
        this.flight.icao24 = state[0];
        this.flight.callsign = state[1];
        this.flight.origin_country = state[2];
        this.flight.time_position = state[3];
        this.flight.last_contact = state[4];
        this.flight.longitude = state[5];
        this.flight.latitude = state[6];

        // Save to array list
        this.flights.push(this.flight);

        // Save on BD from API REST
        this.saveFlight(this.flight);

        // Cleaning the flight object
        this.flight = {};
      }
      console.log(this.flights);
    },
    removeFavorite(flight) {
      console.log('Recebido para deletar :: ', flight);
      
      // Filtering the data
      this.flights = this.flights.filter(function(el) {
        return el.icao24 != flight.icao24
      });

      // Delete from DB via API REST
      AirplanesService.deletaFlight(flight).then(response => {
        console.log("Removido um flight dos favoritos")
        console.log(response)
        this.erros = []
      }).catch(e => {
        this.errors = e.response.data.errors
        console.log("CATCH ERROR: ", e.response.data.errors)
      })
    },
    saveFlight(flight) {
      AirplanesService.saveFlight(flight).then(response => {
        console.log("Novo flight inserido");
        console.log(response);
      });
    }
  },

  mounted() {
    this.pullData()
    this.listFlights()
    this.interval = setInterval(() => {
      this.pullData();
    }, 15000);
  },

  beforeDestroy: function() {
    clearInterval(this.interval);
  }
};

// https://www.yasminzy.com/vue/chart.html#steps
// https://renatello.com/vue-js-polling-using-setinterval/
// https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: circle;
  padding: 0;
}
li {
  /* display: inline-block; */
  text-align: left;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.img-title {
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: flex-end;
}
img {
  width: 45px;
}
.p-title {
  margin-left: 12px;
}
.more-infos {
  text-align: left;
  margin-top: 5px;
}
.all-data {
  float: right;
  border: 1px solid blue;
  font-size: 14px;
  padding: 0 10px;
  border-radius: 50px;
  cursor: pointer;
}
.heart {
  cursor: pointer;
}
.full {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: cadetblue;
}
</style>
