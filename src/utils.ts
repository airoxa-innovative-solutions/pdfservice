import { ExposureType } from './types';
import { exposurePalette, rawPalette } from './palettes';

import type { ColorPalette } from './types';

export function thresholded(imageData: ImageData): ImageData {
  // TODO: implement filters here
  const data = imageData.data;
  const len = data.length;

  for (let i = 0; i < len; i += 4) {
    // Seems to be the exposed area
    if (data[i + 3] <= 0) {
      data[i] = 101; // r
      data[i + 1] = 227; // g
      data[i + 2] = 240; // b
      data[i + 3] = 255; // alpha
    }
  }
  return imageData;
}

export function getPalette(activeColorSchema: ExposureType): ColorPalette {
  switch (activeColorSchema) {
    case ExposureType.UvdExposure:
      return exposurePalette;

    default:
      return rawPalette;
  }
}
export function applyPaletteColorsToImage(
  imageData: ImageData,
  mapPalette: ColorPalette,
  exposureType?: ExposureType,
): ImageData {
  const { data, width, height } = imageData;

  let i = 0;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // If you use heat map image from database then we have to override alpha
      if (exposureType === ExposureType.RawExposure) {
        if (red === 0 && green === 0 && blue === 0) {
          data[i + 3] = 0;
        }
      }

      data[i] = mapPalette.red[red];
      data[i + 1] = mapPalette.green[green];
      data[i + 2] = mapPalette.blue[blue];

      i += 4;
    }
  }

  return imageData;
}
