import React from "react";

import createContext from "zustand/context";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import PropTypes from "prop-types";

export const { Provider, useStore } = createContext();

// Provider that will contain all the information of the user.
export const UserProvider = ({ children }) => {
  return (
    <Provider
      createStore={() =>
        create(
          devtools(
            persist((set) => ({
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              isLoggedIn: false,

              updateEmail: (email) => set((state) => ({ email: email })),
              updateFirstName: (firstName) =>
                set((state) => ({ firstName: firstName })),
              updateUsername: (username) =>
                set((state) => ({ username: username })),
              updateLastName: (lastName) =>
                set((state) => ({ lastName: lastName })),
              updateIsLoggedIn: (bool) =>
                set((state) => ({ isLoggedIn: bool })),

              // Clear the user when logging out mainly.
              clearUser: () =>
                set((state) => ({
                  firstName: "",
                  lastName: "",
                  email: "",
                  username: "",
                  isLoggedIn: false,
                })),
            }))
          )
        )
      }
    >
      {children}
    </Provider>
  );
};

UserProvider.propTypes = {
  /**
   * The children of the UserProvider.
   */
  children: PropTypes.element.isRequired,
};
