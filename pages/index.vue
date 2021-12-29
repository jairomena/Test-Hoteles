<template>
  <div>
    <v-card
      class="mx-auto "
      max-width="500"
    >
      <v-divider vertical />

      <v-btn text>
        Filtrar por estrellas:
      </v-btn>
      <v-divider horizontal />

      <v-container
        fluid
      >
        <v-row>
          <v-col cols="4">
            <v-checkbox
              label="1 estrella"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              label="2 estrellas"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              label="3 estrellas"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              label="4 estrellas"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              label="5 estrellas"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container
        fluid
      />
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in hotels"
            :key="card.id"
            cols="6"
          >
            <v-card>
              <v-img
                :src="card.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.name" />
              </v-img>
              <v-rating
                :value="card.attributes.rarity"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              />
              <div class="grey--text ms-4">
                {{ card.attributes.rarity }}
              </div>
              <div class="my-4 text-subtitle-1">
                Habitaciones - {{ card.attributes.rooms }}
              </div>
              <div class="my-4 text-subtitle-1">
                Empleados - {{ card.attributes.staff }}
              </div>
              <v-divider class="mx-4" />
              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip>5:30PM</v-chip>
                  <v-chip>7:30PM</v-chip>
                  <v-chip>8:00PM</v-chip>
                  <v-chip>9:00PM</v-chip>
                </v-chip-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="reserve"
                >
                  Reservar
                </v-btn>
                <v-dialog
                  v-model="dialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="red lighten-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Ver detalles
                    </v-btn>
                  </template>

                  <v-card
                    v-for="y in hotel"
                    :key="y.id"
                  >
                    <v-card-title class="text-h5 grey lighten-2">
                      {{y.name}}
                    </v-card-title>

                    <v-card-text>
                      {{y.name}}
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    search: '',
    loading: false,
    selection: 1,
    id: '',
    dialog: false,
    options: []
  }),
  computed: {
    hotels () {
      return this.$store.state.hoteles
    },
    hotel () {
      return this.$store.state.hotel
    },
    fiterd () {
      return this.options.filter((x:any) => x.name.include)
    }
  },
  mounted () {
    this.$store.dispatch('getHoteles')
    this.$store.dispatch('getHotel', this.id)
  },
  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
      alert('Su habitación ha sido reservada correctamente')
    }
  }
})
</script>
