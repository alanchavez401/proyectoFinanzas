class ListenerClass{
    keyup() {
        let pesos = document.getElementById('monto').value.replace(/[^0-9]+/g, "")
        document.getElementById('monto').value = ('$' + ClassGetNumber.cent(pesos, 'monto'))
        document.getElementById('day').value = ClassGetNumber.getNumbers(document.getElementById('day').value)
        document.getElementById('month').value = ClassGetNumber.getNumbers(document.getElementById('month').value)
        document.getElementById('year').value = ClassGetNumber.getNumbers(document.getElementById('year').value)
    }
}