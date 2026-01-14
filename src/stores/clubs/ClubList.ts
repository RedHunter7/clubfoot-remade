import { defineStore } from 'pinia'
import axios from "axios"
import BASE_API from '@/BaseApi'
import { ref } from 'vue'
import type { Team } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffleArray(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = 
    [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const useClubListStore = defineStore("ClubList", () => {
  const data = ref<Team[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function resetClubList() {
    data.value = []
  }

  async function fetchClubList(leagueCode: string){
    try {
      isLoading.value = true
      error.value = null

      const response = await axios.get(`${BASE_API.BASE_URL}/competitions/${leagueCode}/teams`, {
        headers: {
          'X-Auth-Token': BASE_API.API_KEY,
        },
      })

      const shuffledTeams = shuffleArray(response.data.teams)
      data.value = shuffledTeams

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

  return { data, isLoading, error, fetchClubList, resetClubList };
})