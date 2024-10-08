import React from "react"
import logo from "../../assets/images/logo.png"
import "./header.css"
import { User } from "./User"
import { nav } from "../../assets/data/data"
import { Link,useHistory } from "react-router-dom"

export const Header = () => {
  const history = useHistory();
   window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  }) 
  return (
    <>
      <header className='header'>
        <div className='hcontainer flex'>
          <div className='logo'>
{/* <img src={logo} alt='logo' width='150px' height="100px" /> */}
<svg   className="svg-base" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 300">

<text  className="svg-text" x="150" y="160"  fill="gray" onClick={()=>history.push("/")}>Mühendisin Not Defteri</text>


{/* <text x="850" y="160" fontFamily="poppins" fontWeight="normal" fontSize="120"  fill="gray">Not </text>
<text x="1080" y="160" fontFamily="poppins" fontWeight="normal" fontSize="120"  fill="gray">Defteri </text> */}


</svg> 
          </div>
          <nav>
            <ul>
              {nav.map((link) => (
                <li key={link.id}>
                  <Link to={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='account flexCenter'>
            <User />
          </div>
        </div>
      </header>
    </>
  )
}
