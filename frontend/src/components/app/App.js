import React, { useState, useEffect } from "react";
import { socket } from "../../socket";
import { ConnectionState } from "../connection-state/ConnectionState";
import { ConnectionManager } from "../connection-manager/ConnectionManager";
import { Events } from "../events/Events";
import { MyForm } from "../my-form/MyForm";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [loginName, setLoginName] = useState("");

  // const [room, setRoom] = useState('room1')

  // const handleButtonClick = () => {
  //   fetch("/join", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({"room": room})
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  // const checkRoom = () => {
  //   fetch("/someroom", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  const login = () => {
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({"username": loginName, "password": "password"})
    })
      // .then((response) => response.json())
      // .then((data) => console.log(data));
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => console.error(error));
  };

  const logout = () => {
    fetch("/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("respond-something", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("respond-something", onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <br>
      </br>
      <input onChange={(e) => setLoginName(e.target.value)} />
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      <MyForm />


    </div>
  );
}
