const contenedor = document.getElementById('main');
function ajax(url, esJson, errorMsg) {
    return fetch(url)
     .then(response => {
        console.log({ response });
        if (esJson) {
            return response.json();
        }
        return response.text();
    })
    .catch(error => {
        console.log(error);
        alert(errorMsg);
    })
}
function navegar(hash, isWindowLoad) {
    if (!isWindowLoad && history.state && history.state.prevUrl.includes(hash)) {
        console.log('ya estamos en la página a que intenta navegar', { prevUrl: history.state.prevUrl, url: hash });
        return;
    }
    
    if (!hash.includes('#') || hash.includes('home')) {
        Pagelist();
    }
    if (hash.includes('calcular')) {
        PageCalc();
    }
}
const links = document.getElementsByClassName('nav-link');
for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.onclick = function (e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        history.pushState({ prevUrl: location.pathname }, 'Navagacion', href);
        navegar(href);
    }
}

window.onpopstate = function (e) {
    navegar(location.hash);
}
window.onload = function (e) {
    navegar(location.hash, true);
}

function Pagelist() {
    ajax(
        '../../../recursos/Pagelist.html',
        false, 
        'Ocurrió un error al cargar la página'
    )
    .then((contenido) => {
        contenedor.innerHTML = contenido;
        localStorage.setItem('itemsLista', JSON.stringify(itemsLista))
        listaClass.Creador(itemsLista);
        listaClass.importeActualizar(itemsLista)
        const menu = new Menu('.menu', 'ul');
    })
}


function PageCalc() {
    ajax(
        '../../../recursos/calcular.html',
        false, 
        'Ocurrió un error al cargar la página'
    )
    .then((contenido) => {
        contenedor.innerHTML = contenido;
    })
}