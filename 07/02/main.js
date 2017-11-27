function appendToClickList() {
  const li = document.createElement('li');
  const clickList = document.querySelector('.list');

  li.textContent = `2xClick - ${new Date()}`;
  li.textContent = li.textContent.slice(0, -' GMT+0300 (RTZ 2 (зима))'.length);
  clickList.appendChild(li);
}

function doubleClick(element, doubleClickHandler, timeDistance) {
  let prevClickTimeStamp = -timeDistance;

  element.addEventListener('click', event => {
    const ckickTimeStamp = event.timeStamp;

    if (ckickTimeStamp - prevClickTimeStamp < timeDistance) {
      prevClickTimeStamp = -timeDistance;
      doubleClickHandler();
    } else {
      prevClickTimeStamp = ckickTimeStamp;
    }
  });
}

const button = document.querySelector('.button');

doubleClick(button, appendToClickList, 500);
