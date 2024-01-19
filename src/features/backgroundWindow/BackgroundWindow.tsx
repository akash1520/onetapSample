import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setEvent, setInfo } from "./backgroundSlice";
import {
  useWindow,
  useGameEventProvider,
  useRunningGame,
} from "overwolf-hooks";
import {
  WINDOW_NAMES,
  REQUIRED_FEATURES_VALORANT,
  OVERWOLF_HOOKS_OPTIONS,
  REQUIRED_FEATURES_ROCKET_LEAGUE,
} from "app/constants";
import { supabase } from "app/App";

const { DESKTOP, INGAME } = WINDOW_NAMES;

//Valorant Game Event Provider
enum Game {
  "Valorant" = 21640,
  "Rocket_League" = 10798,
}

const BackgroundWindow = () => {
  const [currentGame] = useRunningGame(OVERWOLF_HOOKS_OPTIONS);
  const [desktopWindow] = useWindow(DESKTOP, OVERWOLF_HOOKS_OPTIONS);
  const [ingameWindow] = useWindow(INGAME, OVERWOLF_HOOKS_OPTIONS);
  const [{ event, info }, setGameFeatures] = useGameEventProvider<
    ValorantOverwolfGEP.Info | RocketLeagueOverwolfGEP.Info,
    ValorantOverwolfGEP.Event | RocketLeagueOverwolfGEP.Event
  >(OVERWOLF_HOOKS_OPTIONS);

  const dispatch = useDispatch();

  const openStartupWindow = useCallback(() => {
    var availableGame = false;

    switch (currentGame?.id) {
      case Game.Valorant:
        availableGame = true;
        setGameFeatures(REQUIRED_FEATURES_VALORANT);
        break;
      case Game.Rocket_League:
        availableGame = true;
        setGameFeatures(REQUIRED_FEATURES_ROCKET_LEAGUE);
        break;
      default:
        availableGame = false;
        break;
    }

    let currentWindow;

    if (availableGame) {
      if (currentGame?.gameRunning || currentGame?.gameChanged) {
        // currentWindow = ingameWindow;
        currentWindow = desktopWindow;
      } else {
        currentWindow = desktopWindow;
      }
    }

    currentWindow?.restore();
  }, [desktopWindow, ingameWindow, currentGame, setGameFeatures]);

  useEffect(() => {
    async function save_event() {
      try {
        const { error } = await supabase
          .from("event_info")
          .insert([
            { event_text: JSON.stringify(event, null, 2), info_text: " " },
          ]);

        if (error) dispatch(setError(error.message))

        dispatch(setError("Data successfully interested"))
      } catch (error) {
        dispatch(setError("Error encountered!"))
      }
    }

    event && dispatch(setEvent({ event }));
    event && save_event();
  }, [event, dispatch]);

  useEffect(() => {
    async function save_info() {
      try {
        const { error } = await supabase
          .from("event_info")
          .insert([
            { event_text: " ", info_text: JSON.stringify(info, null, 2) },
          ]);

        if (error) dispatch(setError(error.message))

        dispatch(setError("Data successfully interested"))
      } catch (error) {
        dispatch(setError("Error encountered!"))
      }
    }

    info && dispatch(setInfo({ info }));
    info && save_info();
  }, [info, dispatch]);

  useEffect(() => {
    openStartupWindow();
  }, [openStartupWindow]);

  return <></>;
};

export default BackgroundWindow;
