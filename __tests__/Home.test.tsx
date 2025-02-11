import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Home from '@/app/page';

test('Home', () => {
  const container = render(<Home />);

  expect(container).toMatchSnapshot();
});
