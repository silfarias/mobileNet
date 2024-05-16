/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// import '@tensorflow/tfjs-backend-cpu';
// import '@tensorflow/tfjs-backend-webgl';

// import * as mobilenet from '@tensorflow-models/mobilenet';


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

  // Clasificamos la imagen
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