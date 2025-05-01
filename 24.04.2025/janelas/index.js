document.getElementById('btn').addEventListener('click', selectFile)

async function mostrarCaminho(texto){
    document.getElementById('output').textContent = texto;
}


async function selectFile() {
  const fileContent = await window.api.selectFile();
  let msg  
    for (let i=0; i <fileContent.length; i++){
        msg1 = JSON.stringify(fileContent[i].tarefa, null, 2)
        msg2 = JSON.stringify(fileContent[i].tarefa[0],null, 2)
    const label =  document.createElement('label');
    label.classList.add('tarefa');
    const label2 = document.createElement('label')
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    label.appendChild(checkbox)
    label.append(msg1)
    label2.append(msg2)
    const output = document.getElementById('output')
    const output2= document.getElementById('output')
    output.append(label)
    output2.append(label2)
    const br = document.createElement('br')
    output.append(br)
    output2.append(br)
    }
  /*let msg;

  if (fileContent) {
 
      msg = JSON.stringify(fileContent, null, 2);
  } else {
      msg = 'Nenhum arquivo selecionado.';
  }

  document.getElementById('output').textContent = msg;*/
}



/*for(let i=0; i<=200; i++){
    const label =  document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    label.appendChild(checkbox)
    label.append("OLA TESTANDO", i)
    const output = document.getElementById('output');
    output.append(label)
    const br = document.createElement('br')
    output.append(br)
    
}*/
