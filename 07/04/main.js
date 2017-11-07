let loaded = true;
let pageNumber = 1;

const list = document.querySelector('.list');
const templateElement = document.getElementById('repos-template');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

const renderRepo = repoObject => {
  const repo = templateContainer.querySelector('.repo').cloneNode(true);
  const name = repo.querySelector('.repo__name');
  const description = repo.querySelector('.repo__description');
  const date = repo.querySelector('.repo__date');
  const commit = repo.querySelector('.repo__commit');

  name.textContent = repoObject.name;
  name.setAttribute('href', repoObject.html_url);
  name.setAttribute('target', '_blank');
  description.textContent = repoObject.description;
  date.textContent += repoObject.created_at;
  commit.textContent += repoObject.pushed_at;

  return repo;
};

const renderRepos = data => {
  for (const repo of data) {
    list.appendChild(renderRepo(repo));
  }
  pageNumber += 1;
  loaded = true;
};

function makeGetRequest(url, successCallback, errorCallback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      const error = new Error(`Error: ${xhr.status}`);

      error.code = xhr.statusText;
      errorCallback(error);
    } else {
      successCallback(xhr.responseText);
    }
  };

  xhr.send();
}

const removeReposLoading = () => {
  document.removeEventListener('scroll', onScrollBody);
};

const parseResponse = text => {
  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    removeReposLoading();
  }
  if (data) {
    renderRepos(data);
  }
};

function onScrollBody() {
  const page = document.documentElement;
  const scrollBottom = page.scrollHeight - window.pageYOffset - page.clientHeight;

  if (scrollBottom > 0 || !loaded) {
    return;
  }
  loaded = false;

  makeGetRequest(`https://api.github.com/orgs/facebook/repos?page=${pageNumber}`,
    parseResponse,
    removeReposLoading
  );
}

document.addEventListener('scroll', onScrollBody);
onScrollBody();
