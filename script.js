class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}
class UI{
    addProduct(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body" >
                    <strong>Nombre</strong>: ${product.name} -
                    <strong>Precio</strong>: $${product.price} -
                    <strong>Año</strong>: ${product.year} &nbsp &nbsp
                    <a href="#" name="borrar" class="btn btn-danger">Borrar</a>
                </div>
            </div>
        `;
            productList.appendChild(element);
        }
    resetForm(){
        document.getElementById("product-form").reset();
    }
    deleteProduct(element) {
       if (element.name === 'borrar'){
           element.parentElement.parentElement.parentElement.remove();
           this.showMessage('Producto Eliminado con Exito', 'info');
       }
    }
    showMessage(message, cssClass) {
       const div = document.createElement("div");
       div.className = `alert alert-${cssClass} mt-4`;
       div.appendChild(document.createTextNode(message))
       //mostrando en el DOM
       const container = document.querySelector('.container');
       const app = document.querySelector("#App");
       container.insertBefore(div,app);
       setTimeout(function(){
            document.querySelector('.alert').remove();
       },3000)
    }
}
//DOM events
document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value,
        price = document.getElementById('price').value,
        year = document.getElementById('year').value;

        const product = new Product(name, price, year);
        const ui = new UI();
        
        if (name === '' || price === '' || year === '') {
            return ui.showMessage('Por favor completa todos los datos ','danger');
        }

        ui.showMessage('Producto Agregado con Exito','success'); 
        ui.addProduct(product);
        ui.resetForm();
            
        e.preventDefault();
});

document.getElementById("product-list")
    .addEventListener("click", function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);
        e.preventDefault();
});
