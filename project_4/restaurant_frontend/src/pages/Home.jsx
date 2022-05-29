import HomepageComponent from "../components/HomepageComponent"
import hero from "../images/gallery-5.webp"
import image1 from "../images/gallery-2.webp"
import heading from "../images/heading-3-img.png"

function Home() {
    return (
        <div className="page-container homepage">
            <div className="homepage__hero">
                <p className="homepage__hero-content">Fulfil your coffee <br /> desires here</p>
                <img className="homepage__hero-image" src={hero} alt="Homepage Hero" />
            </div>
            <img className="homepage__heading" src={heading} alt="heading"/>
            <HomepageComponent  
            content="Sate your appetite and pamper your tastebuds. Here, you can check out our diverse menu and order from the comfort of your own homes!"
            buttonLink="Check it out"
            image={image1}
            link="/menu"
            />
            {/* <HomepageComponent  
            content="Scared if we might be full? Too lazy to queue? Want to be shown straight to your table? Don't worry! We have you covered!"
            buttonLink="Reserve now!"
            image={image2}
            link="/bookings"
            />  */}
        </div>
    )
}


export default Home