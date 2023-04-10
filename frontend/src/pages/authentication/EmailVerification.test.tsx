import React from 'react';
import {render, screen} from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import EmailVerification from './EmailVerification';
import '@testing-library/jest-dom';

describe("E-mail Verification Unit Test Suite", () => {

    it("E-mail Verification Component Renders", () => {
    
        render(
          <MemoryRouter>
            <EmailVerification />
          </MemoryRouter>
        );

        
    })

})
