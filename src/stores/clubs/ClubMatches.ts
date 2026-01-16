import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createApi } from '@/api';

export const useClubMatchesStore = defineStore("ClubMatches", () => {
  const data = ref([{
    id: 0,
    utcDate: "",
    status: "",
    homeTeam: {
      id: 0,
      shortName: "",
      crest: ""
    },
    awayTeam: {
      id: 0,
      shortName: "",
      crest: ""
    },
    score: {
      winner: "",
      fullTime: {
        home: 0,
        away: 0
      }
    }
  }]);

  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function resetClubMatches() {
    data.value = []
    isLoading.value = true
    error.value = null
  }

  async function fetchClubMatches(clubId: string, status: string) {
    try {
      isLoading.value = true
      error.value = null
      
      const api = createApi();
      const response = await api.get(`/teams/${clubId}/matches?status=${status}&limit=5`)
  
      data.value.push(...response.data.matches)
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

  return { data, isLoading, error, fetchClubMatches, resetClubMatches };
})