import React from 'react';

function TableServices(props) {
  console.log(props.services);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Servicio</th>
          <th className="onlyWeb">Evaluacion</th>
          <th className="onlyWeb">Me gusta</th>
          <th className="onlyWeb">Visitas</th>
          <th className="onlyWeb">Ventas</th>
          <th className="onlyWeb" />
        </tr>
      </thead>
      <tbody>
        { props.services.map((item, key) => (
          <tr key={key}>
            <td>
              <div className="tdServiceData">
                <img src={item.cover} alt="Curso de posicionamiento en Google" height="80" width="80" className="img-rounded" />
                <div className="serviceDescriptionData">
                  <div className="title">{item.name}</div>
                  <div className="category">{item.sub_category.name}</div>
                  { !item.published && <div className="lbl lbl-danger">Desactivado</div> }

                </div>
              </div>
            </td>
            <td className="onlyWeb">{item.rating_general}</td>
            <td className="onlyWeb">{item.favorite_count}</td>
            <td className="onlyWeb">{item.visits}</td>
            <td className="onlyWeb">{item.total_jobs}</td>
            <td className="onlyWeb">
              <a className="btn btn-principal">Editar</a>
            </td>
          </tr>
         ))}
      </tbody>
      <style jsx>{`
        .tdServiceData {
          display: flex;
          align-items: center;
        }

        .serviceDescriptionData {
          margin-left: 10px;
        }

        .title {
          color: #333;
          font-size: 18px;
        }

        .category {
          color: #757575;
          font-size: 14px;
        }

        @media (max-width: 600px) {
          .onlyWeb {
            display: none;
          }
        }
      `}</style>
    </table>
  )
}

export default TableServices;
