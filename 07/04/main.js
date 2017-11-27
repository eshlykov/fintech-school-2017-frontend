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

const renderAllRepos = data => {
  for (const repo of data) {
    list.appendChild(renderRepo(repo));
  }
  pageNumber += 1;
  loaded = true;
};

const removeReposLoading = () => {
  document.removeEventListener('scroll', onScrollBody);
};

const checkResponse = response => {
  if (response.status === 200) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

function onScrollBody() {
  const page = document.documentElement;
  const scrollBottom = page.scrollHeight - window.pageYOffset - page.clientHeight;

  if (scrollBottom > 0 || !loaded) {
    return;
  }
  loaded = false;

  fetch(`https://api.github.com/orgs/facebook/repos?page=${pageNumber}`, { method: 'GET' })
    .then(checkResponse)
    .then(response => response.json())
    .then(renderAllRepos)
    .catch(removeReposLoading);
}

document.addEventListener('scroll', onScrollBody);
onScrollBody();
