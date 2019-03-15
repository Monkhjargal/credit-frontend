import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const { total, page, pages, onClick } = this.props;
    const tmp = [];
    for (let i = 0; i < pages; i++) tmp.push({ page: i + 1 });
    return (
      total > 0 && (
        <div className="pagination">
          <li
            className="link"
            onClick={() => {
              if (page - 1 > 0) {
                onClick(page - 1);
              }
            }}
          >
            &laquo;
          </li>
          {
            tmp.map((p, index) => (
              <li
                className={`link ${p.page === page && 'active'}`}
                key={`page-${p}-${index}`}
                onClick={() => {
                  if (p.page !== page) {
                    onClick(p.page);
                  }
                }}
              >
                { p.page }
              </li>
            ))
          }
          <li
            className="link"
            onClick={() => {
              if (page + 1 <= pages) {
                onClick(page + 1);
              }
            }}
          >
            &raquo;
          </li>
        </div>
      )
    );
  }
}

export default Pagination;
