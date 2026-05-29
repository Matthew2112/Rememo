/* 
   ================================================================
   Подключается в index.html в самом низу строкой:
   <script src="script.js"></script>

   Здесь четыре независимых блока:
   0. Включаем "режим JS" (для аккуратного сворачивания блоков)
   1. Hero — смена слов-якорей
   2. Якоря (блок II) — раскрытие карточки по клику
   3. История (блок III) — показ текста таймлайна по клику
   4. Способы (блок V) — появление карточек по очереди при скролле
   ================================================================ */


/* ---------- 0. РЕЖИМ JS ----------
   Добавляем класс "js" на страницу. CSS прячет сворачиваемый текст
   только когда этот класс есть. Если JS вдруг не загрузится — весь
   текст останется виден (ничего не сломается). */
document.documentElement.classList.add('js');


/* ---------- 1. HERO: смена слов-якорей ----------
   Каждые 2.2 секунды меняем слово в правой части первого экрана.
   Список слов — примеры того, что можно "заякорить". */
const anchorWords = [
  'билет', 'запах духов', 'голос', 'открытка',
  'мелодия', 'модель машинки', 'засушенный цветок', 'вкус блюда'
];
let wordIndex = 0;
const wordEl = document.getElementById('cycling-word');

if (wordEl) {
  setInterval(function () {
    // плавно гасим текущее слово
    wordEl.classList.add('is-fading');
    // через 400 мс (когда слово исчезло) подставляем следующее и проявляем
    setTimeout(function () {
      wordIndex = (wordIndex + 1) % anchorWords.length;  // % зацикливает список
      wordEl.textContent = anchorWords[wordIndex];
      wordEl.classList.remove('is-fading');
    }, 400);
  }, 2200);
}


/* ---------- 2. ЯКОРЯ (блок II): раскрытие карточки ----------
   По клику на карточку переключаем класс "is-open".
   Внутри карточки .anchor-detail раскрывается/сворачивается (это CSS). */
const anchorCards = document.querySelectorAll('.anchor-card');
anchorCards.forEach(function (card) {
  card.addEventListener('click', function () {
    card.classList.toggle('is-open');
  });
});


/* ---------- 3. ИСТОРИЯ (блок III): текст по клику на точку ----------
   По клику на пункт таймлайна показываем/прячем его описание. */
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.toggle('is-open');
  });
});


/* ---------- 4. СПОСОБЫ (блок V): появление при скролле ----------
   IntersectionObserver следит, когда блок попадает в видимую область.
   Как только сетка карточек показалась — вешаем класс "reveal-on",
   а CSS проявляет карточки по очереди (через transition-delay). */
const methodsGrid = document.querySelector('.methods-grid');

if (methodsGrid) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-on');
        observer.unobserve(entry.target); // срабатывает один раз
      }
    });
  }, {
    threshold: 0.45   // запускаем, когда видно ~15% блока
  });

  observer.observe(methodsGrid);
}
