import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OverwolfEventPayload {
  event: ValorantOverwolfGEP.Event[]|RocketLeagueOverwolfGEP.Event[]
}
interface OverwolfInfoPayload {
  info: ValorantOverwolfGEP.Info|RocketLeagueOverwolfGEP.Info
}
interface BackgroundState {
  event: ValorantOverwolfGEP.Event[]|RocketLeagueOverwolfGEP.Event[]
  info: ValorantOverwolfGEP.Info|RocketLeagueOverwolfGEP.Info

  events: ValorantOverwolfGEP.Event[][]|RocketLeagueOverwolfGEP.Event[][]
  infos: ValorantOverwolfGEP.Info[]|RocketLeagueOverwolfGEP.Info[]
  
  error:string
}

const initialState: BackgroundState = {
  event: [],
  info: {},
  events: [],
  infos: [],
  error:""
}

const backgroundWindowSlice = createSlice({
  name: 'backgroundWindow',
  initialState,
  reducers: {
    setEvent(state, action: PayloadAction<OverwolfEventPayload>) {
      const { event } = action.payload
      state.event = event
      state.events.push(event)
    },
    setInfo(state, action: PayloadAction<OverwolfInfoPayload>) {
      const { info } = action.payload
      state.info = info
      state.infos.push(info)
    },setError(state, action:PayloadAction<string>){
      state.error=action.payload
    }
  },
})

export const { setEvent, setInfo, setError } = backgroundWindowSlice.actions

export default backgroundWindowSlice.reducer
