import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGears } from "@fortawesome/free-solid-svg-icons"
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons"
import { faHeadset } from "@fortawesome/free-solid-svg-icons"
import ProductGallery from "../../components/product-gallery/ProductGallery"




export default function Home() {
  return (
    <>
      <section className="product-section">
        <h1 className="section-title"> IMPORCAR </h1>
        <span className="section-subtitle">
          vehículos deprtivos disponibles
        </span>

        <ProductGallery />

      </section>
      <div className="service-features">
        <article className="feature">
          <FontAwesomeIcon className="feature-image" icon={faGears} />
          <div className="feature-description">Solución a problemas mecánicos</div>
        </article>
        <article className="feature">
          <FontAwesomeIcon className="feature-image" icon={faCalendarCheck} />
          <div className="feature-description">Garantía de 2 años</div>
        </article>
        <article className="feature">
          <FontAwesomeIcon className="feature-image" icon={faHeadset} />
          <div className="feature-description">
            Disponibles todos los días de 8 a 16 horas
          </div>
        </article>
      </div>
    </>

  )
}
