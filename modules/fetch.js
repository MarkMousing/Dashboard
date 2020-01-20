
(async () => {

  let feed = await parser.parseURL('http://feeds.tv2.dk/nyheder/rss');
  console.log(feed.title);
  number = 0;
  feed.items.forEach(item => {
    //console.log(item.title + ':' + item.link)
    console.log(item.title);
  });

})();
