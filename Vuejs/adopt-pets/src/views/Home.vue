<template>
  <div class="home">
    <h1>Adopt a New Best Friend.</h1>
    <button @click="togglePetForm" class="btn btn-primary">Add New Pet</button>
    {{ getAllCats.length }}
    {{ animalsCount}}
    <b-form @submit.prevent="handleSubmit" @reset="onReset" v-if="showPetForm">
      <b-form-group id="input-group-2" label="Pet's Name:" label-for="input-2">
        <b-form-input
          type="text"
          id="input-2"
          v-model="formData.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Species:" label-for="input-3">
        <b-form-select id="input-3" v-model="formData.species" :options="['cats', 'dogs']" required></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Pet's Age:" label-for="input-2">
        <b-form-input
          type="number"
          id="input-2"
          v-model="formData.age"
          required
          placeholder="Enter Age"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  data: function() {
    return {
      showPetForm: false,
      formData: {
        name: "",
        age: 0,
        species: null
      }
    };
  },

  computed: {
    ...mapGetters(["animalsCount", "getAllCats"])
  },
  methods: {
    ...mapActions(["addPet"]),

    togglePetForm() {
      this.showPetForm = !this.showPetForm;
    },

    handleSubmit: function() {
      const { species, name, age } = this.formData;

      const payload = {
        species,
        pet: {
          name,
          age
        }
      };
      this.addPet(payload);

      // Reset form after submit
      this.formData = {
        name: "",
        age: 0,
        species: null
      };
    },

    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.formData.name = "";
      this.formData.age = "";
      this.formData.species = null;
      this.showPetForm = false;
    }
  }
};
</script>
