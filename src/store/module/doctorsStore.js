import axios from 'axios';

export default {
    namespaced: true,
    state() {
        return {
            doctors: []
        }
    },
    getters: {
        getDoctors(state) {
            return state.doctors
        }
        
    },
    mutations: {
       SAVE_DOCTORS(state, data) {
           let newData = JSON.parse(data)
           newData.data.forEach((el) => {
                state.doctors.push(el)
           })
       },
       updateTasksArr(state, data){
           console.log(state, data);
       }
     },

    actions: {
        loadDoctorsList({ commit }) {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    commit('SAVE_DOCTORS', req.responseText)
                }
            };
            req.open(
                'GET',
                'https://api.jsonbin.io/b/6273727d25069545a32da391',
                true
            );
            req.setRequestHeader(
                'secret-key',
                '$2b$10$aJalgazfDF4FthANLAoJqeQpTGJOkYQdtOnyMC4iymwAgdBrrY8OC'
            );
            req.send();
        },
        async addTaskToDB({ commit }, data){
            let name = await axios.post('https://medclients-test-default-rtdb.europe-west1.firebasedatabase.app/.json', 
           data)
           data.idDB = name.data.name
           await axios.patch(`https://medclients-test-default-rtdb.europe-west1.firebasedatabase.app/${name.data.name}/.json`, {idDB:data.idDB})
           await commit ('updateTasksArr', data)
          
       },
    }
}