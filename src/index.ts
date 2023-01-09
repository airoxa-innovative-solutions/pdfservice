import { getDocument } from './PDFreport';
import { pdf, renderToFile, renderToStream } from '@react-pdf/renderer';
import fs from 'fs';
import { applyPaletteColorsToImage, getPalette } from './utils';
import { ExposureType } from './types';
import { createCanvas, Image, ImageData, loadImage, createImageData } from 'canvas';

const reportData1 = {
  _id: '639c681fab7976d6fa62874a',
  robotId: 'telislap-8428af10-98c8-4741-839d-473a014dc2e2',
  department: '',
  distanceTraveled: 0,
  end: '2022-12-16T12:44:50.000Z',
  heatMapFile: '639c6842ab7976d6fa628752',
  interruptions: {},
  mapId: '639c623f49c0ebd1b71ac33b',
  room: 'Current location',
  start: '2022-12-16T12:44:15.000Z',
  startedBy: 'teshan',
  status: 'complete',
  submittedBy: 'teshan',
  type: 'Remote controlled',
  uvcLightDuration: '00:00:13',
  taskDuration: '00:00:35',
  disinfectionPositions: {
    disinfectedPositions: [],
    remainingPositions: [],
    failedPositions: [],
  },
};

// TODO Kudos to you if you allow this function to run within a web worker.
// Hint: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas might be a way, but is not supported in Safari ATM.
// If that is ever achieved, we can run this potentially CPU-hungry function inside the Robot API instead of the main thread.
const getImageUrlFromImageData = (imageData: ImageData): string => {
  // Create an empty canvas element
  const canvas = createCanvas(imageData.width, imageData.height);

  // Copy the image contents to the canvas
  const context = canvas.getContext('2d');
  if (context) {
    context.putImageData(imageData, 0, 0);
    // Get the data-URL formatted image
    return canvas.toDataURL('image/png');
  }
  return '';
};
const getImageDataFromImageUrl = (imageUrl: string): ImageData | any => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) return reject();

    loadImage(imageUrl).then((image: any) => {
      const canvas = createCanvas(image.width, image.height);
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      } else {
        reject('Canvas context not available');
      }
    });
    /* const image = new Image();
    image.onload = () => {
      const canvas = createCanvas(image.width, image.height);
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      } else {
        reject('Canvas context not available');
      }
    };
    //   image.crossOrigin = "Anonymous";
    image.src = imageUrl; */
  });
};

/**
 * This method is just a HACK until we make a Exposure Map controller.
 * The goal is to merge both, the current map and the exposure map into
 * one single image and pass it to the backgound controller
 * @param first
 * @param second
 */
function mergeImageData(first: ImageData, second: ImageData) {
  // Use first as reference
  const { width, height } = first;
  //const merged = new ImageData(width, height);
  const merged = createImageData(width, height);
  let i = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (second.data[i + 3] !== 0) {
        merged.data[i] = second.data[i];
        merged.data[i + 1] = second.data[i + 1];
        merged.data[i + 2] = second.data[i + 2];
        merged.data[i + 3] = second.data[i + 3];
      } else {
        merged.data[i] = first.data[i];
        merged.data[i + 1] = first.data[i + 1];
        merged.data[i + 2] = first.data[i + 2];
        merged.data[i + 3] = first.data[i + 3];
      }
      i += 4;
    }
  }
  return merged;
}

export const pdfCreate = async (reportData: any, srcMap: string, srcExposure: string) => {
  try {
    console.debug('DEBUG: pdf create function called');
    const currentMapImageData = await getImageDataFromImageUrl(srcMap);
    const exposureMapImageData = await getImageDataFromImageUrl(srcExposure);

    const palette = getPalette(ExposureType.RawExposure);
    const filteredImageData = applyPaletteColorsToImage(exposureMapImageData, palette, ExposureType.RawExposure);

    const output = mergeImageData(currentMapImageData, filteredImageData);
    const mapSrc = getImageUrlFromImageData(output);
    const pdfObj = pdf();
    pdfObj.updateContainer(getDocument(reportData, mapSrc));

    renderToFile(getDocument(reportData, mapSrc), 'local.pdf');
    return pdfObj.toBlob();
    //return renderToFile(getDocument(reportData, mapSrc), 's.pdf');
    //return renderToStream(getDocument(reportData, mapSrc));
  } catch (error) {
    console.error('Error in pdf generation: ', error);
  }
};

const srcExposure1 =
  'data:application/png;base64,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';

const srcMap1 =
  'data:application/png;base64,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';

/* pdfCreate(reportData1, srcMap1, srcExposure1).then(() => {
  console.log('pdf exporeted....');
}); */
/* pdfObj
  .toBuffer()
  .then((buffer: any) => {
    console.log("DEBUG: ", buffer);
    fs.writeFileSync("a.pdf", buffer);
    console.log("PDF saved.");
  })
  .catch((err) => {
    console.error(err);
  }); */

// exports.default = pdfCreate;
export default pdfCreate;
