'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
// Keep the initial HTML as a useful fallback when scripts or the data request fail.
fetch('writing.json').then(response => {
  if (!response.ok) throw new Error('Writing data unavailable');
  return response.json();
}).then(articles => {
  if (!Array.isArray(articles) || articles.length === 0) return;
  const list = document.getElementById('writing-list');
  const fragment = document.createDocumentFragment();
  let publishedCount = 0;
  for (const [index, article] of articles.entries()) {
    const published = article.status === 'published' && typeof article.url === 'string' && /^https:\/\//i.test(article.url);
    if (published) publishedCount++;
    const row = document.createElement('article');
    row.className = 'writing-row' + (published ? '' : ' placeholder');
    const number = document.createElement('span');
    number.className = 'writing-index';
    number.textContent = String(index + 1).padStart(2, '0');
    const content = document.createElement('div');
    const category = document.createElement('p');
    category.className = 'writing-category';
    category.textContent = (published ? '' : '待添加 · ') + (article.category || '公众号文章');
    const heading = document.createElement('h3');
    if (published) {
      const link = document.createElement('a');
      link.href = article.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = article.title + ' ↗';
      link.setAttribute('aria-label', article.title + '（新窗口阅读原文）');
      heading.append(link);
    } else heading.textContent = article.title;
    const summary = document.createElement('p');
    summary.textContent = article.summary || '';
    content.append(category, heading, summary);
    const state = document.createElement(published && article.date ? 'time' : 'span');
    state.className = 'writing-state';
    state.textContent = published ? (article.date || '阅读原文 ↗') : '即将补充';
    if (published && article.date) state.dateTime = article.date;
    row.append(number, content, state);
    fragment.append(row);
  }
  list.replaceChildren(fragment);
  const note = document.querySelector('.writing-note');
  if (publishedCount === articles.length) note.textContent = '来自微信公众号的文字与思考。';
  else if (publishedCount > 0) note.textContent = '文章持续整理中 · 标记为待添加的条目是展示占位。';
}).catch(() => { /* Static content remains available. */ });
