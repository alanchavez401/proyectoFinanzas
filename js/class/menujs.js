class Menu {
    constructor(menuSelector, listSelector) {
      this.menuElement = document.querySelector(menuSelector);
      this.h1Element = this.menuElement.querySelector('h1');
      this.listElement = document.querySelector(listSelector);
      this.activeClass = 'active';
  
      this.h1Element.addEventListener('click', this.toggleActive.bind(this));
      this.toggleActive();
      const exporter = new ExcelExporter(itemsLista, "download");
      exporter.export();
    }
  
    toggleActive() {
      this.h1Element.classList.toggle(this.activeClass);
      this.listElement.style.display = this.h1Element.classList.contains(this.activeClass) ? 'block' : 'none';
    
    }
  }