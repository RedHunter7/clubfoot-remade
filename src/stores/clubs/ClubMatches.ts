import { defineStore } from 'pinia'
import axios from "axios"
import BASE_API from '@/BaseApi'
import { ref } from 'vue'

export const useClubMatchesStore = defineStore("ClubMatches", () => {
  const data = ref([])
  /*
  const data = ref([{
    id: 0,
    utcDate: "",
    homeTeam: {
        shortName: "",
        crest: ""
    },
    awayTeam: {
        shortName: "",
        crest: ""
    }
  }]); */

  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function fetchClubMatches(clubId: string, status: string) {
    try {
      const response = await axios.get(`${BASE_API.BASE_URL}/teams/${clubId}/matches?status=${status}&limit=5`, {
        headers: {
          'X-Auth-Token': BASE_API.API_KEY,
        },
      })
  
      data.value = response.data.matches

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

  return { data, isLoading, error, fetchClubMatches };
})