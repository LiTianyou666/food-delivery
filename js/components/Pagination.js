export function renderPagination(page, totalPages, sort, vegFlag) {
    let pageHtml = '';
    for(let i = 1; i <= totalPages; i++){
        const qs = new URLSearchParams();
        qs.set('page', i);
        if(sort) qs.set('sorting', sort);
        qs.set('vegetarian', vegFlag);
        const active = Number(page) === i ? 'active' : '';
        pageHtml += `<a class="${active}" href="?${qs}">${i}</a>`;
    }
    return `<div class="pagination">${pageHtml}</div>`;
}