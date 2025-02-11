import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Loading from '../../src/components/Loading';

test('Home', () => {
  const container = render(<Loading />);

  expect(container).toMatchSnapshot();
});
