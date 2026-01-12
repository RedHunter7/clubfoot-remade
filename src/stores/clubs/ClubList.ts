import { defineStore } from 'pinia'
import axios from "axios"
import BASE_API from '@/BaseApi'
import { ref } from 'vue'

function shuffleArray(array: never[] | undefined[]) {
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
  // const leagues = ["PL", "SA", "PD", "BL1"]
  const leagues = ["PL"]
  const callCount = ref(0);

  const data = ref([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null)

  async function resetClubList() {
    data.value = []
  }

  async function collectClubs(leagueCode: string): Promise<never[] | undefined> {
    try {
      const response = await axios.get(`${BASE_API.BASE_URL}/competitions/${leagueCode}/teams`, {
        headers: {
          'X-Auth-Token': BASE_API.API_KEY,
        },
      })

      return response.data.teams

    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        return undefined
        // console.log(error.value)
        //console.log(err)
      }
    } finally {
      callCount.value = callCount.value + 1
      if (callCount.value == leagues.length) {
        isLoading.value = false
      }
    }
  }

  async function fetchClubList() {
    callCount.value = 0
    isLoading.value = true
    error.value = null

    leagues.forEach(async league => {
        const result = await collectClubs(league);
        if (result) {
            data.value.push(...result);
            shuffleArray(data.value)
        }
    });
  }

  return { data, isLoading, error, fetchClubList, resetClubList };
})