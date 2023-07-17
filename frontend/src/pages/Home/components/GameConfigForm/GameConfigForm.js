import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import NumberField from "../../../../components/NumberField/NumberField";
import propTypes from "prop-types";
import * as Yup from "yup";

const GameConfigForm = ({ createGame }) => {
  const [error] = useState("");

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
          createGame(formattedValues);
        }}
      >
        {() => (
          <div className="container config">
            <h4>Want to choose your own?</h4>
            <p>Configure your game below and create your own game.</p>
            <Form className="container inputs">
              <NumberField
                data-cy="board-size"
                label="Board Size:"
                name="size"
              />
              <NumberField
                data-cy="destroyer"
                label="Destroyer"
                name="destroyer"
              />
              <NumberField data-cy="cruiser" label="Cruiser" name="cruiser" />
              <NumberField
                data-cy="battleship"
                label="Battleship"
                name="battleship"
              />
              <NumberField
                data-cy="aircraft-carrier"
                label="Aircraft Carrier"
                name="aircraftCarrier"
                type="number"
              />
              <p className="small-text">Who starts?</p>
              <label>
                <Field
                  data-cy="p1-start"
                  type="radio"
                  name="who_started"
                  value="1"
                />
                Me
              </label>
              <label>
                <Field
                  data-cy="p2-start"
                  type="radio"
                  name="who_started"
                  value="0"
                />
                My opponent
              </label>
              <button
                data-cy="gameconfig-submit"
                className="button-join"
                type="submit"
              >
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

GameConfigForm.propTypes = { createGame: propTypes.func };

export default GameConfigForm;
