import React from 'react';
import {render, screen} from "@testing-library/react";
import NftList from './NftList';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


describe("NFT List Unit Test Suite", () => {
    it("NFT List Component Mounts", () => {
        
        render(
    <MemoryRouter>
            <NftList nfts = {["test"]} />
        </MemoryRouter>

        )
    })
})