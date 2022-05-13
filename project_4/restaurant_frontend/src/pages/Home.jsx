import Hero  from "../components/Hero"
import HomepageComponent from "../components/HomepageComponent"

function Home() {
    const homepageItems = [
        {
            content: "Sate your appetite and pamper your tastebuds. Here, you can check out our diverse menu and order from the comfort of your own homes!",
            buttonLink: "Reach us!"
        },
        {
            content: "Scared if we might be full? Too lazy to queue? Want to be shown straight to your table? Don't worry! We have you covered!",
            buttonLink: "Reach us!"
        }, {
            content: "Want to know how to reach us? Or even find us? Well, here you go. We're not hiding!",
            buttonLink: "Reserve Now"
        }
    ]

    return (
        <div className="homepage">
            <Hero />
            {homepageItems.map((item) => {
                return (
                    <HomepageComponent content={item.content} buttonLink={item.buttonLink} />
                )
            })}
        </div>
    )
}

export default Home