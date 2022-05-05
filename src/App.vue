<template>
    <v-app>
        <v-main>
            <v-row class="mt-5" justify="center">
                <v-card
                    class="d-flex justify-space-between flex-row elevation-0"
                    width="539"
                >
                    <v-card
                        class="mt-5 elevation-0 light"
                        min-width="424"
                        height="54"
                        :outlined="focusedSelect"
                        @click="focusedSelect = !focusedSelect"
                    >
                        <v-autocomplete
                            class="mt-22"
                            :items="getDoctors"
                            v-model="doctor"
                            name="title"
                            item-text="title"
                            label="Врач, заболевания, услуги"
                            clearable
                            rounded
                            filled
                            dense
                            placeholder="Врач, заболевания, услуги"
                            no-data-text="Специальностей не найдено"
                            :rules="[(v) => !!v || 'Выберите специалиста']"
                            required
                        >
                        </v-autocomplete>
                    </v-card>
                    <v-btn
                        :disabled="doctor.length === 0"
                        class="mt-5 rounded-lg"
                        width="105"
                        height="54"
                        color="primary"
                        tile
                        @click="foundSpecialist = true"
                    >
                        Найти
                    </v-btn>
                </v-card>
            </v-row>
            <v-form
                v-model="valid"
                v-show="foundSpecialist"
                @submit.prevent="submit"
            >
                <v-container>
                    <v-card-text class="foundedDoctor"
                        >Вас примет Врач-{{ doctor }}. Для записи заполните
                        форму ниже</v-card-text
                    >
                    <v-row class="foundedDoctor">
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="firstname"
                                :rules="nameRules"
                                :counter="10"
                                label="First name"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-btn
                            class="mr-4 btnSbm"
                            type="submit"
                            :disabled="!valid"
                        >
                            submit
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
            <v-dialog v-model="dialog" max-width="550">
                <v-card>
                    <v-card-title class="text-h5">
                        Вы успешно записались к Врачу.
                    </v-card-title>
                </v-card>
                <v-btn color="green darken-1" text @click="endDialog">
                    ОК
                </v-btn>
            </v-dialog>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    data() {
        return {
            doctor: '',
            firstname: '',
            email: '',
            dialog: false,
            valid: this.firstname && this.email,
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            focusedSelect: false,
            foundSpecialist: false,
        };
    },
    computed: {
        ...mapGetters('doctorsStore', ['getDoctors']),
    },
    methods: {
        ...mapActions('doctorsStore', ['loadDoctorsList', 'addTaskToDB']),
        submit() {
            let newData = {
                doctor: this.doctor,
                name: this.firstname,
                email: this.email,
            };
            this.addTaskToDB(newData);
            this.dialog = true;
        },
        endDialog() {
            this.dialog = false;
            this.name = '';
            this.email = '';
            this.foundSpecialist = false;
        },
    },
    mounted() {
        this.loadDoctorsList();
    },
};
</script>

<style lang="scss" scoped>

</style>

