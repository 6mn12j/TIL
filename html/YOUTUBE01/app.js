const nextItemButton = document.querySelector('button .next__item i');
const nextItems = document.querySelectorAll('.next__item');
const titleButton = document.querySelector('.title__button');

const HandlenextItemMouseIn = (e) => {
  const targetItem = e.target.closest('li');
  const targetButton = targetItem.querySelector('.next__item i');
  targetButton.classList.remove('blind');
};

const HandlenextItemMouseOut = (e) => {
  const targetItem = e.target.closest('li');
  const targetButton = targetItem.querySelector('.next__item i');
  targetButton.classList.add('blind');
};

const titleButtonClick = (e) => {
  const targetTitle = e.target.closest('button').closest('.title').querySelector('.title__text');

  targetTitle.style.whiteSpace = targetTitle.style.whiteSpace === 'normal' ? 'nowrap' : 'normal';
};

for (const item of nextItems) {
  item.addEventListener('mouseover', HandlenextItemMouseIn);
  item.addEventListener('mouseout', HandlenextItemMouseOut);
}

titleButton.addEventListener('click', titleButtonClick);
