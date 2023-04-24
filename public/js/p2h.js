 const a = document.querySelector('#op1');
   const b = document.querySelector('#op2');
   const c = document.querySelector('#op3');
   const d = document.querySelector('#op4');
   const e = document.querySelector('#op5');
   const f = document.querySelector('#op6');
   const g = document.querySelector('#op7');
   const h = document.querySelector('#op8');
   const i = document.querySelector('#op9');
   const nt= document.querySelector('.c2');
            a.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
                    
            })
            b.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            })
            c.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            
    
            })
            d.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            
    
            })
            e.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            
    
            })
            f.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            
    
            })
            g.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            
    
            })
            h.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            
})
            i.addEventListener('click',()=>{
                nt.style.background='black';
                nt.style.color='white';
                nt.style.cursor='pointer';
            
})
function checkRadio() {
    var radios = document.getElementsByName("option");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return true;
      }
    }
    alert("Please select an option.");
    return false;
  }