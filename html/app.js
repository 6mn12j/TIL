const nextItemButton = document.querySelector('button .next__item i');
const nextItems = document.querySelectorAll('.next__item');

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

for (const item of nextItems) {
  item.addEventListener('mouseover', HandlenextItemMouseIn);
  item.addEventListener('mouseout', HandlenextItemMouseOut);
}
