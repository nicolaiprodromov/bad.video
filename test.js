const testy_var = {
    test : 0
  }
  
  
  window.addEventListener('mousemove', (e) => {
    testy_var.test = e.clientX;
  })
  
  
  export {testy_var}