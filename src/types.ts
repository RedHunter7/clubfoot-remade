type Team = {
    id: number
    shortName: string
    crest: string
    runningCompetitions: [
      {
        name: string
        type: string
      },
    ]
  }

export type { Team }