import { defineStore } from 'pinia'
import axios from "axios"
import BASE_API from '@/BaseApi'
import { ref } from 'vue'

export const useClubDetailStore = defineStore("ClubDetail", () => {
  const data = ref({
    id: 0,
    name: '',
    crest: '',
    venue: '',
    runningCompetitions: [{
      id: 0,
      name: '',
      code: 0
    }],
    coach: {
      id: 0,
      name: "Mikel Arteta",
      nationality: "Spain",
    },
    squad: [{
      id: 0,
      name: "Kepa Arrizabalaga",
      position: "Goalkeeper",
      nationality: "Spain"
    }]
  });

  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function fetchClubDetail(clubId: string) {
    try {
      const response = await axios.get(`${BASE_API.BASE_URL}/teams/${clubId}`, {
        headers: {
          'X-Auth-Token': BASE_API.API_KEY,
        },
      })
  
      data.value = {
        id: response.data.id,
        name: response.data.name,
        crest: response.data.crest,
        venue: response.data.venue,
        runningCompetitions: response.data.runningCompetitions,
        coach: response.data.coach,
        squad: response.data.squad
      }

      // console.log(data.value)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        // console.log(error.value)
        //console.log(err)
      }
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetchClubDetail };
})