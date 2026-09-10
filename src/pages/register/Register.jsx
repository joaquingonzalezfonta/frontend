import './Register.css';

export default function Register() {
    return (
        <section className="form-section">
            <h1 className="section-title"> Registro </h1>
            <div className="section-subtitle">Registrate para una mejor experiencia</div>
            <div className="form-container">
                <div className="form-subcontainer">
                    <form>
                        <div className="input-group">
                            <label className="input-label" htmlFor="nombreCompleto">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                autoFocus=""
                                autoComplete="on"
                                autoCapitalize=""
                                name="fullname"
                                id="nombreCompleto"
                                required=""
                                minLength={5}
                                maxLength={100}
                                placeholder="Juan Gonzalez"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="correo">
                                Correo electronico
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="correo"
                                required=""
                                placeholder="ejemplo@correo.com"
                                minLength={5}
                                maxLength={30}
                                pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="pass">
                                Contraseña
                            </label>
                            <input
                                type="text"
                                name="password"
                                id="pass"
                                required=""
                                placeholder="Juan123"
                                minLength={8}
                                maxLength={50}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="pass">
                                Repetir contraseña
                            </label>
                            <input
                                type="text"
                                name="password"
                                id="pass"
                                required=""
                                placeholder="Juan123"
                                minLength={8}
                                maxLength={50}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="phone">
                                Numero de teléfono
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required=""
                                placeholder={345162696}
                                minLength={5}
                                maxLength={20}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="birthday">
                                Fecha de cumpleaños
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                min="2024-05-30"
                                required=""
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="province">
                                Seleccione su provincia
                            </label>
                            <select name="province" id="" required="">
                                <option value="" />
                                <option value="AR">Buenos Aires</option>
                                <option value="BR">Entre Rios</option>
                                <option value="UR">Misiones</option>
                                <option value="CH">Corrientes</option>
                                <option value="PA">Formosa</option>
                                <option value="CO">Salta</option>
                                <option value="ME">Jujuy</option>
                                <option value="ME">Santiago del Estero</option>
                                <option value="ME">San Juan</option>
                                <option value="ME">Catamarca</option>
                                <option value="ME">La Pampa</option>
                                <option value="ME">La Rioja</option>
                                <option value="ME">Mendoza</option>
                                <option value="ME">Neuquen</option>
                                <option value="ME">San Luis</option>
                                <option value="ME">Cordoba</option>
                                <option value="ME">Santa Fe</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="">
                                Presupuesto
                            </label>
                            <div>
                                <input type="radio" name="gender" defaultValue="F" /> +$30.000
                            </div>
                            <div>
                                <input type="radio" name="gender" defaultValue="M" /> +$100.000
                            </div>
                            <div>
                                <input type="radio" name="gender" defaultValue="O" /> +$500.000
                            </div>
                            <div>
                                <input type="radio" name="gender" defaultValue="O" /> +$1.000.000
                            </div>
                            <div>
                                <input type="radio" name="gender" defaultValue="O" /> +$3.000.000
                            </div>
                            <div>
                                <input type="radio" name="gender" defaultValue="O" /> +$10.000.000
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="obs">
                                Comentario
                            </label>
                            <textarea
                                name="obs"
                                id="obs"
                                cols={5}
                                rows={10}
                                placeholder="Escribe un comentario..."
                                minLength={0}
                                maxLength={300}
                                defaultValue={""}
                            />
                        </div>
                        <div className="input-group">
                            <button type="submit" className="Send-button">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}
