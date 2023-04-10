import React from 'react';
import {render, screen} from "@testing-library/react";
import CreateNft from './CreateNft';
import '@testing-library/jest-dom';

// Unit test suite for creating nfts
describe("Create NFT Unit Tests", () => {

  it("Create NFT Component renders without crashing", () => {
    render(<CreateNft />)
  })

    it('Main heading h1 unit test', () => {

        render(<CreateNft />);
        const headingElement = screen.getByRole('heading', { name: /Mint Token/i });
        expect(headingElement).toBeInTheDocument();

      });
} )