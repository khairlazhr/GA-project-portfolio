import { Link } from "react-router-dom"


function HomepageComponent({content, buttonLink, image, link}) {
    return (
        <div className="homepage__component">
            <img className="homepage__image" src={image} alt="coffee"/>
            <p className="homepage__content">{content}</p>
            <button className="homepage__button">
                <Link className="homepage__link" to={link}>
                    {buttonLink}
                </Link>
            </button>
            
        </div>
    )
}

export default HomepageComponent