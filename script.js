document.addEventListener("DOMContentLoaded", function() {
    const priceInput = document.getElementById("price-input");
    const addPriceButton = document.getElementById("add-price-btn");
    const clearStorageButton = document.getElementById("clear-storage-btn");
    const outputDiv = document.getElementById("output");
    const priceHistoryTable = document.getElementById("price-history").getElementsByTagName('tbody')[0];
    
    let totalPrice = 0;
    let priceHistory = [];
    
    // Load prices from local storage when the page loads
    loadPricesFromLocalStorage();
    renderPriceHistory();
    updateOutput();
    
    addPriceButton.addEventListener("click", function() {
      const price = parseFloat(priceInput.value);
      if (!isNaN(price)) {
        totalPrice += price;
        priceHistory.push(price);
        updateOutput();
        updatePriceHistory();
        savePricesToLocalStorage();
        priceInput.value = ""; // Clear input field after adding price
      } else {
        alert("Внеси сума");
      }
    });
    
    clearStorageButton.addEventListener("click", function() {
      totalPrice = 0;
      priceHistory = [];
      updateOutput();
      renderPriceHistory();
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("priceHistory");
    });
    
    function updateOutput() {
      outputDiv.textContent = "Вкупно: " + totalPrice.toFixed();
      // Store total price in local storage
      localStorage.setItem("totalPrice", totalPrice);
    }
    
    function updatePriceHistory() {
      renderPriceHistory();
    }
    
    function renderPriceHistory() {
      // Clear existing rows
      priceHistoryTable.innerHTML = "";
      
      // Add new rows
      priceHistory.forEach(price => {
        const row = priceHistoryTable.insertRow();
        const cell = row.insertCell();
        cell.textContent = "" + price.toFixed();
      });
    }
    
    function savePricesToLocalStorage() {
      localStorage.setItem("priceHistory", JSON.stringify(priceHistory));
    }
    
    function loadPricesFromLocalStorage() {
      const storedPriceHistory = localStorage.getItem("priceHistory");
      if (storedPriceHistory) {
        priceHistory = JSON.parse(storedPriceHistory);
        totalPrice = priceHistory.reduce((acc, curr) => acc + curr, 0);
      }
      const storedTotalPrice = localStorage.getItem("totalPrice");
      if (storedTotalPrice) {
        totalPrice = parseFloat(storedTotalPrice);
      }
    }
  });
  