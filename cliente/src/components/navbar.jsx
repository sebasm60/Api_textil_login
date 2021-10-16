import './styles/navbar.css';
import urlConfig from '../settings/settings';

function Navbar(){

    function close() {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = `http://${urlConfig}:3000/`;
    };

    return(
        <div className="container-nav" id="container-nav">
            <header className="header" id="header">
                <div className="header__toggle">
                    <i className="bx bx-menu" id="header-toggle"></i>
                </div>

                <div className="header__img">
                    
                </div>
            </header>

            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div>
                        <a href={`http://${urlConfig}:3000/dashboard`} className="nav__logo">
                            <i className="bx bx-layer nav__logo-icon"></i>
                            <span className="nav__logo-name">Api textil</span>
                        </a>

                        <div className="nav__list">
                            <a href={`http://${urlConfig}:3000/dashboard`} className="nav__link active">
                                <i className="bx bx-grid-alt nav__icon"></i>
                                <span className="nav__name">Inicio</span>
                            </a>
                            <a href={`http://${urlConfig}:3000/prendas`} className="nav__link">
                                <i className="bx bx-user nav__icon"></i>
                                <span className="nav__name">Prendas</span>
                            </a>
                                
                            <a href={`http://${urlConfig}:3000/clientes`} className="nav__link">
                                <i className="bx bx-folder nav__icon"></i>
                                <span className="nav__name">Clientes</span>
                            </a>
                                
                            <a href={`http://${urlConfig}:3000/talleres`} className="nav__link">
                                <i className="bx bx-cart nav__icon"></i>
                                <span className="nav__name">Talleres</span>
                            </a>
                        </div>
                    </div>

                    <a className="nav__link" onClick={close} href="/">
                        <i className="bx bx-log-out nav__icon"></i>
                        <span className="nav__name">Logout</span>
                    </a>
                </nav>
            </div>               
        </div>
    );
};

export default Navbar;