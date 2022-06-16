(function () {

  let pageNumber = 1;
  let pages;

  function createPage() {
    const pageTitle = document.createElement('h1');
    pageTitle.innerHTML = "Articles list";
    pageTitle.classList.add('title');
    const div = document.getElementById('articlesList');
    const list = document.createElement('ul');
    const linkPage = document.createElement('a');
    list.id = "artList";
    list.classList.add('listreset');
    div.append(pageTitle);
    div.append(list);
    const pageNum = document.getElementById('pageNumber');
    pageNum.innerHTML = 'Номера страниц';
  }

  async function loadTitleListApp(pageNumber) {
    let searchParams = new URLSearchParams(window.location.search);
    pageNumber = searchParams.get("page");
    if (pageNumber === null) pageNumber = 1;
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${pageNumber}`);
    const data = await response.json();
    pages = data.meta.pagination.pages;
    addListIntoPage(data, pageNumber);
    linkToPage(pages);
    return data;
  }

  function addListIntoPage(data, pageNumber) {
    const div = document.getElementById('articlesList');
    let list = document.getElementById('artList');
    list.innerHTML = "";
    for (let page of data.data) {
      const tit = document.createElement('li');
      tit.classList.add('tit');
      const linkPage = document.createElement('a');
      linkPage.classList.add('link');
      linkPage.href = 'post.html' + '?id=' + page.id;/* + '&page=' + pageNumber; //post.html?id= &page=*/
      linkPage.innerHTML = page.title;
      tit.append(linkPage);
      list.append(tit);
    }
    div.append(list);
    const pageNum = document.getElementById('pageNumber');
    pageNum.innerHTML = 'Номер страницы: ' + pageNumber + ' из ' + pages;
  }

  function linkToPage(pages) {
    const linkPageListRect = document.getElementById('linkToPageRect');
    const linkPageList = document.getElementById('linkToPage');
    linkPageList.innerHTML = "";
    let pageLinkNumber;
    for (let i = 0; i < 15; i++) {
      const linkPageItem = document.createElement('a');
      pageLinkNumber = (pageNumber - 1) * 15 + i + 1;
      linkPageItem.innerHTML = pageLinkNumber;
      pageLinkNumber === 1 ? linkPageItem.href = '/index.html' : linkPageItem.href = '/index.html' + '?page=' + pageLinkNumber;
      linkPageItem.classList.add('linkPage');
      if (pageLinkNumber <= pages) {
      linkPageList.append(linkPageItem);
      linkPageListRect.append(linkPageList);
      }
    }
    loadTitleListApp(pageNumber);
  }

  function increaseButtonClick() {
    const button = document.getElementById('increase');
    button.addEventListener('click', function () {
      if (pageNumber < pages) pageNumber++;
      loadTitleListApp(pageNumber);
    })
  }

  function decreaseButtonClick() {
    const button = document.getElementById('decrease');
    button.addEventListener('click', function () {
      if (pageNumber > 1) pageNumber--;
      loadTitleListApp(pageNumber);
    })
  }

  /*function JumpPageButtonClick() {
    const button = document.getElementById('jumpId');
    button.addEventListener('click', function () {
      const jumpToPage = document.getElementById('jumpPageId');
      if (jumpToPage.value >= 1 && jumpToPage.value <= pages) pageNumber = jumpToPage.value;
      jumpToPage.value = "";
      loadTitleListApp(pageNumber);
    })
  }*/

  loadTitleListApp(pageNumber);
  createPage();
  increaseButtonClick();
  decreaseButtonClick();
  // JumpPageButtonClick();

})()
