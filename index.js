
// Tomamos los elementos 
const imgInput = document.getElementById('imgInput');
const img = document.getElementById('img');


// Cargamos la imagen y la mostramos
imgInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

async function run() {
  if (!img.src) {
    console.log("Por favor, seleccione una imagen para clasificarla");
    return;
  }

  // Cargamos el modelo
  const model = await mobilenet.load();

  // Clasificamos la imagen y obtenemos las predicciones
  const predictions = await model.classify(img);
  console.log('Predictions:', predictions);

  // Obtenemos los logits y lo imprimimos
  const logits = model.infer(img);
  console.log('Logits:');
  logits.print(true);

  // Obtenemos el embedding y lo imprimimos
  const embedding = model.infer(img, true);
  console.log('Embedding:');
  embedding.print(true);
}