import { POCPage } from './app.po';

describe('poc App', () => {
  let page: POCPage;

  beforeEach(() => {
    page = new POCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
