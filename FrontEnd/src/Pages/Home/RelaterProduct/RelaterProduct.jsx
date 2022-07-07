import { Link } from "react-router-dom";


export default function RelaterProduct({ listProduct = [] }) {
    return (
        <div className="box_items_relater">
            {
                listProduct.map((e, i) => {
                    return (
                        <div className="items" key={i}>
                            <Link to={`/product/${e.slug}`}>
                                <div className="thumb_relater">
                                    <img src={e.variable.length > 0 ? e.variable[0].avatar : ''} alt="" />
                                </div>
                                <h4>{e.title}</h4>
                                <p>{e.variable.length > 0 ? e.variable[0].price : ''}</p>
                            </Link>
                        </div>
                    );
                })
            }

        </div>
    );
}