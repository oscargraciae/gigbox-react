import React from 'react';
import api from '../api';

const categoryToUrl = (name) => {
  let data = name.replace(/\s+/g, '-');
  data = data.toLowerCase();
  return data;
};

class NavbarCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      catHome: [],
      catEvents: [],
      catCourses: [],
      data: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const res = await api.categories.getCategories();
    this.setState({
      data: res,
      catHome: res[0].sub_categories,
      catEvents: res[1].sub_categories,
      catCourses: res[2].sub_categories,
    });
  }

  itemsMenu() {
    const data = this.state.data;
    return (
      data.map((item) => {
        return (
          <li key={item.id}>
            <a>{item.name}</a>
            <div className="menu-categories-options">
              <ul>
                {item.sub_categories.map(subcategory => (
                    <li key={subcategory.id}>
                      <a href={`/categories/${categoryToUrl(item.name)}/${categoryToUrl(subcategory.name)}`} className="btn-menu-category">{subcategory.name}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </li>
        );
      })
    )
  }

  render() {
    return (
      <div className="menu-categories">
        <div className="container-fluid">
          <ul className="menu-categories-items">
            {this.state.data.length > 0 && this.itemsMenu()}
          </ul>
        </div>

        <style jsx>{`
          .menu-categories {
            background: #eee;
            text-align: center;
            background: #FFF;
            padding: 1px;
            border: 0px;
            box-shadow: 0 1px 10px 0 rgba(0,0,0,.1);
          }

          .menu-categories-items a{
            color: #333;
            padding: 5px 25px;
            border-bottom: 3px solid #FFF;
          }

          .menu-categories-items > li > a:hover{
            border-bottom: 3px solid #ff1940;
          }

          @media (max-width: 600px) {
            .menu-categories {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default NavbarCategories;
