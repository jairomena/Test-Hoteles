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
              v-model="checkbox"
              label="1 estrella"
              @change="filtro(1)"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              v-model="checkbox1"
              label="2 estrellas"
              @change="filtro(2)"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              v-model="checkbox2"
              label="3 estrellas"
              @change="filtro(3)"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              v-model="checkbox3"
              label="4 estrellas"
              @change="filtro(4)"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              v-model="checkbox4"
              label="5 estrellas"
              @change="filtro(5)"
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
                  <template #activator="{ on, attrs }">
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
                    v-for="(y,index) in hotel"
                    :key="index"
                  >
                    <v-card-title class="text-h5 grey lighten-2">
                      {{ y.name }}
                    </v-card-title>

                    <v-card-text>
                      Habitaciones - {{ y.attributes.rooms }}
                    </v-card-text>
                    <v-card-text>
                      Empleados - {{ y.attributes.staff }}
                    </v-card-text>

                    <v-divider />

                    <v-card-actions>
                      <v-spacer />
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
    checkbox: false,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    loading: false,
    selection: 1,
    dialog: false,
    id: ''
  }),
  computed: {
    hotels () {
      return this.$store.state.hoteles
    },
    hotel () {
      return this.$store.state.hotel
    }
  },
  mounted () {
    this.$store.dispatch('getHoteles')
    this.$store.dispatch('getHotel', this.id)
  },
  methods: {
    filtro (param: number) {
      if (this.checkbox === true || this.checkbox1 === true ||
      this.checkbox2 === true || this.checkbox3 === true || this.checkbox4 === true) {
        this.$store.commit('filter', param)
      } else if (this.checkbox === false || this.checkbox1 === false ||
      this.checkbox2 === false || this.checkbox3 === false || this.checkbox4 === false) {
        this.$store.dispatch('getHoteles')
      }
    },
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
      alert('Su habitación ha sido reservada correctamente')
    }
  }
})
</script>
