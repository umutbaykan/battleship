import React, { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import NumberField from "../../../../components/NumberField/NumberField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { socket } from "../../../../socket";
import { createRoom } from "../../../../services/room";
import { LoggedInContext } from "../../../../App";

const GameConfigForm = () => {
  const [loggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validate = Yup.object({
    size: Yup.number()
      .min(5, "Must be at least 5")
      .max(16, "Must be 16 or less"),
    destroyer: Yup.number()
      .min(0, "Cant have negative ships")
      .max(5, "Lets not go crazy captain"),
    cruiser: Yup.number()
      .min(0, "Cant have negative ships")
      .max(5, "Lets not go crazy captain"),
    battleship: Yup.number()
      .min(0, "Cant have negative ships")
      .max(5, "Lets not go crazy captain"),
    aircraftCarrier: Yup.number()
      .min(0, "Cant have negative ships")
      .max(5, "Lets not go crazy captain"),
  }).test("atLeastOneAboveZero", "We need a ship, captain.", (values) => {
    const { destroyer, cruiser, battleship, aircraftCarrier } = values;
    return (
      destroyer > 0 || cruiser > 0 || battleship > 0 || aircraftCarrier > 0
    );
  });

  const handleSubmit = async (gameconfigs) => {
    if (!loggedIn) {
      navigate("/login");
    }
    const result = await createRoom(gameconfigs);
    if (result.room) {
      socket.emit("join", result.room);
      navigate(`/game/${result.room}`);
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          size: 10,
          destroyer: 1,
          cruiser: 1,
          battleship: 1,
          aircraftCarrier: 1,
          who_started: 1,
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          const {
            size,
            destroyer,
            cruiser,
            battleship,
            aircraftCarrier,
            who_started,
          } = values;
          const formattedValues = {
            size,
            ships: [
              { Destroyer: destroyer },
              { Cruiser: cruiser },
              { Battleship: battleship },
              { AircraftCarrier: aircraftCarrier },
            ],
            who_started: parseInt(who_started),
          };
          handleSubmit(formattedValues);
        }}
      >
        {() => (
          <div className="container config">
            <h4>Want to choose your own?</h4>
            <p>Configure your game below and create your own game.</p>
            <Form className="container inputs">
              <NumberField label="Board Size:" name="size" />
              <NumberField label="Destroyer" name="destroyer" />
              <NumberField label="Cruiser" name="cruiser" />
              <NumberField label="Battleship" name="battleship" />
              <NumberField
                label="Aircraft Carrier"
                name="aircraftCarrier"
                type="number"
              />
              <p className="small-text">Who starts?</p>
              <label>
                <Field type="radio" name="who_started" value="1" />
                Me
              </label>
              <label>
                <Field type="radio" name="who_started" value="0" />
                My opponent
              </label>
              <button className="button-join" type="submit">
                Create game
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <p className="error">{error}</p>
    </>
  );
};

export default GameConfigForm;
