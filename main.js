import './style.css';
import { Runner } from '@paddlejs/paddlejs-core';
import '@paddlejs/paddlejs-backend-webgl';

async function initRunner() {
  let runner = new Runner({
    modelPath: 'https://paddlejs.cdn.bcebos.com/models/mobileNetV2', // 模型路径
    fileCount: 4,
    feedShape: {
        fw: 224,
        fh: 224
    },
    fill: '#fff',
    targetSize: {
        height: 224,
        width: 224
    },
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
    needPreheat: true
  });
  await runner.init();
  window.runner = runner;
  console.log('runner inited')
}
initRunner();


window.predictImage = async function (image) {
    const res = await window.runner.predict(image).then(r => {
      return r;
    })
    .catch(err => {
      console.error('has error')
      console.error(err)
    });
    console.log('the res-----', res)
    document.querySelector('#result').innerHTML = res;
}





