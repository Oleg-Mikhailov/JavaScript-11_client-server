(function () {
  async function loadPageById() {
    let searchParams = new URLSearchParams(window.location.search);
    const pageId = searchParams.get("id");
    const response = await fetch(`https://gorest.co.in/public-api/posts?id=${pageId}`);
    const responseComment = await fetch(`https://gorest.co.in/public-api/comments?post_id=${pageId}`);//https://gorest.co.in/public-api/comments?post_id=4
    const data = await response.json();
    const dataComment = await responseComment.json();
    console.log('dataComment', dataComment, ' ', 'pageId', pageId);
    loadDOMElements(data, dataComment);
    return data, dataComment;
  }

  loadDOMElements = (data, dataComment) => {
    let title = document.getElementById('title');
    let article = document.getElementById('article');
    let commentName = document.getElementById('commentName');
    let commentEmail = document.getElementById('commentEmail');
    let commentBody = document.getElementById('commentBody');
    title.innerHTML = data.data[0].title;
    article.innerHTML = data.data[0].body;
    commentName.innerHTML = 'Name: no name';
    commentEmail.innerHTML = 'E-mail: no Email';
    commentBody.innerHTML = 'Body: no body';
    commentName.innerHTML = 'Name: ' + dataComment.data[0].name;
    commentEmail.innerHTML = 'E-mail: ' + dataComment.data[0].email;
    commentBody.innerHTML = 'Body: ' + dataComment.data[0].body;
    console.log('dataComment', dataComment);
  }
  loadPageById();
})()
