let itemsLista = localStorage.getItem('itemsLista') ? JSON.parse(localStorage.getItem('itemsLista')) : [];

const listaClass = new Lista();
const ClassGetNumber = new GetNumbers();
const Ars_to_usd_class = new Ars_to_usd();
itemsLista.sort(function (a, b) {
    if (!a.day || !a.month || !a.year) {
        return 1;
    }
    if (!b.day || !b.month || !b.year) {
        return -1;
    }
    const dateA = new Date(a.year, a.month, a.day);
    const dateB = new Date(b.year, b.month, b.day);
    return dateB - dateA;
});

function createAutocompleteInstance(inputId, suggestionsId, saveId) {
    return new Autocomplete(inputId,saveId,suggestionsId)
  }

document.addEventListener('keyup', function () {
    let pesos = document.getElementById('monto').value.replace(/[^0-9]+/g, "")
    document.getElementById('monto').value = ('$' + ClassGetNumber.cent(pesos, 'monto'))
    document.getElementById('day').value = ClassGetNumber.getNumbers(document.getElementById('day').value)
    document.getElementById('month').value = ClassGetNumber.getNumbers(document.getElementById('month').value)
    document.getElementById('year').value = ClassGetNumber.getNumbers(document.getElementById('year').value)
});


document.addEventListener('click', function (e) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    switch (true) {
        case e.target.classList.contains('ingresos'):
            Categoria = 'Debe';
            listaClass.Open(Categoria, day, month, year);
            document.body.style.overflowY = "hidden";
            createAutocompleteInstance('inputNombre','Save','suggestions');
            break;
        case e.target.classList.contains('gastos'):
            Categoria = 'Haber';
            listaClass.Open(Categoria, day, month, year);
            document.body.style.overflowY = "hidden";
            createAutocompleteInstance('inputNombre','Save','suggestions');
            break;
        case e.target.classList.contains('Close'):
            listaClass.Close();
            document.body.style.overflowY = "auto";
            break;
        case e.target.classList.contains('Save'):
            e.preventDefault()
            const items = {
                day: formulario.day.value,
                month: formulario.month.value,
                year: formulario.year.value,
                resumen: formulario.Nombre.value,
                detalles: formulario.Detalles.value,
                ganancia: Categoria === 'Debe' ? Number(formulario.monto.value.replace(/[^0-9]+/g, "")) : 0,
                gasto: Categoria === 'Debe' ? 0 : Number(formulario.monto.value.replace(/[^0-9]+/g, "")),
            };
            listaClass.Agregar(items);
            localStorage.setItem('itemsLista', JSON.stringify(itemsLista));
            createAutocompleteInstance('inputNombre','suggestions','Save');
            break;
        case e.target.classList && e.target.classList.contains('delete'):
            const index = e.target.getAttribute('data-index');
            let confirmacion = confirm('Seguro desea eliminar este item?')
            if (confirmacion == true) {
                itemsLista.splice(index, 1);
                listaClass.Creador(itemsLista, listaClass.Input);
                listaClass.importeActualizar(itemsLista);
                localStorage.setItem('itemsLista', JSON.stringify(itemsLista));
            }
            break; 
            // case e.target.classList && e.target.classList.contains('generar'):
            //     const numberOfItems = 20;
            //     let confirmCreate = confirm('Deseas crear 20 items a esta lista?')
            //     if(confirmCreate==true){
            //     for (let i = 0; i < numberOfItems; i++) {
            //       let items={
            //        day : Math.floor(Math.random() * 31) + 1,
            //        month : Math.floor(Math.random() * 12) + 1,
            //        year : Math.floor(Math.random() * 23) + 2000,
            //        resumen : `Resumen del item ${i + 1}`,
            //        detalles : `Detalles del item ${i + 1}`,
            //        ganancia : Math.floor(Math.random() * 5000000) + 1,
            //        gasto : Math.floor(Math.random() * 5000000) + 1,
            //   }
            //   listaClass.Agregar(items)
            //   }}
            //     break; 
            case e.target.id === "count":
                let confirme = confirm('¿Estás seguro de que deseas borrar todos los elementos de la lista?');
                if (confirme == true) {
                    localStorage.removeItem('itemsLista');
                    listaClass.Creador(itemsLista, listaClass.Input);
                    listaClass.importeActualizar(itemsLista);
                    window.location.reload()
                }}
});


console.log(`caca`)