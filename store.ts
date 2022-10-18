import { createState } from '@hookstate/core'

export type Trick = {
    name: string,
    landedCount: number,
    practising: boolean,
    landed: boolean,
    link?: string
}

export type Session = {
    tricks: Trick[],
    date: Date,
    duration: number,
}

type Store = {
    tricks: Trick[],
    sessions: Session[],
}

const store = createState<Store>({
    tricks: [],
    sessions: [],
})

export default store
