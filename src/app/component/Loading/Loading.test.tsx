import React from 'react';
import { render } from '@testing-library/react';
import LoadingComponent from './Loading';

describe('LoadingComponent', () => {
  it('renders without errors', () => {
    render(<LoadingComponent />);
  });
});
