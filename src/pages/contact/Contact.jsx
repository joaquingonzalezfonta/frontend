import './Contact.css';


export default function Contact() {
    return (
    <>
    <section className="form-section">

            <h1 className="section-title"> Contacto </h1>

            <div className="section-subtitle">
                Completa el formulario para contactarte con nosotros
            </div>

            <div className="form-container">
                <div className="form-subcontainer">
                    <form>
                        <div className="input-group">
                            <label htmlFor="fullname" className="input-label">Nombre completo</label>
                            <input type="correcto" name="fullname" id="fullname" required placeholder="Juan Gonzalez"
                                minLength="4" maxLength="80" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Correo electronico</label>
                            <input type="email" name="email" id="email" required placeholder="ejemplo@correo.com"
                                minLength="4" maxLength="100"
                                pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"  />
                        </div>

                        <div className="input-group">
                            <label htmlFor="text" className="input-label">Comentario</label>
                            <textarea rows="5" name="text" id="text" cols="10" placeholder="Escribe un comentario..."
                                minLength="0" maxLength="300"></textarea>
                        </div>

                        <div className="input-group">
                            <button type="submit" className="Send-button">Enviar</button>

                        </div>

                    </form>
                </div>
                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44192.6318578892!2d-58.427768567952775!3d-34.588050121254824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca99c609fc2f%3A0x392ca99351808a75!2sRecoleta%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1717091163966!5m2!1ses!2sar"
                        width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

        </section>
    </>
    
    )
}
