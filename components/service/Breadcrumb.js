import React from 'react';

import { stringToUrl } from '../../utils/index';
import { removeDiacritics } from '../../utils/removeAccents';

function Breadcrumb(props) {
  const { service } = props;
  return (
    <div className="BreadcrumbList">
      <div itemScope itemType="http://schema.org/BreadcrumbList">
        <span itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
          <div itemProp="item" className="displayBlock">
            <a href="/" aria-disabled="false">
              <span>
                <span itemProp="name">Inicio</span>
              </span>
            </a>
          </div>
          <div className="displayBlock breadMargin">
            <small>&gt;</small>
          </div>
        </span>
        <span itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
          <div itemProp="item" className="displayBlock">
            <a href={`/categories/${stringToUrl(service.category.name)}`} aria-disabled="false">
              <span>
                <span itemProp="name">{service.category.name}</span>
              </span>
            </a>
          </div>
          <div className="displayBlock breadMargin">
            <small>&gt;</small>
          </div>
        </span>
        <span itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
          <div itemProp="item" className="displayBlock">
            <a href={`/categories/${stringToUrl(removeDiacritics(service.category.name))}/${stringToUrl(removeDiacritics(service.sub_category.name))}`} aria-disabled="false">
              <span>
                <span itemProp="name">{service.sub_category.name}</span>
              </span>
            </a>
          </div>
        </span>
      </div>
      <style jsx>{`
        .BreadcrumbList a {
          color: #24a1b2 !important;
          text-decoration: underline;
        }

        .displayBlock {
          display: inline-block;
        }

        .breadMargin {
          margin-left: 8px;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}

export default Breadcrumb;
