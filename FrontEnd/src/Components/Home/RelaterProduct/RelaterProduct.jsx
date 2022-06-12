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
                                    <img src={e.img} alt="" />
                                </div>
                                <h4>{e.title}</h4>
                                <p>{e.price}</p>
                            </Link>
                        </div>
                    );
                })
            }

        </div>
    );
}