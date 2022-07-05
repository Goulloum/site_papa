import Header from "./Header"
import './Home.css'

function Home(){
    return(
        <div className="home-container">
            <img src={"dynamicImg/HomeImg/bg_home.JPG"} alt="Background Home" className='background-home'/>

            <Header />
        </div>
    )
}

export default Home