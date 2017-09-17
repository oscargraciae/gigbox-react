import React from 'react';
import axios from 'axios';
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
      catHome: res[0].sub_categories,
      catEvents: res[1].sub_categories,
      catCourses: res[2].sub_categories,
    });
  }

  render() {
    return (
      <div className="menu-categories">
        <div className="container-fluid">
          <ul className="menu-categories-items">
            <li>
              <a>Hogar</a>
              <div className="menu-categories-options">
                <ul>
                  {this.state.catHome
                    .map(category => (
                      <li key={category.id}>
                        <a href={`/categories/hogar/${categoryToUrl(category.name)}`} className="btn-menu-category">{category.name}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </li>
            <li>
              <a>Eventos</a>
              <div className="menu-categories-options">
                <ul>
                  {this.state.catEvents
                    .map(category => (
                      <li key={category.id}>
                        <a href={`/categories/eventos-y-entretenimiento/${categoryToUrl(category.name)}`} className="btn-menu-category">{category.name}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </li>
            <li>
              <a>Aprendizaje</a>
              <div className="menu-categories-options">
                <ul>
                  {this.state.catCourses
                    .map(category => (
                      <li key={category.id}>
                        <a href={`/categories/cursos-y-clases/${categoryToUrl(category.name)}`} className="btn-menu-category">{category.name}</a>
                      </li>
                  ))}
                </ul>
              </div>
            </li>
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

          .menu-categories-items > li > a{
            color: #333;
            padding: 5px 25px;
            border-bottom: 3px solid #FFF;
          }
          .menu-categories-items > li > a:hover{
            border-bottom: 3px solid #ff1940;
          }
        `}</style>
      </div>
    );
  }
}

export default NavbarCategories;
