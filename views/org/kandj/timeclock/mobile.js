define([
  'dojox/mobile/ScrollableView',
  'dojox/mobile/Heading',
  'dojox/mobile/ToolBarButton',
  'dojox/mobile/ContentPane',
  'dojox/mobile/RoundRect',
  'dojox/mobile/RoundRectCategory',
  'dojo/domReady!'
], function(ScrollableView, Heading, ToolBarButton, ContentPane,
            RoundRect, RoundRectCategory) {
  
  var base = new ScrollableView();

  var header = new Heading({
    fixed: 'top',
    label: 'TimeClock'
  });
  var toLogBtn = new ToolBarButton({
    label: 'Log',
    transition: 'slide'
  });
  header.addChild(toLogBtn);

  var body = new ContentPane();
  for (var i = 0; i < 10; i++)
  {
    body.addChild(new RoundRectCategory({ label: 'AAA' }));
    var rect = new RoundRect();
    rect.addChild(new ContentPane({ content: 'aaa' }));
    body.addChild(rect);
  }

  var footer = new Heading({
    fixed: 'bottom',
    label: 'footer'
  });

  base.addChild(header);
  base.addChild(body);
  base.addChild(footer);

  base.placeAt(document.body);
  base.startup();
});
