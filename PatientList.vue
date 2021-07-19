<template>
  <q-page>
    <!-- nav header -->
    <div class="cust-breadcump">
      <q-icon name="home" style="font-size: 30px;" class="bred-home bred-active" />
      <div class="bred-name">
        Patients
      </div>
    </div>

    <!-- TODO table interactions -->
    <div class="table-interactions">
      <q-btn style="margin-top: 20px;"
        icon="person_add"
        color="primary"
        size="md"
        label="New patient"
        @click="goAddPatient()"
        />
        <q-input v-model="searchTerm"
        :before="[
        {
          icon: 'search',
          content: true
        }]"
        placeholder="Search"
        style="align-self: flex-end;" />
    </div>
    <!-- table -->
    <div class="table-holder">
      <q-table
        :data="tableData"
        :columns="columns"
        row-key="lastvisit"
        >
        <!-- <q-tr slot-scope="props" :props="props" class="cursor-pointer" @click="gotoDetails(props.row.id)">
        </q-tr>
        <q-td slot="body-cell-avat" slot-scope="props" :props="props">
          <img v-bind:src="props.value" alt="avatar" style="max-height: 60px;">
        </q-td> -->

        <q-tr slot="body" slot-scope="props" :props="props" @click.native="gotoDetails(props.row.id)" class="cursor-pointer">
          <q-td key="avat" :props="props">
            <img v-bind:src="props.row.avatar" alt="avatar" style="max-height: 60px;">
          </q-td>
          <q-td key="desc" :props="props">
            {{ props.row.fname }} {{ props.row.lname }}
          </q-td>
          <q-td key="birth" :props="props">
            {{ props.row.birthday }}
          </q-td>
          <q-td key="birthpl" :props="props">
            {{ props.row.birthplace }}
          </q-td>
          <q-td key="lvisit" :props="props">
            {{ props.row.lastvisit }}
          </q-td>
          <q-td key="lsampl" :props="props">
            {{ props.row.lastsamples }}
          </q-td>

        </q-tr>

      </q-table>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // name: 'PageName',
  data: () => ({
    searchTerm: '',
    columns: [
      {
        name: 'avat',
        required: false,
        label: '',
        align: 'left',
        field: 'avatar',
        sortable: false,
        classes: 'my-class'
      }, {
        name: 'desc',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'fname',
        sortable: true,
        classes: 'my-class'
      }, {
        name: 'birth',
        required: true,
        label: 'Birthday',
        align: 'left',
        field: 'birthday',
        sortable: true,
        classes: 'my-class'
      }, {
        name: 'birthpl',
        required: true,
        label: 'Birth place',
        align: 'left',
        field: 'birthplace',
        sortable: true,
        classes: 'my-class'
      }, {
        name: 'lvisit',
        required: true,
        label: 'Last visit',
        align: 'left',
        field: 'lastvisit',
        sortable: true,
        classes: 'my-class'
      }, {
        name: 'lsampl',
        required: true,
        label: 'Last samples',
        align: 'left',
        field: 'lastsamples',
        sortable: true,
        classes: 'my-class'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      tableData: 'patients/getPatients'
    })
  },
  created () {
    this.$store.dispatch('patients/fetchPatients')
  },
  methods: {
    gotoDetails (gotId) {
      // console.log('goto trig', gotId)
      this.$router.push({ name: 'Details', params: { userId: gotId } })
    },
    goAddPatient () {
      // new-patient
      this.$router.push('new-patient')
    }
  }
}
</script>

<style>
.table-interactions {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  padding: 0 3vw;
  justify-content: space-between;
}
.table-holder {
  margin-top: 5vh;
  padding: 0 3vw;
}
.table-interactions .q-icon {
  display: block !important;
}
tr {
  cursor: pointer;
}
</style>
