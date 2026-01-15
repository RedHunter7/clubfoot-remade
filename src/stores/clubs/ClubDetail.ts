import { defineStore } from 'pinia'
import axios from "axios"
import { ref } from 'vue'

export const useClubDetailStore = defineStore("ClubDetail", () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const placeholder = {
    id: 0,
    name: 'Club',
    crest: '',
    venue: '',
    runningCompetitions: [{
      id: 0,
      name: '',
      type: '',
      code: ''
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
  }
  const data = ref(placeholder);

  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function resetClubDetail() {
    data.value = placeholder
    isLoading.value = true
    error.value = null
  }

  async function fetchClubDetail(clubId: string) {
    try {
      data.value = placeholder
      isLoading.value = true
      error.value = null
      
      const response = await axios.get(`${apiUrl}/teams/${clubId}`, {
        headers: {
          'X-Auth-Token': apiKey,
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

  return { data, isLoading, error, fetchClubDetail, resetClubDetail };
})