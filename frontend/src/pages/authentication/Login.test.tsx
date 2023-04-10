import React from 'react';
import {render, screen} from "@testing-library/react";
import Login from './Login';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe("Login Unit Test Suite", () => {
    it("Login Component mounts with no errors", () => {

         render(
            
        <MemoryRouter>
            <Login />
        </MemoryRouter>

         )


    })
})