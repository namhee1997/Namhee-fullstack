import { Link } from "react-router-dom";


export default function Table({ title = '', dataCurrent = [], dataTitle = [], thisPage = '', linkCreate = '', dataHandle }) {

    return (
        <div className="card mb-4 table_">
            <div className="card-header d-flex align-items-center header_table">
                <div className="box_title_table">
                    <i className="fas fa-table me-2"></i>
                    <p>{title}</p>
                </div>

                <button type="button" className="btn btn-primary ms-auto">
                    <Link to={linkCreate} className="text-white text-decoration-none">
                        <i className="fa-solid fa-plus"></i> Create
                    </Link>
                </button>

            </div>
            <div className="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>STT</th>
                            {
                                dataTitle.map((e, i) =>
                                    <th key={i}>{e}</th>
                                )
                            }
                            <th width={thisPage == 'Order' ? '150px' : '100px'}></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            thisPage == 'User' ?
                                dataCurrent.map((e, i) =>
                                    <tr key={i}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            {e.username}
                                        </td>
                                        <td>
                                            {e.role}
                                        </td>
                                        <td>
                                            {e.fullname}
                                        </td>
                                        <td>
                                            <img height="100px" width="100px" src={e.avatar} alt="" />

                                        </td>
                                        <td>
                                            {e.address}
                                        </td>
                                        <td>
                                            {e.email}
                                        </td>
                                        <td>
                                            {e.phone}
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-danger">
                                                    <Link to={`/dashboard/user/delete/${e.userId}`}>
                                                        <i className="fa-solid fa-trash-can text-white"></i>
                                                    </Link>
                                                </button>
                                                <button type="button" className="btn btn-primary">
                                                    <Link to={`/dashboard/user/edit/${e.userId}`}>
                                                        <i className="fa-solid fa-pen-to-square text-white"></i>
                                                    </Link>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                : thisPage == 'Product' ?
                                    dataCurrent.map((e, i) =>
                                        <tr key={i}>
                                            <td>
                                                {i + 1}
                                            </td>
                                            <td>
                                                {e.title}
                                            </td>
                                            <td>
                                                {e.slug}
                                            </td>
                                            <td>
                                                {e.sale}
                                            </td>
                                            <td>
                                                {e.price}
                                            </td>
                                            <td>
                                                <img height="100px" width="100px" src={e.avt} alt="" />

                                            </td>
                                            <td>
                                                {e.cost}
                                            </td>
                                            <td>
                                                {e.promotion ? 'true' : 'false'}
                                            </td>
                                            <td>
                                                {e.company}
                                            </td>
                                            <td>
                                                {
                                                    e.variable.map((r, x) => {
                                                        return (
                                                            <p key={x}>
                                                                {r}
                                                            </p>
                                                        );
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-danger">
                                                        <Link to={`/dashboard/product/delete/${e.slug}`}>
                                                            <i className="fa-solid fa-trash-can text-white"></i>
                                                        </Link>
                                                    </button>
                                                    <button type="button" className="btn btn-primary">
                                                        <Link to={`/dashboard/product/edit/${e.slug}`}>
                                                            <i className="fa-solid fa-pen-to-square text-white"></i>
                                                        </Link>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    : thisPage == 'Company' ?
                                        dataCurrent.map((e, i) =>
                                            <tr key={i}>
                                                <td>
                                                    {i + 1}
                                                </td>
                                                <td>
                                                    {e.title}
                                                </td>
                                                <td>
                                                    {e.slug}
                                                </td>

                                                <td>
                                                    <img height="100px" width="100px" src={e.src} alt="" />

                                                </td>

                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <button type="button" className="btn btn-danger">
                                                            <Link to={`/dashboard/company/delete/${e.slug}`}>
                                                                <i className="fa-solid fa-trash-can text-white"></i>
                                                            </Link>
                                                        </button>
                                                        <button type="button" className="btn btn-primary">
                                                            <Link to={`/dashboard/company/edit/${e.slug}`}>
                                                                <i className="fa-solid fa-pen-to-square text-white"></i>
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                        : thisPage == 'News' ?
                                            dataCurrent.map((e, i) =>
                                                <tr key={i}>
                                                    <td>
                                                        {i + 1}
                                                    </td>

                                                    <td>
                                                        {e.title}
                                                    </td>
                                                    <td>
                                                        {e.slug}
                                                    </td>
                                                    <td>
                                                        {e.content}
                                                    </td>
                                                    <td>
                                                        {e.urlTo}
                                                    </td>

                                                    <td>
                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" className="btn btn-danger">
                                                                <Link to={`/dashboard/news/delete/${e.slug}`}>
                                                                    <i className="fa-solid fa-trash-can text-white"></i>
                                                                </Link>
                                                            </button>
                                                            <button type="button" className="btn btn-primary">
                                                                <Link to={`/dashboard/news/edit/${e.slug}`}>
                                                                    <i className="fa-solid fa-pen-to-square text-white"></i>
                                                                </Link>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                            : thisPage == 'Order' ?
                                                dataCurrent.map((e, i) =>
                                                    <tr key={i}>
                                                        <td>
                                                            {i + 1}
                                                        </td>
                                                        <td>
                                                            {e.idOrder}
                                                        </td>
                                                        <td>
                                                            {e.slugProduct}
                                                        </td>
                                                        <td>
                                                            {e.title}
                                                        </td>
                                                        <td>
                                                            {e.price}
                                                        </td>
                                                        <td>
                                                            {e.sale}
                                                        </td>
                                                        <td>
                                                            {e.cost}
                                                        </td>
                                                        <td>
                                                            {e.userID}
                                                        </td>
                                                        <td>
                                                            {e.paid}
                                                        </td>

                                                        <td>
                                                            <div className={`btn-group this_order`} role="group" aria-label="Basic example">
                                                                <button type="button" className="btn btn-danger">
                                                                    <Link to={`/dashboard/order/delete/${e.idOrder}`}>
                                                                        <i className="fa-solid fa-trash-can text-white"></i>
                                                                    </Link>
                                                                </button>
                                                                <button type="button" className="btn btn-primary">
                                                                    <Link to={`/dashboard/order/edit/${e.idOrder}`}>
                                                                        <i className="fa-solid fa-pen-to-square text-white"></i>
                                                                    </Link>
                                                                </button>
                                                                <button className="btn btn-success" onClick={() => dataHandle.setViewBox(m => {
                                                                    let data = {};
                                                                    data.userID = e.userID;
                                                                    data.view = !m.view;
                                                                    data.idOrder = e.idOrder;
                                                                    return data;
                                                                })}>
                                                                    <i className="fa-solid fa-eye"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                                : ''
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
}