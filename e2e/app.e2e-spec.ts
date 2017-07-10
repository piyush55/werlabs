import { WerlabsPage } from './app.po';

describe('werlabs App', function() {
  let page: WerlabsPage;

  beforeEach(() => {
    page = new WerlabsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
