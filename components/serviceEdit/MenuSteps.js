import React from 'react';

function MenuSteps({ step }) {
  return (
    <div className="menuPublish">
      <div className="menuSteps">
        <ul>
          <li>
            {/* <a><span className="step">1</span> Resumen</a> */}
            <a><i className="fa fa-check-circle fa-2x activeCheck" aria-hidden="true" /> Resumen</a>
          </li>
          <li>
            <a className={step === 2 && 'stepActive'}>
              <span className="step">2</span>Precios
            </a>
          </li>
          <li>
            <a className={step === 3 && 'stepActive'}>
              <span className="step">3</span>Galeria
            </a>
          </li>
          <li>
            <a className={step === 4 && 'stepActive'}>
              <span className="step">4</span>Publicar
            </a>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .menuSteps {
          padding: 10px 0;
        }

        .menuSteps > ul {
          margin: 0px;
          padding: 0px;
        }

        .menuSteps > ul > li {
          margin: 0px;
          padding: 0px 0;
          list-style: none;
          width: 100%;
        }

        .menuSteps > ul > li > a {
          padding: 10px;
          display:  flex;
          width: 100%;
          align-items: center;
          font-weight: bold;
          color: #757575;
        }

        .menuSteps > ul > li > .active {
          color: red;
        }

        .menuSteps > ul > li > a > .step {
          background-color: #c2c2c2;
          content: attr(data-index);
          float: left;
          width: 24px;
          height: 24px;
          vertical-align: top;
          font-size: 14px;
          line-height: 24px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          margin-right: 10px;
        }

        .stepActive {
          color: #333 !important;
        }

        .stepActive > span {
          background: #ffbb58 !important;
        }

        .activeCheck {
          color: #00b22d;
          font-size: 28px;
          width: 24px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}

export default MenuSteps;
